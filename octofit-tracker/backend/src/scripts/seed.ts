import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Workout } from '../models/Workout';
import { Leaderboard } from '../models/Leaderboard';

dotenv.config();

/**
 * Seed the octofit_db database with test data
 * 
 * This script populates the OctoFit Tracker database with realistic sample data
 * including users, teams, activities, workouts, and leaderboard entries.
 */

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);
    console.log('✅ Database cleared');

    // Create sample users
    console.log('\n👥 Creating sample users...');
    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        password: 'hashed_password_1',
        displayName: 'Alex Runner',
        bio: 'Marathon enthusiast and fitness blogger',
      },
      {
        username: 'jordan_fitness',
        email: 'jordan@example.com',
        password: 'hashed_password_2',
        displayName: 'Jordan Fitness',
        bio: 'Gym buddy and personal trainer',
      },
      {
        username: 'casey_cyclist',
        email: 'casey@example.com',
        password: 'hashed_password_3',
        displayName: 'Casey Cyclist',
        bio: 'Road cycling advocate',
      },
      {
        username: 'morgan_yogi',
        email: 'morgan@example.com',
        password: 'hashed_password_4',
        displayName: 'Morgan Yogi',
        bio: 'Yoga instructor and wellness coach',
      },
      {
        username: 'sam_swimmer',
        email: 'sam@example.com',
        password: 'hashed_password_5',
        displayName: 'Sam Swimmer',
        bio: 'Competitive swimmer',
      },
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create sample teams
    console.log('\n🏆 Creating sample teams...');
    const teams = await Team.insertMany([
      {
        name: 'Elite Runners',
        description: 'A group dedicated to running excellence',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[2]._id],
      },
      {
        name: 'Wellness Warriors',
        description: 'Holistic fitness and wellness focus',
        leader: users[3]._id,
        members: [users[3]._id, users[4]._id],
      },
    ]);
    console.log(`✅ Created ${teams.length} teams`);

    // Create sample activities
    console.log('\n🏃 Creating sample activities...');
    const now = new Date();
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 45,
        distance: 8.5,
        calories: 680,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Morning run in the park',
      },
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 60,
        distance: 10,
        calories: 850,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Long run session',
      },
      {
        userId: users[1]._id,
        type: 'Weight Training',
        duration: 90,
        calories: 520,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Chest and triceps workout',
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        duration: 120,
        distance: 35,
        calories: 920,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Mountain bike trail',
      },
      {
        userId: users[3]._id,
        type: 'Yoga',
        duration: 60,
        calories: 180,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Vinyasa flow session',
      },
      {
        userId: users[4]._id,
        type: 'Swimming',
        duration: 45,
        distance: 2,
        calories: 420,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Freestyle swimming practice',
      },
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 30,
        distance: 5,
        calories: 420,
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        notes: 'Quick evening jog',
      },
      {
        userId: users[1]._id,
        type: 'Weight Training',
        duration: 75,
        calories: 480,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Back and biceps',
      },
    ]);
    console.log(`✅ Created ${activities.length} activities`);

    // Create sample workouts
    console.log('\n💪 Creating sample workouts...');
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        title: 'Beginner 5K Training',
        description: 'A complete training plan to prepare for your first 5K run',
        difficulty: 'beginner',
        exercises: [
          { name: 'Warm-up walk', sets: 1, reps: 5, weight: 0 },
          { name: 'Easy run', sets: 1, reps: 20, weight: 0 },
          { name: 'Cool-down walk', sets: 1, reps: 5, weight: 0 },
        ],
        estimatedDuration: 30,
        category: 'Running',
      },
      {
        userId: users[1]._id,
        title: 'Muscle Building 101',
        description: 'Fundamental weight training program for beginners',
        difficulty: 'beginner',
        exercises: [
          { name: 'Dumbbell bench press', sets: 3, reps: 10, weight: 20 },
          { name: 'Dumbbell rows', sets: 3, reps: 10, weight: 20 },
          { name: 'Squats', sets: 3, reps: 12, weight: 0 },
        ],
        estimatedDuration: 45,
        category: 'Strength',
      },
      {
        userId: users[2]._id,
        title: 'Advanced Cycling Intervals',
        description: 'High-intensity interval training for cyclists',
        difficulty: 'advanced',
        exercises: [
          { name: 'Warm-up spin', sets: 1, reps: 5, weight: 0 },
          { name: 'Sprint intervals', sets: 6, reps: 2, weight: 0 },
          { name: 'Recovery spin', sets: 1, reps: 5, weight: 0 },
        ],
        estimatedDuration: 60,
        category: 'Cycling',
      },
      {
        userId: users[3]._id,
        title: 'Intermediate Yoga Sequence',
        description: 'Balanced yoga routine for intermediate practitioners',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Sun salutations', sets: 5, reps: 1, weight: 0 },
          { name: 'Standing poses', sets: 1, reps: 20, weight: 0 },
          { name: 'Cool down stretches', sets: 1, reps: 10, weight: 0 },
        ],
        estimatedDuration: 60,
        category: 'Yoga',
      },
      {
        userId: users[4]._id,
        title: 'Competitive Swimming Training',
        description: 'Advanced swimming program for competitive athletes',
        difficulty: 'advanced',
        exercises: [
          { name: 'Warm-up laps', sets: 4, reps: 1, weight: 0 },
          { name: 'Freestyle sprints', sets: 6, reps: 2, weight: 0 },
          { name: 'Cool-down laps', sets: 2, reps: 1, weight: 0 },
        ],
        estimatedDuration: 90,
        category: 'Swimming',
      },
    ]);
    console.log(`✅ Created ${workouts.length} workouts`);

    // Create sample leaderboard entries
    console.log('\n📊 Creating sample leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        score: 2950,
        activitiesCount: 3,
        totalDuration: 135,
        rank: 1,
        period: 'weekly',
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        score: 2400,
        activitiesCount: 2,
        totalDuration: 165,
        rank: 2,
        period: 'weekly',
      },
      {
        userId: users[2]._id,
        teamId: teams[0]._id,
        score: 2300,
        activitiesCount: 1,
        totalDuration: 120,
        rank: 3,
        period: 'weekly',
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        score: 1850,
        activitiesCount: 1,
        totalDuration: 60,
        rank: 4,
        period: 'weekly',
      },
      {
        userId: users[4]._id,
        teamId: teams[1]._id,
        score: 1680,
        activitiesCount: 1,
        totalDuration: 45,
        rank: 5,
        period: 'weekly',
      },
      // Monthly leaderboard
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        score: 9850,
        activitiesCount: 12,
        totalDuration: 540,
        rank: 1,
        period: 'monthly',
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        score: 8200,
        activitiesCount: 10,
        totalDuration: 625,
        rank: 2,
        period: 'monthly',
      },
    ]);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📈 Database Seeding Complete!');
    console.log('='.repeat(50));
    console.log(`✅ Users: ${users.length}`);
    console.log(`✅ Teams: ${teams.length}`);
    console.log(`✅ Activities: ${activities.length}`);
    console.log(`✅ Workouts: ${workouts.length}`);
    console.log(`✅ Leaderboard Entries: ${leaderboardEntries.length}`);
    console.log('='.repeat(50));
    console.log('\n📝 Sample data summary:');
    console.log(`   - Database: octofit_db`);
    console.log(`   - Collections populated: 5`);
    console.log(`   - Total documents: ${users.length + teams.length + activities.length + workouts.length + leaderboardEntries.length}`);
    console.log('\n✨ Ready to test API endpoints!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
