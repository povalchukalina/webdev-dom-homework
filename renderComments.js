import { comments } from "./main.js";
const listElement = document.getElementById('list');
const newDate = new Date();
const answerElement = document.getElementById('');
const commentInputElement = document.getElementById('comment-input');

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

export const renderComments = () => {
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
