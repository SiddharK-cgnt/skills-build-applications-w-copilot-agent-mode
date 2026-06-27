import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  score: number;
  activitiesCount: number;
  totalDuration: number;
  rank?: number;
  period: 'weekly' | 'monthly' | 'allTime';
  createdAt: Date;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true },
    activitiesCount: { type: Number, required: true },
    totalDuration: { type: Number, required: true },
    rank: { type: Number },
    period: { type: String, enum: ['weekly', 'monthly', 'allTime'], required: true },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
