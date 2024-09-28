$(document).ready(function() {
    $("nav a").on("click", function(e) {
        e.preventDefault();
        loadArticles($(this).data("category"));
    });
    $("#search-bar").on("input", function() {
        const searchValue = $(this).val().toLowerCase();
        if (searchValue.length > 0) searchArticles(searchValue);
        else clearSuggestions();
    });
    function searchArticles(query) {
        const url = "https://api.nytimes.com/svc/news/v3/content/nyt/all.json?api-key=CgkxxT7s9PckcmY15CVedbNMJIe0zAP1";
        $.getJSON(url, function(data) {
            const filteredArticles = data.results.filter((article)=>article.title.toLowerCase().includes(query));
            displaySuggestions(filteredArticles);
        });
    }
    function displaySuggestions(articles) {
        const suggestionsContainer = $("#suggestions");
        suggestionsContainer.empty();
        articles.forEach((article)=>{
            const suggestion = $('<div class="suggestion-item"></div>').text(article.title);
            suggestion.on("click", function() {
                window.open(article.url, "_blank");
            });
            suggestionsContainer.append(suggestion);
        });
    }
    function clearSuggestions() {
        $("#suggestions").empty();
    }
    function loadArticles(category) {
        const url = `https://api.nytimes.com/svc/news/v3/content/nyt/${category}.json?api-key=CgkxxT7s9PckcmY15CVedbNMJIe0zAP1`;
        $.getJSON(url, function(data) {
            const mostRecentArticle = data.results[0];
            displayMostRecentArticle(mostRecentArticle);
            displayArticles(data.results);
        });
    }
    function displayMostRecentArticle(article) {
        const mostRecentDiv = $("#most-recent-article");
        mostRecentDiv.empty();
        const articleDiv = $('<div class="article main-article"></div>');
        const imgSrc = article.multimedia && article.multimedia.length > 2 ? article.multimedia[2].url : "placeholder-image.jpg";
        const articleUrl = article.url || "#";
        const author = article.byline || "Unknown Author";
        const category = article.section || "General";
        articleDiv.html(`<p class="category">${category}</p>
             <div class="main-article-title">
                <h2>${article.title}</h2>
             </div>
             <p><strong>Author:</strong> ${author}</p>
             <img src="${imgSrc}" alt="${article.title}">
             <p>${article.abstract}</p>
             <a href="${articleUrl}" target="_blank">Read more</a>`);
        mostRecentDiv.append(articleDiv);
    }
    function displayArticles(articles) {
        const otherArticles = $("#other-articles");
        const moreArticles = $("#more-articles");
        otherArticles.empty();
        moreArticles.empty();
        articles.slice(1, 4).forEach((article)=>{
            addArticle(article, otherArticles);
        });
        articles.slice(5, 20).forEach((article)=>{
            const link = $("<a></a>").attr("href", article.url).text(article.title).attr("target", "_blank");
            moreArticles.append(link);
        });
    }
    function addArticle(article, container) {
        const articleDiv = $('<div class="article"></div>');
        const imgSrc = article.multimedia && article.multimedia.length > 2 ? article.multimedia[2].url : "placeholder-image.jpg";
        const articleUrl = article.url || "#";
        const author = article.byline || "Unknown Author";
        articleDiv.html(`
            <a href="${articleUrl}" target="_blank" style="text-decoration: none; color: inherit;">
                <div class="article-content">
                    <div class="image-container">
                        <img src="${imgSrc}" alt="${article.title}">
                        <h2>${article.title}</h2>
                    </div>
                    <div class="author-abstract">
                        <p>Written By: ${author}</p>
                        <p class="abstract">${article.abstract}</p> 
                    </div>
                </div>
            </a>
        `);
        container.append(articleDiv);
    }
    loadArticles("all");
});

//# sourceMappingURL=index.44983732.js.map
