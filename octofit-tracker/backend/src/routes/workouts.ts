import express, { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving workouts', error });
  }
});

// Get workouts by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId }).populate('userId');
    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving workouts', error });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId');
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving workout', error });
  }
});

// Create workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, title, description, difficulty, exercises, estimatedDuration, category } = req.body;
    const workout = new Workout({
      userId,
      title,
      description,
      difficulty,
      exercises,
      estimatedDuration,
      category,
    });
    await workout.save();
    await workout.populate('userId');
    res.status(201).json({ success: true, data: workout, message: 'Workout created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating workout', error });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId');
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    res.json({ success: true, data: workout, message: 'Workout updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating workout', error });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    res.json({ success: true, message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting workout', error });
  }
});

// Get workouts by category
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ category: req.params.category }).populate('userId');
    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving workouts', error });
  }
});

export default router;
