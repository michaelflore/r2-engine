const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Applicant = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reliability: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pipeline: {
        type: Number,
        required: true
    }
}, { collection: "applicants"});

module.exports = mongoose.model("Applicant", Applicant);