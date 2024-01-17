const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
const newDate = new Date();
const answerElement = document.getElementById('');
const loader = document.getElementById('loader');
const loaderForm = document.getElementById('loader_form');
const addForm = document.getElementById('add-form');
loaderForm.style.display = "none";

//const commentElements=document.getElementById('');

buttonElement.disabled = true;
buttonElement.textContent = 'Элемент добавляется...';

// Запрос в API
const fetchPromise = () =>
    fetch('https://wedev-api.sky.pro/api/v1/:alina-povalchuk/comments', {
        method: "GET",
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Неверный запрос')
        }
        if (response.status === 500) {
            throw new Error('Ошибка сервера')
        }
        if (response.status === 200) {
            return response.json();
        }
    }).then((responseData) => {
        console.log(responseData);
        const appComments = responseData.comments.map((comment) => {
            let timestamp = new Date(comment.date);
            let period = `${timestamp.toLocaleDateString()} ${timestamp
                .toLocaleTimeString()
                .slice(0, -3)}`;
            return {
                id: comment.author.id,
                name: comment.author.name
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;"),
                date: period,
                comment: comment.text
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;"),
                like: comment.likes,
                isLike: comment.isLike,
            };
        });
        comments = appComments;
        return renderComments();
    }).then(() => {
        loader.style.display = "none";
        addForm.style.display = "flex";
        loaderForm.style.display = "none";
    }).catch((error) => {
        console.warn(error);
        if (error.message === "Неверный запрос") {
            alert('Короткое имя или текст комментария, минимум 3 символа')
        }
        if (error.message === "Ошибка сервера") {
            alert('Сломался сервер , попробуйте позже')
            postComment()
        }
        if (window.navigator.onLine === false) {
            alert('Проблемы с интернетом, проверьте подключение')
        }
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
    });

buttonElement.disabled = false;
buttonElement.textContent = 'Написать';



let comments = [
    /* {
       name: 'Глеб Фокин',
       date: '12.02.22 22:18',
       comment: 'Это будет первый комментарий на этой странице',
       like: 3,
       isLiked: false,
     },
     {
       name: 'Варвара Н.',
       date: '13.02.22 19:22',
       comment: 'Мне нравится как оформлена эта страница!',
       like: 75,
       isLiked: true,
     },
     */
];

const initEventListeners = () => {
    const likeButtonElements = document.querySelectorAll(".like-button");

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener("click", (e) => {
            e.stopPropagation();
            //index - номер объекта в массиве, полуаем из дата-атрибута кнопки на которую мы нажимаем
            const index = likeButtonElement.dataset.index;
            //в условии обращаемся к свойсву isLiked объекта, который мы получили из массива Comments по индексу
            if (comments[index].isLiked) {
                comments[index].isLiked = false;
                comments[index].like--;
            } else {
                comments[index].isLiked = true;
                comments[index].like++;
            }
            renderComments();
        });
    }
};
const initAnswerListeners = () => {
    const answerElements = document.querySelectorAll(".comment");

    for (const answerElement of answerElements) {
        answerElement.addEventListener("click", () => {
            const comment = comments[answerElement.dataset.index];

            commentInputElement.value = '>' + `${comment.name}:\n ${comment.comment}`;

        })
    }
};

const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div> ${comment.name} </div>
            <div> ${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text" data-text="${comment.comment}">
              ${comment.comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.like}</span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`


    }).join("");

    listElement.innerHTML = commentsHtml;

    initEventListeners();
    initAnswerListeners();
};
renderComments();

const likeElements = document.querySelectorAll(".likes");

initEventListeners();


/*const answerElements = () => {
    const commentTextElement = document.querySelectorAll('.comment-text');
    const commentNameElement = document.querySelectorAll('.comment-name');
    for (const answerElement of answerElements) {
      answerElement.addEventListener("click", () => {
        const index = answerElement.dataset.index;
 
        commentInputElement.value = 
        `>${commentTextElement[index].innerHTML} ${commentNameElement[index].innerHTML}`;
      })
    } 
};
*/






buttonElement.addEventListener("click", () => {

    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");

    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    }
    if (commentInputElement.value === "") {
        commentInputElement.classList.add("error");
        return;
    }
    addForm.style.display = "none";
    loaderForm.style.display = "flex";

    fetch("https://wedev-api.sky.pro/api/v1/alina-povalchuk/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value,
            text: commentInputElement.value,
        }),
    }).then(() => {
        fetchPromise();
    });

    /*comments.push({
      name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: newDate,
      comment: commentInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      like: 0,
      isLiked: false
    });
    renderComments();*/

    document.getElementById('name-input').value = '';
    document.getElementById('comment-input').value = '';
});



// Код писать здесь
console.log("It works!");
fetchPromise();