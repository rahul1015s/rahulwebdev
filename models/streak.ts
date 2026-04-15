import { model, models, Schema, type Model } from "mongoose";

export interface IStreak {
  userId: string;
  currentStreak: number;
  lastCompletedDate?: Date | null;
  lastCompletedDateKey?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const StreakSchema = new Schema<IStreak>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    currentStreak: { type: Number, default: 0 },
    lastCompletedDate: { type: Date, default: null },
    lastCompletedDateKey: { type: String, default: null },
  },
  { timestamps: true }
);

const Streak =
  (models.Streak as Model<IStreak>) || model<IStreak>("Streak", StreakSchema);

export default Streak;
