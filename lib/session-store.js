const sessions = new Map();

function getSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      messages: [],
      createdAt: Date.now()
    });
  }
  return sessions.get(sessionId);
}

function addMessage(sessionId, role, content) {
  const session = getSession(sessionId);
  session.messages.push({ role, content });
  
  if (session.messages.length > 20) {
    session.messages = session.messages.slice(-20);
  }
}

function clearSession(sessionId) {
  sessions.delete(sessionId);
}

module.exports = { getSession, addMessage, clearSession };
