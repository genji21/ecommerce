const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.post('/confirm',userCtrl.verify)

router.get('/logout',userCtrl.logout)
router.get('/refresh_token',userCtrl.refreshToken)
router.get('/infor',auth,userCtrl.getUser)

// social login 
router.post('/google_login',userCtrl.googleLogin)
router.post('/facebook_login', userCtrl.facebookLogin)
module.exports = router 