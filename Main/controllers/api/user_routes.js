const router = require('express').Router();
const { User } = require('../../models');

router.post('1', async (req, res) =>  {
    try{
        const newUser = await User.creat({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            req.json(newUser);
        });
    } catch (err) {
        req.statusCode(500).json(err);
    }

});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },

        });
        // if there's no matching user, send back an error message and redirect to login page with a flash message of "wrong credentials"
        if (!user) {
            res.status(400).json({ message: 'User account not found' });
            return;
        }
        //check for valid password
        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'User account not found'});
        return;
        }
        //        console.log(`Valid Password`);
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            req.json({ user, message: 'You are logged in' });

        });

    } catch (err) {
        res.status(400).json ({ message: 'User account not found'});
    
    }

});

router.post('/logout', (req, res) => {
    if(!req.session.loggedIn){
        req.session.destroy(() => {
            req.status(204).end();
        });
    } else {
        req.status(404).end();
    }
});

module.exports = router;