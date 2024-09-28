const e=new Date;function t(e){fetch("https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=CgkxxT7s9PckcmY15CVedbNMJIe0zAP1").then(e=>e.json()).then(e=>{(function(e){let t=document.getElementById("most-recent-article");t.innerHTML="";let n=document.createElement("div");n.className="article";let a=e.multimedia&&e.multimedia.length>2?e.multimedia[2].url:"placeholder-image.jpg",l=e.url||"#";n.innerHTML=`
        <img src="${a}" alt="${e.title}">
        <h2>${e.title}</h2>
        <p>${e.abstract}</p>
        <a href="${l}" target="_blank">Read more</a>
    `,t.appendChild(n)})(e.results[0]),function(e){let t=document.getElementById("other-articles"),n=document.getElementById("more-articles");t.innerHTML="",n.innerHTML="",e.slice(1,6).forEach(e=>{(function(e,t){let n=document.createElement("div");n.className="article";let a=e.multimedia&&e.multimedia[2]?e.multimedia[2].url:"placeholder-image.jpg",l=e.url||"#";n.innerHTML=`
        <img src="${a}" alt="${e.title}">
        <div>
        <h2>${e.title}</h2>
        <p>${e.abstract}</p>
        <a href="${l}" target="_blank">Read more</a>
        </div>
    `,t.appendChild(n)})(e,t)}),e.slice(6).forEach(e=>{let t=document.createElement("a");t.href=e.url,t.textContent=e.title,t.target="_blank",n.appendChild(t)})}(e.results)})}document.getElementById("current-date").textContent=e.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),document.getElementById("current-day").textContent=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e.getDay()],document.querySelectorAll("nav a").forEach(e=>{e.addEventListener("click",function(e){e.preventDefault(),t(this.getAttribute("data-category"))})}),t("all");
//# sourceMappingURL=index.3d1bb358.js.map
