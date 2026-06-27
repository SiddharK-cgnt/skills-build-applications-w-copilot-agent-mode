import express, { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

// Get leaderboard by period
router.get('/:period', async (req: Request, res: Response) => {
  try {
    const { period } = req.params;
    if (!['weekly', 'monthly', 'allTime'].includes(period)) {
      return res.status(400).json({ success: false, message: 'Invalid period' });
    }
    const leaderboard = await Leaderboard.find({ period })
      .populate('userId')
      .populate('teamId')
      .sort({ score: -1 });
    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving leaderboard', error });
  }
});

// Get user rank
router.get('/:period/user/:userId', async (req: Request, res: Response) => {
  try {
    const { period, userId } = req.params;
    const entry = await Leaderboard.findOne({ period, userId }).populate('userId').populate('teamId');
    if (!entry) {
      return res.status(404).json({ success: false, message: 'User not found in leaderboard' });
    }
    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving rank', error });
  }
});

// Create or update leaderboard entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, teamId, score, activitiesCount, totalDuration, period } = req.body;
    const entry = await Leaderboard.findOneAndUpdate(
      { userId, period },
      { userId, teamId, score, activitiesCount, totalDuration, period },
      { new: true, upsert: true }
    ).populate('userId').populate('teamId');
    res.status(201).json({ success: true, data: entry, message: 'Leaderboard entry updated' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating leaderboard', error });
  }
});

// Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ teamId })
      .populate('userId')
      .sort({ score: -1 });
    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving team leaderboard', error });
  }
});

export default router;
