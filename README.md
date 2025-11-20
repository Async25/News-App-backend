# NewsApp

A simple **News Management Application** built with **Node.js**, **Express**, and **MongoDB**. This app allows users to sign up, log in, upload news/blog posts with images, and fetch news articles.  

---

## Features

- User authentication (Signup & Login)
- Upload news/blog posts with images
- Fetch latest 10 news/blog posts
- Search news/blog posts by keywords
- Delete blog posts
- Middleware validation for users before uploading

---

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv for environment variables
- express-fileupload for handling image uploads
- cookie-parser for cookies management

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>

├── main.js                # Entry point
├── routes
│   ├── authRoutes.js      # Authentication routes (signup/login)
│   └── newsRoutes.js      # News/blog routes (CRUD operations)
├── controllers
│   └── controller.js      # Logic for handling requests
├── Config
│   └── db.js              # MongoDB connection setup
├── modals
│   └── modals.js          # Mongoose models
├── middleweres.js         # Custom middleware
├── public
│   └── images             # Folder for uploaded images
└── .env                   # Environment variables


