# Rahul Verma — Portfolio

This is a responsive developer portfolio built with Next.js 16 (App Router), Tailwind CSS and Shadcn UI components. Animations are implemented with Framer Motion.

Features:
- Staggered hero text and reveal animations
- Projects gallery with tilt and hover effects
- Animated skill progress bars
- Accessible contact form using react-hook-form
- Light/Dark mode toggle
- Page transitions and scroll progress

Getting started
1. Install dependencies:
```pwsh
npm install
```
2. Run the dev server:
```pwsh
npm run dev
```

Replace `lib/data.ts` content with your real data (name, bio, skills, projects, social links).

Notes:
- This project uses the `shadcn/ui` component set (custom components are located under `components/ui`).
- For production builds and optimization, use `npm run build`.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## MongoDB / Database Setup

This project includes a small MongoDB helper at `lib/mongodb.ts` and an admin API route at `app/api/admin/posts/route.ts` that persists posts into a `posts` collection.

Quick steps to connect the app to MongoDB:

- 1) Create a `.env.local` in the project root (do NOT commit it). You can copy the example:

```pwsh
copy .env.local.example .env.local
```

- 2) Fill `MONGODB_URI` with your connection string (MongoDB Atlas or local). Optionally set `MONGODB_DB` to override the database name.

- 3) Run the dev server:

```pwsh
npm run dev
```

The admin post creation page (`/admin/blog/new`) uses the client-side code to POST to `/api/admin/posts` which inserts the document into the `posts` collection.

Test the connection (optional): a small helper script is provided at `scripts/check-mongo.ts` — run it with `ts-node`:

```pwsh
npm install -D ts-node typescript @types/node
npx ts-node scripts/check-mongo.ts
```

Security notes:
- Never commit `.env.local` or plaintext credentials to source control. Keep production credentials in your deployment provider's secret store (Vercel Environment Variables, Netlify, etc.).
- The repo currently contains `.env.local.bak` in the workspace; make sure you remove any accidental credentials before committing.

If you want me to wire a richer save/auto-save flow (drafts, autosave, validation, image uploads), tell me which behavior you prefer and I can implement it next.

## Using Mongoose (optional)

If you prefer to use Mongoose instead of the low-level MongoDB driver, this repo includes a small connection helper and a Mongoose `Post` model.

1) Install Mongoose:

```pwsh
npm install mongoose
```

2) I added `lib/mongoose.ts` and `models/post.ts`. The admin API route (`app/api/admin/posts/route.ts`) has been updated to use Mongoose — it initializes the connection and uses the `Post` model for queries and inserts.

3) To test the connection with Mongoose, you can run the existing `scripts/check-mongo.ts` (it still uses the MongoDB driver) or run a small Mongoose test using `ts-node` by creating a script that imports `connectMongoose` and attempts a `Post.findOne()`.

If you want I can add a `scripts/check-mongoose.ts` test that uses Mongoose directly — say the word and I'll add it.
