let posts = [], partners = [];

let feed = document.getElementById("feed");
let innerfeed = document.getElementById("innerfeed");
let discover = document.getElementById("discover");
let clearance = document.getElementById("clearance");
let tabfeed = document.getElementById("tabfeed");
let tabdiscover = document.getElementById("tabdiscover");
let tabclearance = document.getElementById("tabclearance");
let tab = 1;

async function getPosts() {
    try {
        const response = await fetch('http://localhost:8000/posts', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const data = await response.json();
            posts = data;
            updateFeed();
        } else {
            console.log("Error", response.status);
        }
    } catch (error) {
        console.log("Error", error);
    }
}

async function getPartners() {
    try {
        const response = await fetch('http://localhost:8000/partners', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const data = await response.json();
            partners = data;
        } else {
            console.log("Error", response.status);
        }
    } catch (error) {
        console.log("Error", error);
    }
}

function updateFeed() {
    innerfeed.innerHTML = "";
    if (tab === 1) {
        posts.forEach(post => {
            let div = document.createElement("div");
            let postTitle = document.createElement("div");
            let postImage = document.createElement("img");
            let postDesc = document.createElement("div");
            div.classList.add("flex", "flex-col", "gap-y-1", "border", "bg-gray-100", "rounded", "p-2", "min-w-full", "max-w-full", "h-fit", "shadow");
            postImage.src = post?.image;
            postImage.classList.add("h-56", "w-full", "rounded");
            postTitle.innerText = post?.title;
            postTitle.classList.add("text-xl", "leading-none", "font-semibold", "tracking-wide", "mt-1");
            postDesc.innerText = post?.description;
            div.appendChild(postImage);
            div.appendChild(postTitle);
            div.appendChild(postDesc);
            innerfeed.appendChild(div);
        });
        feed.style.display = "flex";
        discover.style.display = "none";
        clearance.style.display = "none";
    } else if (tab == 2) {
        feed.style.display = "none";
        discover.style.display = "flex";
        clearance.style.display = "none";
    } else if (tab == 3) {
        feed.style.display = "none";
        discover.style.display = "none";
        clearance.style.display = "flex";
    }
}

window.addEventListener('load', () => {

    if (tab == 1) {
        tabfeed.style.backgroundColor = "#123456";
        tabdiscover.style.backgroundColor = "transparent";
        tabclearance.style.backgroundColor = "transparent";
        tabfeed.style.color = "white";
        tabdiscover.style.color = "#1f2937";
        tabclearance.style.color = "#1f2937";
    }
    if (tab == 2) {
        tabdiscover.style.backgroundColor = "#123456";
        tabfeed.style.backgroundColor = "transparent";
        tabclearance.style.backgroundColor = "transparent";
        tabdiscover.style.color = "white";
        tabfeed.style.color = "#1f2937";
        tabclearance.style.color = "#1f2937";
    }
    if (tab == 3) {
        tabclearance.style.backgroundColor = "#123456";
        tabdiscover.style.backgroundColor = "transparent";
        tabfeed.style.backgroundColor = "transparent";
        tabclearance.style.color = "white";
        tabdiscover.style.color = "#1f2937";
        tabfeed.style.color = "#1f2937";
    }

    tabfeed.addEventListener("click", () => {
        tab = 1;
        tabfeed.style.backgroundColor = "#123456";
        tabdiscover.style.backgroundColor = "transparent";
        tabclearance.style.backgroundColor = "transparent";
        tabfeed.style.color = "white";
        tabdiscover.style.color = "#1f2937";
        tabclearance.style.color = "#1f2937";
        updateFeed();
    });

    tabdiscover.addEventListener("click", () => {
        tab = 2;
        tabdiscover.style.backgroundColor = "#123456";
        tabfeed.style.backgroundColor = "transparent";
        tabclearance.style.backgroundColor = "transparent";
        tabdiscover.style.color = "white";
        tabfeed.style.color = "#1f2937";
        tabclearance.style.color = "#1f2937";
        updateFeed();
    });

    tabclearance.addEventListener("click", () => {
        tab = 3;
        tabclearance.style.backgroundColor = "#123456";
        tabdiscover.style.backgroundColor = "transparent";
        tabfeed.style.backgroundColor = "transparent";
        tabdiscover.style.color = "#1f2937";
        tabfeed.style.color = "#1f2937";
        tabclearance.style.color = "white";
        updateFeed();
    });

    getPosts();
    getPartners();
});