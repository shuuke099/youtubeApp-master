const express = require('express');
const {createView, getCurrentViews} = require('../Controller/viewController');

const router = express.Router({mergeParams: true});
router.route('/').post(createView);
router.route('/getCurrentViews').post(getCurrentViews);

module.exports = router;
