const captainModel = require('../models/captainModel');

module.exports.createCaptain = async ({ firstName, lastName, age, email, password, vehicle, location }) => {
    if (!firstName || !age || !email || !password || !vehicle || !vehicle.color || !vehicle.plateNumber || !vehicle.capacity || !vehicle.vehicleType || !location || location.lng === undefined) {
        return { error: "Please fill all the required fields" };
    }

    const captain = await captainModel.create({

        firstName,
        lastName,

        age,
        email,
        password,

        color: vehicle.color,
        plateNumber: vehicle.plateNumber,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        lat: location.lat || 0,  // Default to 0 if not provided
        lng: location.lng

    });

    // await captain.save();
    console.log("the data before returning it ", captain);

    return captain;
};