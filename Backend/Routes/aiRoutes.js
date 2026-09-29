import express from "express";
import HealthData from "../Models/HealthData.js";

const router = express.Router();

const models = [
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash-lite"
];

const generateAIResponse = async (prompt) => {

    for (const model of models) {

        console.log(`Trying Gemini model: ${model}`);

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            console.log(`Successful model: ${model}`);

            return data;
        }

        console.log(
            `${model} failed:`,
            data.error?.code,
            data.error?.message
        );
    }

    throw new Error("All available Gemini models are currently unavailable.");
};


router.post("/analyze", async (req, res) => {

    try {

        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const healthData = await HealthData
            .find({ userId })
            .sort({ date: -1 })
            .limit(7);

        if (healthData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No health data found for this user"
            });
        }

        const cleanData = healthData.map((data) => ({
            date: data.date,
            weight: data.weight,
            water: data.water,
            steps: data.steps,
            bmi: data.bmi,
            targetWeight: data.targetWeight,
            stepsGoal: data.stepsGoal,
            waterGoal: data.waterGoal
        }));

        const prompt = `
You are the AI Wellness Coach inside a fitness tracking application called VitalTracker.

Analyze the user's recent health and fitness data.

Give your response using exactly these sections:

📊 Progress Summary
Briefly describe the user's recent progress.

💪 What You're Doing Well
Mention the positive things you notice.

⚠️ What You Can Improve
Mention areas that could be improved.

🎯 Suggestions
Give 2 or 3 simple and practical suggestions.

Keep the response friendly, concise and easy to understand.

Important:
- Do not diagnose diseases.
- Do not prescribe medicines.
- Do not provide medical treatment.
- Do not make up missing information.
- Base your analysis only on the data provided.

User's recent VitalTracker data:

${JSON.stringify(cleanData, null, 2)}
`;

        const data = await generateAIResponse(prompt);

        const analysis =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!analysis) {
            return res.status(500).json({
                success: false,
                message: "No analysis received from Gemini"
            });
        }

        res.json({
            success: true,
            analysis: analysis
        });

    } catch (error) {

        console.error("AI Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate AI analysis",
            error: error.message
        });
    }

});

export default router;