import { model, models, Schema, type Model } from "mongoose";

export type FocusTaskKey = "dsa" | "project" | "exercise";

export interface IFocusDay {
  userId: string;
  date: Date;
  dateKey: string;
  tasks: Record<FocusTaskKey, boolean>;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const FocusDaySchema = new Schema<IFocusDay>(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    dateKey: { type: String, required: true, index: true },
    tasks: {
      dsa: { type: Boolean, default: false },
      project: { type: Boolean, default: false },
      exercise: { type: Boolean, default: false },
    },
    completed: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

FocusDaySchema.index({ userId: 1, dateKey: 1 }, { unique: true });

const FocusDay =
  (models.FocusDay as Model<IFocusDay>) ||
  model<IFocusDay>("FocusDay", FocusDaySchema);

export default FocusDay;
