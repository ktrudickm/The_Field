const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {

  console.log('REQ', req.body)
  try {
    const createPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(createPost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const getPost = await Post.findByPk(req.params.id, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(getPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postInfo = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postInfo) {
      res.status(404).json({ message: 'No posts were found.' });
      return;
    }

    res.status(200).json(postInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;