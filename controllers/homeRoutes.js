const router = require('express').Router();
const { Post, User, Comment, Category, Location } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try{
        const//get data needed for homepage
    } catch (err) {
        res.status(500).json(err);
    }
});

//login (which might be home page ('/'))

// pick location
router.get('/location', withAuth, async (req,res) => {
    try{
        const locationData = await Location.findAll({
            attributes: ['id', 'name',],
        });
        const locations = locationData.map((location) => location.get({ plain: true }));
        res.render('locations', {
            locations,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// pick sport
router.get('/sport', withAuth, async (req,res) => {
    try{
        const sportData = await Category.findAll({
            attributes: ['id', 'name'],
        });
        const sports = sportData.map((sport) => sport.get({ plain: true }));
        res.render('sports', {
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