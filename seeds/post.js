const { Post } = require('../models');

const postData = [
    {
        title: "Why MVC is so important",
        content: "MVC allows developers to maintain a true separation of concerns, dividing their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
        user_id: 1
    },
    {
        title: "Authentication vs. Authorization",
        content: "There is a difference between authentication and authorization. Authentication means confirming your own idenity, whereas authoization means being allowed access to the system.",
        user_id: 2
    },
    {
        title: "Object-Relational Mapping",
        content: "I have really loved learning about ORMs. It's really simplified teh way I create queriers in SQL!",
        user_id: 3

    }
]

const seedPosts = async () => {
    try {
        await Post.bulkCreate(postData);
        console.log('Posts seeded successfully');
    } catch (err) {
        console.error('Error seeding posts:', err);
    }
};

// Call the function in an async context
(async () => {
    await seedPosts();
    // Any other asynchronous operations or exit the script
})();

module.exports = seedPosts;