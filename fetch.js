import dotenv from 'dotenv';
dotenv.config();

const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      'HTTP-Referer': 'https://domain.com', 
      'X-Title': 'Name',              
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'user',
          content: 'What is the meaning of life?',
        },
      ],
      max_tokens: 256, 
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error);
  } else {
    const data = await response.json();
    console.log(data.choices[0].message.content);
  }
  