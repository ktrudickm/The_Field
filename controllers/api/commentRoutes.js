const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
      console.log('\n begin comment posting: ', req.body);
      const commentData = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log('\n after save: ', commentData);
      res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
      res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No post found with this id.' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    };
});

router.put('/:id', withAuth, async (req, res) => {
    try{
        const updatedComment = await Comment.update(
            {
                comment_text: req.body.comment,
            },
            {
                where: {
                    id: req.params.id
                },  
            },
        );

        if(!updatedComment){res.status(404).json({ message: 'Couldnt find this comment.'})};

        res.json(updatedComment);

    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;