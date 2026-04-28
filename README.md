# Virtual Psychologist Backend

Backend сервис для виртуального психолога с AI-аватаром.

## API Endpoints

### POST /api/chat

Отправить сообщение психологу.

**Request:**
```json
{
  "message": "Мне грустно...",
  "sessionId": "user123"
}
