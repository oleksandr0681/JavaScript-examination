const body = document.querySelector('body');
// console.log(body);

// menu
const menuButton = document.querySelector('.menu__burger-btn');
const menuItems = document.querySelectorAll('.menu__item_main');
const menuList = document.querySelector('.menu__list');
const menuBar = document.querySelector('.menu-bar');

menuButton.onclick = function() {
    // // Обработка menuButton.onclick отменяется, потому что при position: absolute menuButton не всегда работает. 
    // console.log('menu button click');
    // for (let i = 0; i < menuItems.length; i++) {
    //     menuItems[i].classList.toggle('menu__item_show');
    // }
}

// portfolio
// Фильтр
const filterCheckboxes = document.querySelectorAll('.filter__item input'), 
    portfoliosDiv = document.querySelector('.portfolios');
    portfolioCards = document.querySelectorAll('.portfolio-card');
// console.log(portfolioCards);
showPortfolioCards(filterCheckboxes, portfolioCards);
console.log(filterCheckboxes);
for (let i = 0; i < filterCheckboxes.length; i++) {
    // filterCheckboxes[i].onclick = function() {
    //     console.log('filterCheckbox click');
    // }
    // Обработка checkbox all-checkbox onclick.
    if (filterCheckboxes[i].id == 'all-checkbox') {
        filterCheckboxes[i].onclick = function() {
            // console.log(this.checked);
            if (this.checked == true) {
                addCheckboxChecked(filterCheckboxes);
            }
            else {
                removeCheckboxChecked(filterCheckboxes);
                for (let j = 0; j < filterCheckboxes.length; j++) {
                    if (filterCheckboxes[j].id == 'personal-checkbox') {
                        filterCheckboxes[j].checked = true;
                    }
                }
            }
            showPortfolioCards(filterCheckboxes, portfolioCards);
        }
    }
    // Обработка остальных checkbox onclick.
    else {
        filterCheckboxes[i].onclick = function() {
            allCheckboxChecking(filterCheckboxes);
            showPortfolioCards(filterCheckboxes, portfolioCards);
        }
    }
    
}
// Сортирование.
const sortParameterOptions = document.querySelectorAll('.sort select option');
const sortDiv = document.querySelector('.sort');
const sortSelect = document.querySelector('.sort select');
// Создание аналога select. 
createPersonalisedSelect(sortParameterOptions, sortDiv);
sortSelect.classList.add('sort__select_hidden');
// Сортирование при загрузке страницы.
// let selectedValue = selectedOptionValue(sortParameterOptions);
// showSortedPortfolioCards(selectedValue, portfoliosDiv);
showSortedPortfolioCards(sortSelect.value, portfoliosDiv);

// services
const servicesBoxItems = document.querySelectorAll('.services-box__item');
// Первый вариант.
for (let i = 0; i <servicesBoxItems.length; i++) {
    //console.log(servicesBoxItems[i].querySelector('.group__name').innerHTML);
    servicesBoxItems[i].onclick = function() {
        removeClass(servicesBoxItems, '.services-box__item-content', 'services-box__item-content_show');
        const content = this.querySelector('.services-box__item-content');
        content.classList.add('services-box__item-content_show');
    }
}
// Второй вариант.
// for (let i = 0; i <servicesBoxItems.length; i++) {
//     const groupPicture = servicesBoxItems[i].querySelector('.services-box__item-row .picture');
//     groupPicture.onclick = function() {
//         // console.log('picture click');
//         const servicesBoxItem = this.parentElement.parentElement;
//         const content = servicesBoxItem.querySelector('.services-box__item-content');
//         removeClass(servicesBoxItems, '.services-box__item-content', 'services-box__item-content_show');
//         content.classList.add('services-box__item-content_show');
//     }
// }
// Конец второго варианта.

// form 
// Первый вариант.
// const formButton = document.querySelector('form div label input[type=submit]');
const alertText = document.querySelector('.alertWindow__text');
const alertClose = document.querySelector('.alertWindow__close');
const alertWindow = document.querySelector('.alertWindow');
// formButton.onclick = function(event) {
//    // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
//    // Event.preventDefault()
//    // Calling preventDefault() during any stage of event flow cancels the event, meaning that any default action normally taken by the implementation as a result of the event will not occur.
//     event.preventDefault();
//     //console.log('submit click');
//     let fieldsFilled = true;
//     const inputs = document.querySelectorAll('form div label input[name]');
//     const textarea = document.querySelector('form div textarea[name=Message]');
//     for(i = 0; i < inputs.length; i++) {
//         //console.log(inputs[i].value);
//         if(inputs[i].value == '') {
//             fieldsFilled = false;
//         }
//     }
//     if(textarea.value == '') {
//         fieldsFilled = false;
//     }
//     // Если поля заполнены.
//     if (fieldsFilled) {
//         alertText.innerText = 'Ваша форма отправлена';
//     }
//     // Если поля не заполнены.
//     else {
//         alertText.innerText = 'Поля не заполнены';
//     }
//     alertWindow.classList.remove('alertWindow_hidden');
// }

// Второй вариант (с использованием коллекции forms).
const 
    forms = document.forms, 
    form = forms[0], 
    formInputElemets = form.userData.elements, 
    formSubmitButton = form.submitButton;

// console.log('userData elements: ');
// console.log(form.userData.elements);
formSubmitButton.onclick = function(e) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    // Event.preventDefault()
    // Calling preventDefault() during any stage of event flow cancels the event, meaning that any default action normally taken by the implementation as a result of the event will not occur.
    e.preventDefault();
    let fieldsFilled = true;
    for (let i = 0; i < formInputElemets.length; i++) {
        // console.log(formInputElemets[i].value);
        if (formInputElemets[i].value == '') {
            fieldsFilled = false;
            formInputElemets[i].classList.add('empty');
        }
        else {
            formInputElemets[i].classList.remove('empty');
        }
    }
    // Если поля заполнены.
    if (fieldsFilled) {
        alertText.innerText = 'Ваша форма отправлена';
    }
    // Если поля не заполнены.
    else {
        alertText.innerText = 'Поля не заполнены';
    }
    alertWindow.classList.remove('alertWindow_hidden');
}
// Конец второго варианта.
alertClose.onclick = function() {
    alertWindow.classList.add('alertWindow_hidden');
}
// Конец form.

// Прокрутка документа в начало страницы.
const arrowToTop = document.querySelector('.arrow-top');
arrowToTop.onclick = function() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    // Без закрытия burger menu при открытом burger menu после нажития кнопки "в начало" burger menu не видно.
    // Поэтому сейчас burger menu закрывается.
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove('menu__item_show');
    }
    menuList.classList.remove('menu__list_show');
}

// Обработка всех onclick body.
body.onclick = function(event) {
    // https://developer.mozilla.org/ru/docs/Web/API/Element/closest
    // Метод Element.closest() возвращает ближайший родительский элемент (или сам элемент), который соответствует заданному CSS-селектору или null, если таковых элементов вообще нет.

    // https://developer.mozilla.org/uk/docs/Web/API/Подія/target
    // Event.target
    // Властивість target інтерфейсу Event є посиланням на об'єкт який відправив подію. Він відрізняється від Event.currentTarget коли обробник події було визвано в фазі всплиття або фіксації події.

    // Обработка onclick кнопки .menu__burger-btn . Первый вариант не работает.
    // if (event.target == menuButton) {
    //     console.log('menu button click из body.onclick');
    //     for (let i = 0; i < menuItems.length; i++) {
    //         menuItems[i].classList.toggle('menu__item_show');
    //     }
    // }

    // Обработка onclick кнопки .menu__burger-btn . Второй вариант работает.
    if (event.target.closest('.menu__burger-btn')) {
        // console.log('menu button click из body.onclick');
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.toggle('menu__item_show');
        }
        menuList.classList.toggle('menu__list_show');
    }

    // Обработка onclick кнопки .menu__burger-btn . Третий вариант тоже работает.
    // if (event.target.classList.contains('menu__burger-btn') || 
    //     event.target.parentElement.classList.contains('menu__burger-btn') ) {
    //     console.log('menu button click из body.onclick');
    //         for (let i = 0; i < menuItems.length; i++) {
    //         menuItems[i].classList.toggle('menu__item_show');
    //     }
    // }
    // console.log(event.target);

    // Закрытие окна menu__list по клику вне menu.
    if (!event.target.closest('.menu__list')) {
        // Если не нажималась кнопка menu__burger-btn
        if (event.target.closest('.menu__burger-btn') == null) {
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.remove('menu__item_show');
            }
            menuList.classList.remove('menu__list_show');
        }
    }

    // Закрытие аналога select сортировки по клику вне select. 
    if (!event.target.closest('.personalised-select__options')) {
        // Если не нажимался аналог select. 
        // if (!event.target.classList.contains('personalised-select__value')) {
        if (!event.target.closest('.personalised-select__value')) {
            const selectOptions = document.querySelector('.personalised-select__options');
            selectOptions.classList.remove('personalised-select__options_show');
        }
    }

    // аккордеон в исходное состояние по клику вне services-box__item.
    if ((event.target.closest('.services-box__item') == null)) {
        // console.log('Вне services-box__item');
        removeClass(servicesBoxItems, '.services-box__item-content', 'services-box__item-content_show');
        const content = servicesBoxItems[0].querySelector('.services-box__item-content');
        content.classList.add('services-box__item-content_show');
    }

    // Закрытие окна alertWindow__text-box по клику вне окна.
    if (event.target.closest('.alertWindow__text-box') == null) {
        // Если не нажималась кнопка SEND (name="submitButton") (второй вариант раздела "form" в main.js).
        if (event.target != formSubmitButton) {
            // Если показано окно alertWindow__text-box.
            if (alertWindow.classList.contains('alertWindow_hidden') == false) {
                alertWindow.classList.add('alertWindow_hidden');
            }
        }
    }
}

document.onscroll = function() {
    let menuCoordinates = menuBar.getBoundingClientRect(), 
        partMenuHeight = menuCoordinates.height * 0.7, 
        bodyCoordinates = body.getBoundingClientRect(), 
        bodyHeight = bodyCoordinates.height;

    // Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим) (координаты в контексте окна).
    // https://developer.mozilla.org/ru/docs/Web/API/Element/getBoundingClientRect
    // https://learn.javascript.ru/coordinates

    //console.log('window.scrollY',  window.scrollY);
    // scrollY — свойство только для чтения интерфейса Window. Возвращает число пикселей, на которое документ пролистали в данный момент по вертикали.
    // https://developer.mozilla.org/ru/docs/Web/API/Window/scrollY
    // Если прокручено меню.
    if (window.scrollY > partMenuHeight) {
        menuBar.classList.add('menu-bar_fixed');
    }
    else {
        menuBar.classList.remove('menu-bar_fixed');
    }

    // Вариант с pageYOffset.
    // if (pageYOffset > partMenuHeight) {
    //     menuBar.classList.add('menu-bar_fixed');
    // }
    // else {
    //     menuBar.classList.remove('menu-bar_fixed');
    // }
    // Window.pageYOffset
    // https://developer.mozilla.org/ru/docs/Web/API/Window/pageYOffset

    // pageYOffset - свойство окна Window , доступное только для чтения. Это то же свойство, что и scrollY и, как таковое, оно тоже возвращает количество пикселей, на которое прокручен документ по вертикали (вниз или вверх). Значение свойства равное 0.0 говорит о том, что в данный момент верхний край документа Document совпадает с верхним краем области содержимого окна.

    // Есть незначительная разница в поддержке pageYOffset и scrollY, первый поддерживается лучше в старых браузерах, но если не затрагивать очень старые версии, то использовать можно любое свойство. Они идентичны.

    // Соответствующее свойство pageXOffset, которое возвращает количество пикселей, на которое документ прокручен по горизонтали, это то же самое, что и scrollX.
    // Синтаксис
    // yOffset = window.pageYOffset;

    // Если прокручена половина окна.
    if (window.scrollY > (bodyHeight / 2)) {
        // console.log('Половина окна прокручена');
        arrowToTop.classList.add('arrow-top_show')
    } 
    else {
        arrowToTop.classList.remove('arrow-top_show');
    }
}

// Window.scrollTo()
// Прокрутка документа до указанных координат.
// Синтакс
// window.scrollTo(x-coord, y-coord)
// window.scrollTo(options)
// Параметры
// x-coord пиксель по горизонтальной оси документа, будет отображён вверху слева.
// y-coord пиксель по вертикальной оси документа, будет отображён вверху слева.
// options объект с тремя возможными параметрами:
// top, то же, что и y-coord
// left, то же, что и x-coord
// behavior, строка, содержащая либо smooth, instant, либо auto; по умолчанию auto
// Эта функция выполняет то же, что и window.scroll.
// https://developer.mozilla.org/ru/docs/Web/API/Window/scrollTo

// Window.scrollBy()
// Прокручивает документ на указанные величины.
// Синтаксис
// window.scrollBy(X, Y);
// Параметры
// X - смещение в пикселях по горизонтали.
// Y - смещение в пикселях по вертикали.
// Положительные значения приведут к прокрутке страницы вправо и вниз. Отрицательные координаты прокрутят страницу влево и вверх.
// Пример
// // Прокрутка на один экран вертикально вниз. 
// window.scrollBy(0, window.innerHeight);
// https://developer.mozilla.org/ru/docs/Web/API/Window/scrollBy

// Метод Element.scrollIntoView() интерфейса Element прокручивает текущий контейнер родителя элемента, так, чтобы этот элемент, на котором был вызван scrollIntoView() был видим пользователю.
// Синтаксис
// element.scrollIntoView(); // эквивалентно element.scrollIntoView(true)
// element.scrollIntoView(alignToTop); // аргумент типа Boolean 
// element.scrollIntoView(scrollIntoViewOptions); // аргумент типа Object
// Параметры
// alignToTop Необязательный
// Параметр типа Boolean, возможные значения:
//  true,  верхняя граница элемента будет выровнена вверху видимой части окна прокручиваемой области. Соответствует scrollIntoViewOptions: {block: "start", inline: "nearest"}. Значение по умолчанию.
// false, нижняя граница элемента будет выровнена внизу видимой части окна прокручиваемой области. Соответствует конфигурации scrollIntoViewOptions: {block: "end", inline: "nearest"}
// scrollIntoViewOptions Необязательный 
// Aргумент типа boolean или типа object со следующим набором опций:
// behavior Необязательный
// Определяет анимацию скролла. Принимает значение "auto" или "smooth". По умолчанию "auto".
// block Необязательный
// Вертикальное выравнивание.
// Одно из значений: "start", "center", "end" или "nearest". По умолчанию "center".
// inline Необязательный
// Горизонтальное выравнивание.
// Одно из значений: "start", "center", "end" или "nearest". По умолчанию "nearest".
// https://developer.mozilla.org/ru/docs/Web/API/Element/scrollIntoView






function removeClass(itemsArray, contentSelector, className) {
    for (let i = 0; i < itemsArray.length; i++) {
        const content = itemsArray[i].querySelector(contentSelector);
        content.classList.remove(className);
    }
}

function removeCheckboxChecked(Checkboxes) {
    for (let i = 0; i < Checkboxes.length; i++) {
        if (Checkboxes[i].checked == true) {
            Checkboxes[i].checked = false;
        }
    }
}

function addCheckboxChecked(Checkboxes) {
    for (let i = 0; i <Checkboxes.length; i++) {
        if (Checkboxes[i].checked == false) {
            Checkboxes[i].checked = true;
        }
    }
}

function allCheckboxChecking(Checkboxes) {
    let checked = true;
    let checkboxAll;
    for (let i = 0; i < Checkboxes.length; i++) {
        if (Checkboxes[i].id != 'all-checkbox') {
            if (Checkboxes[i].checked == false) {
                checked = false;
            }
        }
        else {
            checkboxAll = Checkboxes[i];
        }
    } 
    if (checked == true) {
        checkboxAll.checked = true;
    }
    else {
        checkboxAll.checked = false;
    }
}

function showPortfolioCards(checkboxes, portfolioCards) {
    // Скрытие всех portfolioCards.
    for (let i = 0; i < portfolioCards.length; i++) {
        portfolioCards[i].classList.remove('portfolio-card_show');
    }
    // Показ выбранных portfolioCards.
    for (let i = 0; i < checkboxes.length; i++) {
        let checkboxId = checkboxes[i].id;
        switch (checkboxId) {
            case 'personal-checkbox':
                if (checkboxes[i].checked == true) {
                    for (let j = 0; j < portfolioCards.length; j++) {
                        // Использование data-* атрибутов
                        // Синтаксис HTML
                        // <article
                        // id="electriccars"
                        // data-columns="3"
                        // data-index-number="12314"
                        // data-parent="cars">
                        // ...
                        // </article>

                        // Доступ в JavaScript
                        // var article = document.getElementById('electriccars');
                        // article.dataset.columns // "3"
                        // article.dataset.indexNumber // "12314"
                        // article.dataset.parent // "cars"
                        // https://developer.mozilla.org/ru/docs/Web/Guide/HTML/Using_data_attributes
                        // HTMLElement.dataset
                        // https://developer.mozilla.org/ru/docs/Web/API/HTMLElement/dataset
                        if (portfolioCards[j].dataset.websiteType == 'personal') {
                            portfolioCards[j].classList.add('portfolio-card_show');
                        }
                    }
                }
                break;
            case 'corporation-checkbox':
                if (checkboxes[i].checked == true) {
                    for (let j = 0; j < portfolioCards.length; j++) {
                        if (portfolioCards[j].dataset.websiteType == 'corporation') {
                            portfolioCards[j].classList.add('portfolio-card_show');
                        }
                    }
                }
                break;
            case 'association-checkbox':
                if (checkboxes[i].checked == true) {
                    for (let j = 0; j < portfolioCards.length; j++) {
                        if (portfolioCards[j].dataset.websiteType == 'association') {
                            portfolioCards[j].classList.add('portfolio-card_show');
                        }
                    }
                }
                break;
            case 'shop-checkbox':
                // console.log(checkboxes[i].id);
                if (checkboxes[i].checked == true) {
                    for (let j = 0; j < portfolioCards.length; j++) {
                        if (portfolioCards[j].dataset.websiteType == 'shop') {
                            portfolioCards[j].classList.add('portfolio-card_show');
                        }
                    }
                }
                break;
            default:
                break;
        }
    }
}

// Функция назначяет выбранный option. 
function setSelectedOption(options, personalisedSelectOption) {
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == personalisedSelectOption.dataset.value) {
            // Назначение данного options[i] выбранным.
            options[i].selected = true;
        }
    }
}

// Функция создаёт аналог select. 
function createPersonalisedSelect(options, parent) {
    const personalisedSelectDiv = document.createElement('div');
    personalisedSelectDiv.classList.add('personalised-select');
    const value = document.createElement('div');
    value.classList.add('personalised-select__value');
    personalisedSelectDiv.append(value);
    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('personalised-select__options');
    personalisedSelectDiv.append(optionsDiv);
    // Заполнение options. 
    for (let i = 0; i < options.length; i++) {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('personalised-select__option');
        optionDiv.dataset.value = options[i].value;
        optionDiv.innerText = options[i].innerText;
        optionsDiv.append(optionDiv);
        // Заполнение personalised-select__value значением первого элемента option.
        if (i == 0) {
            value.innerText = optionDiv.innerText;
            const dropDown = document.createElement('img');
            dropDown.src = 'img/arrow_drop_down.png';
            dropDown.alt = 'drop down';
            value.append(dropDown);
        }
        optionDiv.onclick = function() {
            const dropDown = document.createElement('img');
            dropDown.src = 'img/arrow_drop_down.png';
            dropDown.alt = 'drop down';
            value.innerText = this.innerText;
            value.append(dropDown);
            setSelectedOption(options, this);
            optionsDiv.classList.remove('personalised-select__options_show');
            showSortedPortfolioCards(this.dataset.value, portfoliosDiv);
        }
    }
    value.onclick = function() {
        optionsDiv.classList.toggle('personalised-select__options_show');
    }
    // Добавление personalisedSelect в элемент parent.
    parent.append(personalisedSelectDiv);
}

// Без этой функции можно обойтись.
// function selectedOptionValue(options) {
//     let value;
//     for (let i = 0; i < options.length; i++) {
//         if (options[i].selected == true) {
//             value = options[i].value;
//         }
//     }
//     return value;
// }

// function compareByType(a, b) {
//     console.log(a, b);
//     const websiteTypeA = a.dataset.websiteType, 
//     websiteTypeB = b.dataset.websiteType;
//     if (websiteTypeA < websiteTypeB) {
//         return -1;
//     }
//     if (websiteTypeA > websiteTypeB) {
//         return 1;
//     }
//     if (websiteTypeA == websiteTypeB) {
//         return 0;
//     }
// }

function showSortedPortfolioCards(sortParameter, parent) {
    const portfolioCards = parent.children;
    // Массив из псевдомассива. 
    const portfolioCardsArray = [];
    for (let i = 0; i < portfolioCards.length; i++) {
        portfolioCardsArray.push(portfolioCards[i]);
    }
    // console.log(portfolioCardsArray);
    // Копия массива.
    const portfolioCardsArrayCopy = portfolioCardsArray.slice();
    // console.log('Копия массива');
    // console.log(portfolioCardsArrayCopy);
    // Сортирование.
    // https://developer.cdn.mozilla.net/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    switch (sortParameter) {
        case 'websiteType':
            portfolioCardsArrayCopy.sort(function(a, b) {
                // console.log(a, b);
                const websiteTypeA = a.dataset.websiteType, 
                    websiteTypeB = b.dataset.websiteType;
                if (websiteTypeA < websiteTypeB) {
                    return -1;
                }
                if (websiteTypeA > websiteTypeB) {
                    return 1;
                }
                if (websiteTypeA == websiteTypeB) {
                    return 0;
                }
            });
            break;
        case 'websiteName':
            portfolioCardsArrayCopy.sort(function(a, b) {
                // console.log(a, b);
                const titleA = a.querySelector('.portfolio-card__title');
                const titleB = b.querySelector('.portfolio-card__title');
                if (titleA.innerText < titleB.innerText) {
                    return -1;
                }
                if (titleA.innerText > titleB.innerText) {
                    return 1;
                }
                if (titleA.innerText == titleB.innerText) {
                    return 0;
                }
            });
            break;
        case 'date':
            // https://metanit.com/web/javascript/5.1.php
            // https://www.w3schools.com/jsref/jsref_obj_date.asp
            // https://www.w3schools.com/js/js_dates.asp
            // Date.parse()
            // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
            portfolioCardsArrayCopy.sort(function(a, b) {
                // console.log(a, b);
                const dateA = a.querySelector('.portfolio-card__date');
                const parsedDateA = Date.parse(dateA.innerText);
                const dateB = b.querySelector('.portfolio-card__date');
                const parsedDateB = Date.parse(dateB.innerText);
                if (parsedDateA < parsedDateB) {
                    return -1;
                }
                if (parsedDateA > parsedDateB) {
                    return 1;
                }
                if (parsedDateA == parsedDateB) {
                    return 0;
                }
            });
            break;
        default:
            break;
    }
    // Очистка содержимого parent.
    parent.innerText = '';
    // Вставка в parent отсортинованных portfolioCards.
    for (let i = 0; i < portfolioCardsArrayCopy.length; i++) {
        parent.append(portfolioCardsArrayCopy[i]);
    }
}
