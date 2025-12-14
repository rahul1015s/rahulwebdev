import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      default: 'website',
    },
    confirmationToken: {
      type: String,
    },
    confirmedAt: {
      type: Date,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: false, // ❗ always false until confirmed
    },
  },
  { timestamps: true }
);

// Index for confirmation flow
SubscriberSchema.index({ confirmationToken: 1 }, { sparse: true });

export default mongoose.models.Subscriber ||
  mongoose.model('Subscriber', SubscriberSchema);
