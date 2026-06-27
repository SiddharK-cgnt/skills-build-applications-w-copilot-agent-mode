import express, { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

// Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('leader members');
    res.json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving teams', error });
  }
});

// Get team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('leader members');
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    res.json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving team', error });
  }
});

// Create team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, leader } = req.body;
    const team = new Team({ name, description, leader, members: [leader] });
    await team.save();
    await team.populate('leader members');
    res.status(201).json({ success: true, data: team, message: 'Team created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating team', error });
  }
});

// Update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('leader members');
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    res.json({ success: true, data: team, message: 'Team updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating team', error });
  }
});

// Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    res.json({ success: true, message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting team', error });
  }
});

// Add member to team
router.post('/:id/members', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate('leader members');
    res.json({ success: true, data: team, message: 'Member added to team' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error adding member', error });
  }
});

export default router;
