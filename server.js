import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors'; 

const app = express();
app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'https://aicryptoanalyzer.netlify.app'
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
  
app.use(bodyParser.json());

app.post('/analyze', async (req, res) => {
    const { events } = req.body;
    const prompt = `Analyze the following market events and provide insights:\n\n${events.map(e => `- ${e.text}`).join('\n')}`;
  
    try {
        const aiRes = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-r1:1.5b', 
          prompt,
          stream: false 
        })
      });
  
      if (!aiRes.ok) {
        const text = await aiRes.text();
        console.error('Ollama API error:', aiRes.status, text);
        return res.status(500).json({ analysis: `Ollama error: ${aiRes.status} ${text}` });
      }
  
      const data = await aiRes.json();
      console.log('Ollama full response:', data);
      res.json({ analysis: data.response || data.output || JSON.stringify(data) });
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({ analysis: 'Error generating analysis', error: err.message });
    }
  });
  

app.listen(3001, () => console.log('AI backend running on http://localhost:3001'));
