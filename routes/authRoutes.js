const express = require('express')
const router = express.Router()
const { saveUserInfos,validateLogin } = require('../controllers/controller.js');


router.get('/',(request,responce) => { 
responce.json("Welcome to NewsApp")

 });

router.post('/signup', async (request, respone) => {
    
    const username = request.body.username;
    const password = request.body.username;
    const email = request.body.password;
    const saveNewUser = await saveUserInfos(username, email, password);
    console.log(saveNewUser);
    respone.json(saveNewUser);

});

router.post('/login', async (request, responce) => {
    
   await validateLogin(request,responce)
});

module.exports = router;
