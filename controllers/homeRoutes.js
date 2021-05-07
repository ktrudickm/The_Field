const router = require('express').Router();
const { Post, User, Comment, Category} = require('../models');
const withAuth = require('../utils/auth');

//route to homepage if user is logged in. if logged out, redirects to login page
router.get('/', withAuth, (req, res) => {
    res.render('homepage', {
    logged_in: req.session.logged_in
    });
});

//route to login page
router.get('/login', (req, res) => {
    res.render('login', {logged_in: req.session.logged_in}) 
});

// get all posts (and their comments) for a selected sport
router.get('/sport/:id', withAuth, async (req,res) => {
    try{
        const sportData = await Post.findAll({
            where: [
                {
                    category_id: req.params.id,
                }
            ],
            attributes: ['id', 'title', 'description', 'category_id', 'user_id'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['id', 'content', 'post_id', 'user_id'],
                    include: [User]
                }],
        });
        const sports = sportData.map((sport) => sport.get({ plain: true }));
        const category_id = req.params.id;
        console.log('\n sports /n',sports, '\n')
        res.render('sport', {
            sports,
            category_id,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;