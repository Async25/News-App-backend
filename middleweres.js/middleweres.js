const { user } = require('../modals/modals');



// function to validate user during signup 
const userValidator = async function (request, responce, next) {
    try {
        const raw = request.cookies.cookie;
        const decoded = decodeURIComponent(raw);
        const data = JSON.parse(decoded.slice(2));
        const userId = data.user_id
        const userName = data.username
        console.log(userId, userName)
        console.log("RAW COOKIE:", request.cookies.cookie);

        if (!userId || !userName) {
            responce.json({ "Error": "Both username and user_id is required",data })

            return

        }

        const userVerification = await user.findOne({ username: userName })
        console.log(userVerification)

        if (userVerification) {
            responce.json({ "Error": "Username does not exist or invalid" })
            return
        }

        next()
    } catch (error) {
        responce.json({ "Error": "Unable to validate user, Try Again" })


    };
};
module.exports = { userValidator }




