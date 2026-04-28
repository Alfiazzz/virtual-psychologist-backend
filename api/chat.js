const { callLLM } = require('../lib/llm-client');
const { detectCrisis, generateCrisisResponse } = require('../lib/safety-guards');
const { getSession, addMessage } = require('../lib/session-store');

// Системный промт вашего виртуального психолога
const SYSTEM_PROMPT = `Ты — виртуальный психолог... (ВСТАВЬ СЮДА ВЕСЬ ТВОЙ ПРОМТ ИЗ НАЧАЛА)`;

module.exports = async function handler(req, res) {
  // Настройки CORS для работы с фронтендом
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, sessionId = 'default' } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Проверка кризисной ситуации
    if (detectCrisis(message)) {
      const crisisResponse = generateCrisisResponse();
      return res.status(200).json({
        response: crisisResponse.message,
        isCrisis: true,
        helpline: process.env.CRISIS_HELPLINE
      });
    }

    // 2. Получаем историю сессии
    const session = getSession(sessionId);
    
    // 3. Добавляем сообщение пользователя
    addMessage(sessionId, 'user', message);
    
    // 4. Вызываем LLM
    const llmResponse = await callLLM(session.messages, SYSTEM_PROMPT);
    
    // 5. Сохраняем ответ психолога
    addMessage(sessionId, 'assistant', llmResponse);
    
    // 6. Отправляем ответ
    return res.status(200).json({
      response: llmResponse,
      isCrisis: false,
      sessionId: sessionId
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      response: 'Извини, произошла ошибка. Попробуй ещё раз или обратись к реальному специалисту.'
    });
  }
};

Add chat.js endpoint
