export function get() {
    return fetch('https://wedev-api.sky.pro/api/v1/:alina-povalchuk/comments',
        {
            method: 'GET',
        })
        .then((response) => {
            return response.json();
        })
}



export function post({}) {
    return fetch(urlApi,
        {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                text: text,
                date: formatDateTime(new Date),
                isLiked: false,
                likes: 0,
            })
        })
}