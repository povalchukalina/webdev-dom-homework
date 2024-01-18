import { getComments, postComment } from "./api.js";
import {renderComments} from "./renderComments.js";


const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
const loader = document.getElementById('loader');
const loaderForm = document.getElementById('loader_form');
const addForm = document.getElementById('add-form');
loaderForm.style.display = "none";

//const commentElements=document.getElementById('');

buttonElement.disabled = true;
buttonElement.textContent = 'Элемент добавляется...';

// Запрос в API
/*const fetchAndRenderTasks = ()=>{
getTodos.then.((responseData)=>{
  tasks=responseData.todos;
  renderTasks();
})
}*/



const fetchPromise = () =>
    getComments().then((responseData) => {
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



export let comments = [];
export const setComments = (newComments) => {
    comments = newComments

};


renderComments();

const likeElements = document.querySelectorAll(".likes");



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

    postComment({nameInputElement, commentInputElement}).then(() => {
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