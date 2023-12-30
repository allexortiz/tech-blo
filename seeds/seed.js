const seedUsers = require('./user');
const seedPosts = require('./post');
const seedComments = require('./comment');

const sequelize = require('../config/connection');

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        await seedUsers();
        await seedPosts();
        await seedComments();
        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        process.exit(0);
    }
};

seedAll();