/*Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат: 

Добавить в чат механизм отправки гео-локации

При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/
с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.*/

const wsUri = "wss://echo-ws-service.herokuapp.com",
    input = document.querySelector('.input'),
    sendMsg = document.querySelector('.send-message'),
    defineGeoPos = document.querySelector('.geo-location'),
    windowOutput =  document.querySelector('.chat-bot_messages');

// объявляем экземпляр websocket
const webSocket = new WebSocket(wsUri); 

function writeToScreen(message, position) {
let getMessage = `<p class='messages' style='align-self: ${position}'>${message}</p>`;
windowOutput.innerHTML += getMessage;
windowOutput.scrollTop = windowOutput.scrollHeight;
}

//отправка сообщения
sendMsg.addEventListener('click', () => {
	let message = input.value;

	webSocket.send(message);
	    writeToScreen(`Вы: ${message}`, 'flex-end');
	input.value = ''
    webSocket.onmessage = function(evt) {
        writeToScreen(`Сервер: ${evt.data}`, 'flex-start');
    };
    webSocket.onerror = function(evt) {
        writeToScreen(`server: ${evt.data}`, 'flex-start');
    };
  });

  //Объект соединения
  // Функции, выполняющиеся при успешном или неудачном определении геолокации
  const success = (position) => {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
  };
  const err = () => {
	writeToScreen('Невозможно получить ваше местоположение', 'flex-start');
  };

// Определение местоположения
defineGeoPos.addEventListener('click', () => {
	if (!navigator.geolocation) {
	  alert('Геолокация не поддерживается вашим браузером');
	} else {
	  navigator.geolocation.getCurrentPosition(success, err);
	}
});