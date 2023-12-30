const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "",
        user_id: 2,
        post_id: 3,
        
    },
    {
        comment_text: "",
        user_id: 2,
        post_id: 5,
        
    },
    {
        comment_text: "",
        user_id: 4,
        post_id: 1,
        
    },
    {
        comment_text: "",
        user_id: 3,
        post_id: 5,
        
    },
    {
        comment_text: "",
        user_id: 3,
        post_id: 4,
        
    },
    {
        comment_text: "",
        user_id: 2,
        post_id: 1,
        
    },
    {
        comment_text: "",
        user_id: 5,
        post_id: 3,
        
    },
    {
        comment_text: "",
        user_id: 2,
        post_id: 1,
        
    }
];

const seedComments = () => {
    return Comment.bulkCreate(commentData)
        .then(() => console.log('Comments seeded successfully'))
        .catch((err) => console.error('Error seeding comments:', err));
};

module.exports = seedComments;