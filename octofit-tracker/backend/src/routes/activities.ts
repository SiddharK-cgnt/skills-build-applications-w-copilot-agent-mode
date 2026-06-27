import express, { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving activities', error });
  }
});

// Get activities by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).populate('userId');
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving activities', error });
  }
});

// Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId');
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving activity', error });
  }
});

// Create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, distance, calories, date, notes } = req.body;
    const activity = new Activity({ userId, type, duration, distance, calories, date, notes });
    await activity.save();
    await activity.populate('userId');
    res.status(201).json({ success: true, data: activity, message: 'Activity created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating activity', error });
  }
});

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId');
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, data: activity, message: 'Activity updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating activity', error });
  }
});

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting activity', error });
  }
});

export default router;
