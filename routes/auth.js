const { register, login, getUsers } = require('../controllers/authController');
const { authorizationControl } = require('../middlewares/authMiddleware');

const router = require('express').Router();

//! register
router.post('/register', register);

//! login
router.post('/login', login);

//! control
router.get('/getUsers', authorizationControl, getUsers);

module.exports = router;
