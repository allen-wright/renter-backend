const bcrypt = require('bcryptjs');
const db = require('./models');
const seedData = require('./seedData');

const SEED_USER_PASSWORD = '1234';

deleteDatabases = async () => {
  try {
    for (database in db) {
      await db[database].deleteMany({});
      console.log(`Deleted ${database} database...`);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedUsers = async () => {
  try {
    for (user of seedData.users) {
      // hash password
      const hash = await bcrypt.hash(SEED_USER_PASSWORD, 10);
      user.password = hash;
      // create user in database with hashed password
      await db.User.create(user);
    }
    console.log('Seeded User...');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedNonUsers = async () => {
  try {
    for (data in seedData) {
      if (data !== 'users') {
        await db[data].create(seedData[data]);
        console.log(`Seeded ${data}...`);
      }
    }
    process.exit(0);
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase = async () => {
  try {
    await deleteDatabases();
    await seedUsers();
    await seedNonUsers();
    console.log('Successfully seeded database.');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();