
import express from "express";
import HealthData from "../Models/HealthData.js";

const router = express.Router();


// POST - Add health data
router.post("/", async (req, res) => {

    try {

        const {
            userId,
            weight,
            water,
            steps,
            bmi,
            targetWeight,
            stepsGoal,
            waterGoal
        } = req.body;


        // Start of today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Start of tomorrow
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);


        // Check if today's data already exists
        const existingData = await HealthData.findOne({

            userId: userId,

            date: {
                $gte: today,
                $lt: tomorrow
            }

        });


        // If today's data already exists
        if (existingData) {

            existingData.water =
                (existingData.water || 0) + (Number(water) || 0);

            existingData.steps =
                (existingData.steps || 0) + (Number(steps) || 0);


            // Update these only if new values are provided
            if (weight !== undefined) {
                existingData.weight = weight;
            }

            if (bmi !== undefined) {
                existingData.bmi = bmi;
            }

            if (targetWeight !== undefined) {
                existingData.targetWeight = targetWeight;
            }

            if (stepsGoal !== undefined) {
                existingData.stepsGoal = stepsGoal;
            }

            if (waterGoal !== undefined) {
                existingData.waterGoal = waterGoal;
            }


            await existingData.save();


            return res.status(200).json({

                message: "Today's health data updated successfully",

                healthData: existingData

            });

        }


        // If today's data does not exist
        const healthData = new HealthData({

            userId,

            weight,

            water: Number(water) || 0,

            steps: Number(steps) || 0,

            bmi,

            targetWeight,

            stepsGoal,

            waterGoal,

            date: new Date()

        });


        await healthData.save();


        res.status(201).json({

            message: "Health data added successfully",

            healthData

        });


    } catch (err) {

        res.status(500).json({

            message: "Failed to add health data",

            error: err.message

        });

    }

});


// GET - Get health data
router.get("/:userId", async (req, res) => {

    try {

        const data = await HealthData.find({

            userId: req.params.userId

        }).sort({ date: -1 });


        res.status(200).json(data);


    } catch (err) {

        res.status(500).json({

            message: "Failed to fetch health data",

            error: err.message

        });

    }

});


// PUT - Update health data
router.put("/:id", async (req, res) => {

    try {

        const updatedData =
            await HealthData.findByIdAndUpdate(

                req.params.id,

                req.body,

                { new: true }

            );


        if (!updatedData) {

            return res.status(404).json({

                message: "Health data not found"

            });

        }


        res.status(200).json({

            message: "Health data updated successfully",

            updatedData

        });


    } catch (err) {

        res.status(500).json({

            message: "Failed to update health data",

            error: err.message

        });

    }

});


// DELETE - Delete health data
router.delete("/:id", async (req, res) => {

    try {

        const deletedData =
            await HealthData.findByIdAndDelete(

                req.params.id

            );


        if (!deletedData) {

            return res.status(404).json({

                message: "Health data not found"

            });

        }


        res.status(200).json({

            message: "Health data deleted successfully"

        });


    } catch (err) {

        res.status(500).json({

            message: "Failed to delete health data",

            error: err.message

        });

    }

});


export default router;
