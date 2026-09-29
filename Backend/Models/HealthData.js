import mongoose from "mongoose";

const healthDataSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    weight: {
        type: Number
    },

    water: {
        type: Number,
        default: 0
    },

    steps: {
        type: Number,
        default: 0
    },

    bmi: {
        type: Number
    },

    targetWeight: {
        type: Number
    },

    stepsGoal: {
        type: Number
    },

    waterGoal: {
        type: Number
    },

    date: {
        type: Date,
        default: Date.now
    }

});

const HealthData = mongoose.model(
    "HealthData",
    healthDataSchema
);

export default HealthData;