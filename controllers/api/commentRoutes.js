const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new comment (requires authentication)
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const dbCommentData = await Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });
            res.status(201).json({ status: 'success', data: { comment: dbCommentData } });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: 'error', message: 'Failed to create comment' });
    }
});

module.exports = router;