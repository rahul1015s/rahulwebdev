import { model, models, Schema, type Model } from "mongoose";

interface DailyTaskLabels {
  dsa: string;
  project: string;
  exercise: string;
}

interface DsaUsernames {
  leetcode: string;
  gfg: string;
  codechef: string;
}

export interface IDashboardSettings {
  userId: string;
  githubUsername: string;
  dsaUsernames: DsaUsernames;
  focusModeEnabled: boolean;
  dailyTaskLabels: DailyTaskLabels;
  createdAt?: Date;
  updatedAt?: Date;
}

const DashboardSettingsSchema = new Schema<IDashboardSettings>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    githubUsername: { type: String, default: "" },
    dsaUsernames: {
      leetcode: { type: String, default: "" },
      gfg: { type: String, default: "" },
      codechef: { type: String, default: "" },
    },
    focusModeEnabled: { type: Boolean, default: true },
    dailyTaskLabels: {
      dsa: { type: String, default: "Solve 1 DSA problem" },
      project: { type: String, default: "Work on project" },
      exercise: { type: String, default: "Exercise" },
    },
  },
  { timestamps: true }
);

const DashboardSettings =
  (models.DashboardSettings as Model<IDashboardSettings>) ||
  model<IDashboardSettings>("DashboardSettings", DashboardSettingsSchema);

export default DashboardSettings;
