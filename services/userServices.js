const userModel = require("../models/userModel");

module.exports.creatUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) {
        return { error: "Please fill all the fields" };
    }
    console.log("the user in the services", firstName, lastName, password, email);

    
    const user = await userModel.create({

        firstName,
        lastName,
        email,  // ✅ No need to repeat `email: email`
        password
    });

    return user
}