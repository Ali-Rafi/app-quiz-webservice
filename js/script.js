const baseUrl = "https://gnews.io/api/v4/";
// apiKey ke-1 = 9dacbf672c1993ff9b25365540b4e39b; apiKey ke-2 = 893542d4e9e2f1b03fc8316df3009c81
// Tiap apiKey dibatasi akses sebanyak 100x. Direset Ulang dalam 1x24 jam
const apiKey = "893542d4e9e2f1b03fc8316df3009c81";
const viewNews = `${baseUrl}search?token=${apiKey}&q=none`;
const popularNews = `${baseUrl}top-headlines?token=${apiKey}`;

const contents = document.querySelector("#content");

// Parameter for All News Page
const fetchHeader = {
    Params : {
        'max'   : '100'
    }
}
// Parameter for Top Popular News Page
const fetchHeader2 = {
    Params : {
        'max'   : '25'
    }
}

// Fungsi Load Page
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.navbar-nav');
    // var instances = M.navbar.init(elems);

    document.querySelectorAll(".navbar-nav, .nav-item").forEach(elm => {
        elm.addEventListener("click", evt => {
            let navbar = document.querySelector(".nav-link");
            // M.navbar.getInstance(navbar).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "allNews";
    loadPage(page);
});


function loadPage(page) {
    switch (page) {
        case "allNews":
            allNews();
            break;
        case "topPopular":
            topPopular();
            break;
    }
}

function allNews() {
    fetch(viewNews, fetchHeader)
    .then(response => response.json())
    .then(resJson => {
        let data = "";
        data += `
            <div class="container">
                <div class="p-4 p-md-5 mb-1 text-white rounded bg-dark">
                    <div class="col-md-6 px-0">
                        <h1 class="display-6 fst-italic fw-bold">Regular Popular News Update by GNews</h1>
                        <p class="lead my-1">Multiple lines of text that form the lede, informing new readers quickly and efficiently
                        about what’s most interesting in this post’s contents.</p>
                        <p class="lead mb-0"><a href="#" class="text-white fw-bold">Continue reading...</a></p>
                    </div>
                </div>
            </div>

            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
    
        `;
        resJson.articles.forEach(da => {
            data += `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="${da.image}" class="bd-placeholder-img card-img-top" width="48px" height="142px">
                        <div class="card-body">
                            <h5 class="card-title">` + da.title.substring(0, 100) + `</h5>
                            <p class="card-text">` + da.description.substring(0, 100) + `</p>
                            <small class="link-primary" href="${da.url}">${da.url}</small>
                        </div>
                    </div>
                </div>
            `;
        });
        data += `</div></div></div>;`
        contents.innerHTML = data ;
    }).catch(err => {
        console.error(err);
    })
}

function topPopular() {
    fetch(popularNews, fetchHeader2)
    .then(response => response.json())
    .then(resJson => {
        let data = "";
        data += `
            <div class="container">
                <div class="p-4 p-md-5 mb-1 text-white rounded bg-dark">
                    <div class="col-md-6 px-0">
                        <h1 class="display-6 fst-italic fw-bold">Regular Popular News Update by GNews</h1>
                        <p class="lead my-1">Multiple lines of text that form the lede, informing new readers quickly and efficiently
                        about what’s most interesting in this post’s contents.</p>
                        <p class="lead mb-0"><a href="#" class="text-white fw-bold">Continue reading...</a></p>
                    </div>
                </div>
            </div>

            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
    
        `;
        resJson.articles.forEach(da => {
            data += `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="${da.image}" class="bd-placeholder-img card-img-top" width="48px" height="142px">
                        <div class="card-body">
                            <h5 class="card-title">` + da.title.substring(0, 100) + `</h5>
                            <p class="card-text">` + da.description.substring(0, 100) + `</p>
                            <small class="link-primary" href="${da.url}">${da.url}</small>
                        </div>
                    </div>
                </div>
            `;
        });
        data += `</div></div></div>;`
        contents.innerHTML = data ;
    }).catch(err => {
        console.error(err);
    })
}