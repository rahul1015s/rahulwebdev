import type { GithubSnapshot } from "@/lib/dashboard/types";

interface GithubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

interface GithubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    commits?: Array<{ sha: string; message: string; url: string }>;
  };
}

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchGithub<T>(url: string) {
  const response = await fetch(url, {
    headers: githubHeaders(),
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getGithubSnapshot(
  username: string
): Promise<GithubSnapshot | null> {
  if (!username.trim()) {
    return null;
  }

  try {
    const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`;
    const eventsUrl = `https://api.github.com/users/${username}/events/public?per_page=30`;

    const [repos, events] = await Promise.all([
      fetchGithub<GithubRepo[]>(reposUrl),
      fetchGithub<GithubEvent[]>(eventsUrl),
    ]);

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentPushEvents = events.filter(
      (event) =>
        event.type === "PushEvent" &&
        new Date(event.created_at).getTime() >= sevenDaysAgo
    );

    const contributionsLast7Days = recentPushEvents.reduce((sum, event) => {
      return sum + (event.payload?.commits?.length || 0);
    }, 0);

    const recentCommits = events
      .filter((event) => event.type === "PushEvent")
      .flatMap((event) =>
        (event.payload?.commits || []).map((commit) => ({
          sha: commit.sha,
          message: commit.message,
          repo: event.repo.name,
          url: commit.url,
          createdAt: event.created_at,
        }))
      )
      .slice(0, 10);

    return {
      username,
      totalRepos: repos.length,
      contributionsLast7Days,
      repos: repos.map((repo) => ({
        name: repo.name,
        htmlUrl: repo.html_url,
        description: repo.description || "",
        stars: repo.stargazers_count,
        language: repo.language || "Unknown",
        updatedAt: repo.updated_at,
      })),
      recentCommits,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub snapshot", error);
    return null;
  }
}
