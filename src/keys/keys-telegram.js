// Токен бота BikeMe_Scanner_bot
const TOKEN_TELEGRAM_BikeMe_Scanner_bot = "5486245743:AAG-NZzrNigBA3uquPHqt07f9aeNe8dpgvQ";

export const KEYS_TELEGRAM = {
    CHAT_ID: "-639005167", // ID чата в Телеграме
    // CHAT_ID: "-586513671", // ID чата в Телеграме ТЕСТ

    // URI для отправки текстового сообщения
    URI_API_MESSAGE: `https://api.telegram.org/bot${TOKEN_TELEGRAM_BikeMe_Scanner_bot}/sendMessage`,
    // URI для отправки гео-локации
    URI_API_LOCATION: `https://api.telegram.org/bot${TOKEN_TELEGRAM_BikeMe_Scanner_bot}/sendLocation`,
}
