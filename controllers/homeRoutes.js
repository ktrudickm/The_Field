const router = require('express').Router();
const { Post, User, Comment, Category} = require('../models');
const withAuth = require('../utils/auth');


router.get('/login', (req, res) => {
    res.render('login', {logged_in: req.session.logged_in}) 
});

router.get('/', withAuth, (req, res) => {
        res.render('login', {
        logged_in: req.session.logged_in,
        });
});

router.get('/homepage', (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in}) 
});


// pick sport
router.get('/sport/:id', withAuth, async (req,res) => {
    try{
        console.log('\n before sportData, req.params: ', req.params.id);
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
        console.log('\n sportData: ', sportData);
        const sports = sportData.map((sport) => sport.get({ plain: true }));
        console.log('\n line 34 sports: ', sports);
        res.render('sport', {
            sports,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// list of posts for a sport in  location
// get info for (all)posts with specific location_id and category_id
router.get('/sport', withAuth, async (req,res) => {
    try{
        const asportsposts = await Post.findAll({
            where: req.params.category_id, //category_id from post to specify which sport to get posts for
        });
    } catch (err){
        res.status(500).json(err);
    }
});

// specific post
router.get('/', withAuth, async (req,res) => {
    try{
        const specificPost = await Post.findbyPk(req.params.id, {
            attributes: ['id', 'title', 'description', 'category_id', 'location_id', 'user_id',],
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
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        if(!specificPost){
            res.status(404).json({message: `Couldn't find that post!`});
        };
        const post = specificPost.get({ plain: true });
        res.render('post', {
            post,
            logged_in: req.session.logged_in,
        });

    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;