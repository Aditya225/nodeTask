var controller = require('../controller/user.controiller');
var router = require('express').Router();
router.route('/register').
post(controller.register);
router.get('/',controller.authCheck);


router.route('/logs').post(controller.logIn );

router.route('/remove').delete(controller.exact);
router.route('/find').get(controller.findAll);

module.exports = router;