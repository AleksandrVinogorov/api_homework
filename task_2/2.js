// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 

button = document.querySelector('.btn');
output = document.querySelector('.output');

// Определяем размеры экрана.
const widthScreen = window.screen.width;
const heightScreen = window.screen.height;
// Определяем размер окна с учетом прокрутки.
const widthIncludeScroll = window.innerWidth;
const heightIncludeScroll = window.innerHeight;
// Определяем размер окна пользователя без учета прокрутки.
const windowInnerWidth = document.documentElement.clientWidth;
const windowInnerHeight = document.documentElement.clientHeight;
// Определяем размер окна сайта.
const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;

button.addEventListener('click', () => {
    let result = `Размеры экрана: Ширина: ${widthScreen} пикселей, Высота ${heightScreen} пикселей <br>
    Размеры экрана с учетом прокрутки: Ширина: ${widthIncludeScroll} пикселей, Высота ${heightIncludeScroll} пикселей <br>
    Размер окна пользователя без учета прокрутки: Ширина: ${windowInnerWidth} пикселей, Высота ${windowInnerHeight} пикселей <br>
    Размер окна сайта: Ширина: ${pageWidth} пикселей, Высота ${pageHeight} пикселей <br>`;
    output.innerHTML = result
    let resultAlert = result.replaceAll(` <br>`,``);
    alert(resultAlert)
})
