const express = require('express');
const {createUSer, getAllUSers, getUSer, updateUSer, daleteUSer, uploadUserPhoto, resizeUserPhoto, updateMe} = require('../Controller/userController');
const {signup, login, logout, protect} = require('../Controller/AuthController');
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.use(protect);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);

router.route('/').get(getAllUSers).post(createUSer);

router.route('/:id').get(getUSer).patch(updateUSer).delete(daleteUSer);

module.exports = router;
