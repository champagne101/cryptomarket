import axios from 'axios';
import fs from 'fs';
import OpenAI from 'openai';

import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.API_KEY,
  });
  
  async function main() {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'user',
          content: 'What is the meaning of life?',
        },
      ],
      max_tokens: 256, 
    });
  
    console.log(completion.choices[0].message);
  }
  
  main();
