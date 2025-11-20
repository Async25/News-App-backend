const express = require('express')
const router = express.Router()
const { saveUserImage, saveBlog, deleteBlog} = require('../controllers/controller.js');
const{userValidator} = require('../middleweres.js/middleweres.js')
const {blog} = require('../modals/modals.js')


require('dotenv').config();

// Basic routes 

//  this route  will send  10 news in json format 
router.get(`/`,  async (request, respone) => {
  
    const news = await blog.find().limit(10);   
    respone.json(news)
});

router.get('/search/:term', async (request, respone) => {
    const searchTerm = request.params.term;
    const searchResults = await searchBlogs(searchTerm);
    respone.json({ results: searchResults });
});


// middleware to validate user before  upload
router.use(userValidator);


router.post('/upload', async (request, respone) => {
  
    let image = `NoImg.png`
   
    //TODO save Author , Heading, paragraph and image 
    const title = request.body.title
    const content = request.body.content
    const author = request.body.author
    const tags = request.body.tags
    if (!title&&!content&& !author){
        respone.json({ "Error": "Title, Content and Author are required" })
        return  
        
    }


    if (request.files) {
        image = request.files.file
        const saveImageLocation = process.env.IMG_LOCATION
        saveUserImage(image, saveImageLocation)
    }

    let saveBlogRequest = await saveBlog(image, author, content, title, tags);
   
    respone.json({ message: "Upload complete" });
});


router.delete('/delete/:id', async (request, respone) => {
    //const userId = request.cookies.cookie.user_id;
    const userName = request.body.username;
    const blogId = request.params.id;
    const deleteBlogRequest = await deleteBlog(userName, blogId);
    respone.json({ message: deleteBlogRequest });
    
});


module.exports = router;

