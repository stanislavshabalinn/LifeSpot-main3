function Comment() {
    this.author = prompt("Как Вас зовут?")
    if (this.author == null) {
        this.empty = true
        return
    }

    this.text = prompt("Оставьте отзыв")
    if (this.text == null) {
        this.empty = true
        return
    }

    this.date = new Date().toLocaleString()
}

function addComment() {
    let comment = new Comment()
    if (comment.empty) {
        return;
    }

    let enableLikes = confirm('Разрешить пользователям оценивать Ваш отзыв?')

    if (enableLikes) {
        let review = Object.create(comment)
        review.rate = 0;
        writeReview(review)
    } else {
        writeReview(comment)
    }
}

const writeReview = review => {
    let likeCounter = '';
    if (review.hasOwnProperty('rate')) {
        let commentId = Math.random();
        likeCounter += '<button id="' + commentId + '" style="border: none" onclick="addLike(this.id)">' + `❤️ ${review.rate}</button>`
    }

    document.getElementsByClassName('reviews')[0].innerHTML += '<div class="review-text">\n' +
        `<p> <i> <b>${review['author']}</b>  ${review['date']}${likeCounter}</i></p>` +
        `<p>${review['text']}</p>` +
        '</div>';
}

function addLike(id) {
    let element = document.getElementById(id);
    let array = element.innerText.split(' ')
    let resultNum = parseInt(array[array.length - 1], 10);
    resultNum += 1
    array[array.length - 1] = `${resultNum}`
    element.innerText = array.join(' ')
}

window.onload = function () { // иначе ругается на то, что кнопки, слайдеры являются null, потому что DOM загружается после срабатывания скрипта
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.slider img');

    let currentIndex = 0;
    let isDragging = false;
    let stratPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPos = e.clientX;
        slider.classList.add('dragging');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.clientX;
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate + diff;
        slider.style.transform = `translateX(${currentTranslate}px)`;
    });

    slider.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        slider.classList.remove('dragging');

        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < slides.length - 1) {
            currentIndex++;
        } else if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }

        updateSlider();
    });

    slider.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            updateSlider();
        }
    });

    function updateSlider() {
        prevTranslate = -currentIndex * slider.offsetWidth;
        slider.style.transform = `translateX(${prevTranslate}px)`;
        currentTranslate = prevTranslate;
    }
}