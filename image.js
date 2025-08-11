import dotenv from 'dotenv';
dotenv.config();


const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: "What's in this image?",
            },
            {
              type: 'image_url',
              image_url: {
                url: 'https://coinedition.com/wp-content/uploads/2025/02/Bitcoin-Bull-Run-Cycle-Chart-Points-to-Next-Phase-for-BTC-with-Price-Analysis.jpg',
              },
            },
          ],
        },
      ],
    }),
  });
  
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
  