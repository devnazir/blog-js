const publish = document.querySelector(".publish");
const article = document.querySelector(".article");
const thumb = document.getElementById("thumb");

const title = document.getElementById("title");
const description = document.getElementById("description");
const content = document.getElementById("content");

const blogs = document.querySelector(".blogs");
const change = document.querySelector(".change");

let index = 0;
let check = false;
const images = [];

window.addEventListener("load", function () {
    const image = JSON.parse(localStorage.getItem("images"));
    const title = localStorage.getItem("title");
    const description = localStorage.getItem("description");

    const content = localStorage.getItem("content");
    blogs.innerHTML += `<p data-id="${index ? 0 : ""}">${content}</p>`;

    if (image) {
        image.forEach(img => {
            article.innerHTML += showArticle(title, description, img, index);
        });
    };
});

function setToLocal() {
    localStorage.setItem("title", title.value);
    localStorage.setItem("description", description.value);
    localStorage.setItem("content", content.value);
}

function setBlog(index) {
    const content = localStorage.getItem("content");
    blogs.innerHTML += `<p data-id="${index}">${content}</p>`;

    const linkBlog = document.querySelectorAll(".link-blog");
    linkBlog.forEach(link => {
        link.addEventListener("click", changeRow);
    });
}


function changeRow() {
    const linkId = this.dataset.id;
    const p = document.querySelectorAll(".blogs p");

    p.forEach(p => {
        if(p.dataset.id == linkId) {
            article.style.display = "none";
            change.innerHTML = p.innerHTML;
        }
    })
}

function getValueArticle() {

    checkValue(title, description, content);
    setToLocal();

    if (check) {
        check = false;
        return;
    };

    const reader = new FileReader();
    
    reader.onload = function (e) {
        images.push(e.target.result);
        localStorage.setItem("images", JSON.stringify(images));
        const image = JSON.parse(localStorage.getItem("images"));

        article.innerHTML += updateArticle(title.value, description.value, image, index);
        setBlog(index);
        
        resetValueArticle(title, description, content);
        index++;
    }

    if (thumb.files[0]) {
        reader.readAsDataURL(thumb.files[0]);
    } else {
        alert("Please insert your thumbnail");
    }

};

function checkValue(title, description, content) {
    if (title.value == "" || description.value == "" || content.value == "") {
        check = true;
        alert("Please insert title, description, and article");
    };
};

function resetValueArticle(title, description, content) {
    title.value = "";
    description.value = "";
    content.value = "";
};

function updateArticle(title, description, img, index) {
    return `<div class="col-md-4 col-sm-6 mt-3">
                <div class="card">
                    <img src="${img[index]}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title article-title">${title}</h5>
                        <p class="card-text article-description">${description}</p>
                        <a href="#" data-id="${index}" class="btn btn-primary link-blog">Reads More</a>
                    </div>
                </div>
            </div>`;
};

function showArticle(title, description, img, index) {
    return `<div class="col-md-4 col-sm-6 mt-3">
                <div class="card">
                    <img src="${img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title article-title">${title}</h5>
                        <p class="card-text article-description">${description}</p>
                        <a href="#" data-id="${index}" class="btn btn-primary link-blog">Reads More</a>
                    </div>
                </div>
            </div>`;
};

publish.addEventListener("click", getValueArticle);