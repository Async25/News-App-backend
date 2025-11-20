const mongoose = require('mongoose')

// Creating userAccounts 
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Creating blogs 
const postSchema = new mongoose.Schema({
    title: { type: String, required: true,unique: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    thumbnail: { type: String }
});




const user = mongoose.model("User", userSchema);
const blog = mongoose.model("Blogs", postSchema);

module.exports = { user, blog };

