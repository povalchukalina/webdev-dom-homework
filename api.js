const apiUrl = 'https://wedev-api.sky.pro/api/v1/alina-povalchuk/comments';

export function getComments() {
    return  fetch(apiUrl, {
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
    })
}



export function postComment({nameInputElement, commentInputElement}) {
    return fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value,
            text: commentInputElement.value,
        }),
    })
}