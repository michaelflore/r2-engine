const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = new Schema({
    name: {
        type: String,
        required: true
    }
}, { collection: "roles"});

module.exports = mongoose.model("Role", Role);