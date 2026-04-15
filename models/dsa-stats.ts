import { model, models, Schema, type Model } from "mongoose";

export interface IDsaStats {
  userId: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  lastSolvedDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const DsaStatsSchema = new Schema<IDsaStats>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    totalSolved: { type: Number, default: 0 },
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
    lastSolvedDate: { type: Date, default: null },
  },
  { timestamps: true }
);

const DsaStats =
  (models.DsaStats as Model<IDsaStats>) ||
  model<IDsaStats>("DsaStats", DsaStatsSchema);

export default DsaStats;
