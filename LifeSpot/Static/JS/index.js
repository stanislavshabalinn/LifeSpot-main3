//let session = {
//    'startDate': new Date().toLocaleString(),
//    'userAgent': window.navigator.userAgent,
//    'userAge': prompt("Пожалуйста, введите ваш возраст")
//}

function handleSession(logger, checker) {
    if (window.sessionStorage.getItem("startDate") == null) {
        window.sessionStorage.setItem("startDate", new Date().toLocaleString())
    }
    if (window.sessionStorage.getItem("userAgent") == null) {
        window.sessionStorage.setItem("userAgent", window.navigator.userAgent)
    }
    if (window.sessionStorage.getItem("userAge") == null) {
        let input = prompt("Пожалуйста, введите ваш возраст");
        window.sessionStorage.setItem("userAge", input)
        checker(true)
    } else {
        checker(false)
    }
    logger()
}

let checker = function (newVisit) {
    if (window.sessionStorage.getItem("userAge") >= 18) {
        if (newVisit) {
            alert("Приветствуем на LifeSpot! " + "Текущее время: " + new Date().toLocaleString());
        }
    }
    else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com"
    }
}

//function checkAge() {
//    if (session.userAge >= 18) {
//        alert("Приветствуем на LifeSpot! " + "Текущее время: " + new Date().toLocaleString());
//    }
//    else {
//        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
//        window.location.href = "http://www.google.com"
//    }
//}

let logger = function () {
    console.log('Начало сесии: ' + window.sessionStorage.getItem("startDate"))
    console.log('Данные клиента: ' + window.sessionStorage.getItem("userAgent"))
    console.log('Возраст пользователя: ' + window.sessionStorage.getItem("userAge"))
}

function filterContent(userInput) {
    let elements = document.getElementsByClassName('video-container');

    for (let i = 0; i <= elements.length; i++) {
        //let videoText = elements[i].querySelector('.video-title').innerText; // вот это вот не работает ни с одинарными, ни с двойными кавычками
        let videoText = elements[i].getElementsByTagName('h3')[0].innerText; // а вот это работает
        if (!videoText.toLowerCase().includes(inputParseFunction().toLowerCase())) /* зачем данные о вводе пользователя опять переводить в LowerCase? для подстраховки? */ {
            elements[i].style.display = 'none';
        }
        else {
            elements[i].style.display = 'inline-block';
        }
    }
}