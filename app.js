// Инициализируем Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Ищем нашу кнопку на странице по её ID
document.getElementById('sendBtn').addEventListener('click', async () => {
    // Берем значения из полей ввода
    const orderNo = document.getElementById('orderNo').value;
    const amount = document.getElementById('amount').value;
    
    // Проверяем, что поля не пустые
    if (!orderNo || !amount) {
        tg.showAlert('Пожалуйста, заполни номер заказа и сумму.');
        return;
    }

    // Данные, которые мы отправим на Python-сервер
    const data = {
        chat_id: tg.initDataUnsafe.user.id, // Автоматически берет ID пользователя из Telegram
        order_no: orderNo,
        amount: parseFloat(amount) // Превращаем текст в число
    };

    try {
        // Отправляем POST-запрос на наш сервер (он работает на порту 8000)
        const response = await fetch('http://localhost:8000/api/new_order', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        // Показываем всплывающее окно внутри Telegram с ответом от сервера
        tg.showAlert('Успех! ' + result.message);
        
        // Очищаем поля после отправки
        document.getElementById('orderNo').value = '';
        document.getElementById('amount').value = '';

    } catch (error) {
        // Если сервер не запущен или произошла ошибка, показываем это
        tg.showAlert('Ошибка: Не удалось связаться с сервером. Убедись, что server.py запущен.');
    }
});
