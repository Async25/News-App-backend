const fileUpload = require("express-fileupload");
const path = require("path");
const crypto = require('crypto')
const { blog, user } = require('../modals/modals');


//function to save uploaded images 
const saveUserImage = function (file, filePath) {
    try {
        const image = file
        const randomName = crypto.randomBytes(16).toString('hex');
        const extensionName = path.extname(image.name);
        const newName = randomName + extensionName;
        const fileLocation = path.join(filePath, newName);
        const allowedExtension = ['.png', '.jpg', '.jpeg'];

        if (!allowedExtension.includes(extensionName)) {
            return ('Inavalid Image')
        }

        fileUpload.mv(fileLocation, (error) => {
            if (error) {
                console.log(error)
            }
        })

        return newName;

    } catch (err) {
        console.log("Error occured during file transfer at controllers", err)
    }
}

//function to save new blogs or news 
const saveBlog = async function (image, author, content, title, tags) {
    try {
        const newblog = new blog({ title: title, content: content, author: author, tags: tags, thumbnail: image })
        return await newblog.save()
    }
    catch (error) {
        return (`error occoured while saving the Article:- ${error}`)
    }
}

//function to save userinformations 
const saveUserInfos = async function (username, email, password) {
    try {
        const newUser = new user({ username: username, email: email, password: password })
        return newUser.save();
    } catch (error) {
        return (`error occoured while saving the User information:- ${error}`)
    }

}

//function to validate user logins 
const validateLogin = async function (request, responce) {
    try {

        const username = request.body.username
        const password = request.body.password
        if (!username && !password) {
            responce.json("Username and password is requrid")
            return;
        }
        const userAuth = await user.findOne({ username: username, password: password })
        if (userAuth === null) {

            responce.json('incorrect username or password', username, password)
        }
        const userInfoWithId = {
            "user_id": userAuth._id.toString(),
            "username": userAuth.username,
        }
        responce.cookie("cookie", userInfoWithId, { httpOnly: true, secure: true, sameSite: "strict" }).json({ message: "User logged in!" });
    } catch (error) {
        responce.json('Unable to validate user, Try Again', error)
    }
}

// Function to validate the user id and delete the blog 
const deleteBlog = async function (username, blogId) {
    try {
        const userQuery = await user.findOne({ username: username });
        const userId = userQuery._id.toString();
        const blogQuery = await blog.findOne({ _id: blogId, author: userId });
        if (blogQuery === null) {
            return ("Blog not found or you are not authorized to delete this blog")
        }
        await blog.deleteOne({ _id: blogId });
        return ("Blog deleted successfully");

    } catch (error) {
        return (`Error occurred while deleting the blog: ${error}`);

    }
}
//function for hanfling searh requests
const searchBlogs = async function (searchTerm) {
    try {
        const searchQuery = await blog.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } },
                { tags: { $regex: searchTerm, $options: 'i' } }
            ]
        }).limit(10);

        if (searchQuery == []) {
            return ('No matching blogs found')

        }
        return searchQuery;

    } catch (error) {
        return ('Error occured during search operation')
    }
}

module.exports = { saveUserImage, saveBlog, saveUserInfos, validateLogin, deleteBlog, searchBlogs }; 
