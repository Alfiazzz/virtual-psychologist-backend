// Подключение к бесплатной LLM через OpenRouter
async function callLLM(messages, systemPrompt) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://psychologist.vercel.app',
      'X-Title': 'Virtual Psychologist'
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.1-8b-instruct:free', // Бесплатная модель
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    throw new Error(`LLM error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

module.exports = { callLLM };
