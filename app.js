const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

document.getElementById('testBtn').addEventListener('click', () => {
    tg.showAlert('Привет из Mini App!');
});