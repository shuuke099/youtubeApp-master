const express = require('express');
const {createSubs, getAllSubs, getSubs, updateSubs, daleteSubs, getUserSubs, unSubscribe} = require('../Controller/subsController');
const {protect} = require('../Controller/AuthController');
const router = express.Router();
router.route('/getUserSubs').post(getUserSubs);
router.use(protect);
router.route('/').get(getAllSubs).post(createSubs);
router.route('/unSubscribe').post(unSubscribe);

router.route('/:id').get(getSubs).patch(updateSubs).delete(daleteSubs);

module.exports = router;
