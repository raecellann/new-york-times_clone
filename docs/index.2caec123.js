$(document).ready(function(){function t(t){let e=`https://api.nytimes.com/svc/news/v3/content/nyt/${t}.json?api-key=CgkxxT7s9PckcmY15CVedbNMJIe0zAP1`;$.getJSON(e,function(t){(function(t){let e=$("#most-recent-article");e.empty();let i=$('<div class="article main-article"></div>'),a=t.multimedia&&t.multimedia.length>2?t.multimedia[2].url:"placeholder-image.jpg",n=t.url||"#",l=t.byline||"Unknown Author",c=t.section||"General";i.html(`<p class="category">${c}</p>
             <div class="main-article-title">
                <h2>${t.title}</h2>
             </div>
             <p><strong>Author:</strong> ${l}</p>
             <img src="${a}" alt="${t.title}">
             <p>${t.abstract}</p>
             <a href="${n}" target="_blank">Read more</a>`),e.append(i)})(t.results[0]),function(t){let e=$("#other-articles"),i=$("#more-articles");e.empty(),i.empty(),t.slice(1,4).forEach(t=>{(function(t,e){let i=$('<div class="article"></div>'),a=t.multimedia&&t.multimedia.length>2?t.multimedia[2].url:"placeholder-image.jpg",n=t.url||"#",l=t.byline||"Unknown Author";i.html(`
            <a href="${n}" target="_blank" style="text-decoration: none; color: inherit;">
                <div class="article-content">
                    <div class="image-container">
                        <img src="${a}" alt="${t.title}">
                        <h2>${t.title}</h2>
                    </div>
                    <div class="author-abstract">
                        <p>Written By: ${l}</p>
                        <p class="abstract">${t.abstract}</p> 
                    </div>
                </div>
            </a>
        `),e.append(i)})(t,e)}),t.slice(5,20).forEach(t=>{let e=$("<a></a>").attr("href",t.url).text(t.title).attr("target","_blank");i.append(e)})}(t.results)})}$("nav a").on("click",function(e){e.preventDefault(),t($(this).data("category"))}),$("#search-bar").on("input",function(){let t=$(this).val().toLowerCase();t.length>0?$.getJSON("https://api.nytimes.com/svc/news/v3/content/nyt/all.json?api-key=CgkxxT7s9PckcmY15CVedbNMJIe0zAP1",function(e){(function(t){let e=$("#suggestions");e.empty(),t.forEach(t=>{let i=$('<div class="suggestion-item"></div>').text(t.title);i.on("click",function(){window.open(t.url,"_blank")}),e.append(i)})})(e.results.filter(e=>e.title.toLowerCase().includes(t)))}):$("#suggestions").empty()}),t("all")});
//# sourceMappingURL=index.2caec123.js.map
