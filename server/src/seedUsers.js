import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const firstNames = ["Alex","Sam","Jamie","Taylor","Jordan","Morgan","Casey","Riley","Avery","Peyton","Quinn","Skyler","Reese","Rowan","Sawyer","Emerson","Finley","Harper","Kendall","Parker"];
const lastNames = ["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin"];
const locations = ["New York","London","Paris","Berlin","Tokyo","Sydney","Toronto","San Francisco","Madrid","Rome"];
const bios = ["Love to chat!","Language enthusiast.","Here to make friends.","Always learning.","Music lover.","Coffee addict.","Traveler.","Bookworm.","Tech geek.","Fitness fan."];
const languages = ["English","Spanish","French","German","Japanese","Mandarin","Italian","Russian","Portuguese","Arabic"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomEmail(name, idx) {
  return `${name.toLowerCase()}${idx}@example.com`;
}

function randomAvatar(idx) {
  return `https://avatar.iran.liara.run/public/${(idx % 100) + 1}.png`;
}

async function seedUsers() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({});
  const users = [];
  for (let i = 0; i < 100; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;
    const email = randomEmail(firstName + lastName, i);
    const password = "password123";
    const bio = randomItem(bios);
    const nativeLanguage = randomItem(languages);
    let learningLanguage = randomItem(languages);
    while (learningLanguage === nativeLanguage) {
      learningLanguage = randomItem(languages);
    }
    const location = randomItem(locations);
    const profilePic = randomAvatar(i);
    users.push({
      fullName,
      email,
      password,
      bio,
      nativeLanguage,
      learningLanguage,
      location,
      profilePic,
      isOnboarded: true,
      friends: [],
    });
  }
  // Insert users
  const createdUsers = await User.insertMany(users);
  // Add friends (each user gets 5 random friends)
  for (let i = 0; i < createdUsers.length; i++) {
    const user = createdUsers[i];
    let friendIndexes = new Set();
    while (friendIndexes.size < 5) {
      let idx = Math.floor(Math.random() * createdUsers.length);
      if (idx !== i) friendIndexes.add(idx);
    }
    user.friends = Array.from(friendIndexes).map(idx => createdUsers[idx]._id);
    await user.save();
  }
  console.log("Seeded 100 users with friends.");
  mongoose.disconnect();
}

seedUsers();