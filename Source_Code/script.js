const options = { year: 'numeric', month: 'long', day: 'numeric' };
const date = new Date();

document.getElementById('current-date').textContent = date.toLocaleDateString('en-US', options);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
document.getElementById('current-day').textContent = days[date.getDay()];

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        loadArticles(this.getAttribute('data-category'));
    });
});

function loadArticles(category) {
    let url = "https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=CgkxxT7s9PckcmY15CVedbNMJIe0zAP1"; // Change to your actual API key
    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayArticles(data.results);
    });
}

function displayArticles(articles) {
    const mainArticle = document.getElementById("main-article");
    const otherArticles = document.getElementById("other-articles");
    const moreArticles = document.getElementById("more-articles");

    mainArticle.innerHTML = ''; 
    otherArticles.innerHTML = ''; 
    moreArticles.innerHTML = ''; 

    if (articles.length > 0) {
        addArticle(articles[0], mainArticle);

       
        articles.slice(1, 5).forEach(article => {
            addArticle(article, otherArticles);
        });

        
        articles.slice(5).forEach(article => {
            const link = document.createElement("a");
            link.href = article.url;
            link.textContent = article.title;
            link.target = "_blank";
            moreArticles.appendChild(link);
        });
    }
}

function addArticle(article, container) {
    const articleDiv = document.createElement("div");
    articleDiv.className = 'article';
    const imgSrc = article.multimedia && article.multimedia[2] ? article.multimedia[2].url : 'placeholder-image.jpg';
    const articleUrl = article.url || '#';

    articleDiv.innerHTML = `
        <img src="${imgSrc}" alt="${article.title}">
        <h2>${article.title}</h2>
        <p>${article.abstract}</p>
        <a href="${articleUrl}" target="_blank">Read more</a>
    `;
    container.appendChild(articleDiv);
}




loadArticles('world');
