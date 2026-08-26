const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost')
        ? false
        : { rejectUnauthorized: false }
});

// Auto-create database table on startup
const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS insights (
                id SERIAL PRIMARY KEY,
                original_text TEXT NOT NULL,
                sentiment VARCHAR(20),
                summary TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('✅ Database connected and schema ready');
    } catch (err) {
        console.error('❌ DB Initialization error:', err);
    }
};

initDb();

// Initialize AI Client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// POST route: Process with AI & Save to PostgreSQL
app.post('/api/analyze', async (req, res) => {
    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({
            error: 'No text provided'
        });
    }

    try {
        const prompt = `
Analyze the following text.

Return ONLY valid JSON in this exact format:
{
  "sentiment": "Positive",
  "summary": "Short 2-sentence summary"
}

The sentiment must be exactly one of:
Positive, Neutral, Negative.

Text:
${text}
`;

        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt
        });

        // Get AI response text
        const responseText = response.text.trim();

        // Remove Markdown code fences if Gemini returns them
        const cleanJson = responseText
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();

        // Convert AI JSON string into JavaScript object
        const parsed = JSON.parse(cleanJson);

        // Save result to PostgreSQL database
        const dbResult = await pool.query(
            `
            INSERT INTO insights
            (original_text, sentiment, summary)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [
                text,
                parsed.sentiment,
                parsed.summary
            ]
        );

        // Send saved result to frontend
        res.json(dbResult.rows[0]);

    } catch (error) {
        console.error('API/DB Error:', error);

        res.status(500).json({
            error: 'Failed to process request'
        });
    }
});

// GET route: Fetch past historical analysis logs
app.get('/api/history', async (req, res) => {
    try {
        const history = await pool.query(
            `
            SELECT *
            FROM insights
            ORDER BY created_at DESC
            LIMIT 10
            `
        );

        res.json(history.rows);

    } catch (error) {
        console.error('History Error:', error);

        res.status(500).json({
            error: 'Failed to fetch history'
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});