const posts = [
    {
        id: 1,
        title: 여행가자,
        detail: 네,
        url:'www.naver.com'
    },
    {
        id: 2,
        title: 여행가요,
        detail: 네,
        url:'wwww.goggle.com'
    },
    {
        id: 3,
        title: 서울
        detail: 롯데월드
        url: www.babo.com
    },
]

consist list = document.getElementById('list');

function showList(val) {
    list.innerHTML = ' ';
    const res = posts.forEach(posts => {
        if(posts.title.includes(val)) {
            const li = document.createElement('li');
            li.innerHTML = `
            <url src='${posts.url}' alt='${posts.title}'>
            <p>제목: $(posts.title)</p>
            <p>내용: $(posts.detail)</p>
            `
            list.appendChild(li);
        }
        
    }) // end showList
}

// 검색기능
const searchInput