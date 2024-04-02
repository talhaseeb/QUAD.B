let userId = localStorage.getItem("userId");
let isPartner = localStorage.getItem("isPartner");

if (!userId) window.location.href = "/client/pages/log-in.html"
else console.log(userId, isPartner);

let posts = [], partners = [];
let cartCount = 0;
let cartItems = [];

let feed = document.getElementById("feed");
let innerfeed = document.getElementById("innerfeed");
let discover = document.getElementById("discover");
let clearance = document.getElementById("clearance");
let tabfeed = document.getElementById("tabfeed");
let tabdiscover = document.getElementById("tabdiscover");
let tabclearance = document.getElementById("tabclearance");
let featuredrestaurants = document.getElementById("featuredrestaurants");
let partnerdonations = document.getElementById("partnerdonations");
let tab = 1;

const itemsList = document.getElementById('items-list');
const fetchItemsBtn = document.getElementById('fetch-items-btn');
const cartCountElement = document.getElementById('cart-count');
let ptype = document.getElementById("ptype");
let pid = document.getElementById("pid");

var pArr = [], selectedPid = pid.value;

const setOptValue = (optValue) => {
    if (optValue == "restaurant") {
        pid.innerHTML = "";
        pArr = partners?.filter(p => p?.partnerType == "restaurant");
    } else if (optValue == "store") {
        pid.innerHTML = "";
        pArr = partners?.filter(p => p?.partnerType == "store");
    } else if (optValue == "dcentre") {
        pid.innerHTML = "";
        pArr = partners?.filter(p => p?.partnerType == "donation center");
    }
    const optionElement = document.createElement("option");
    optionElement.value = null;
    optionElement.textContent = "Select";
    pid.appendChild(optionElement)
    pArr.forEach(item => {
        const optionElement = document.createElement("option");
        optionElement.value = item?._id;
        optionElement.textContent = item?.userId?.name;
        pid.appendChild(optionElement);
    });
    console.log(selectedPid);
    pid.onchange = (event) => {
        selectedPid = event.target.value;
        console.log(selectedPid);
        if (selectedPid != null && selectedPid != "") {
            onSelectPid();
        }
    }
}

let optVal = ptype.value;
ptype.onchange = (event) => {
    optVal = event.target.value;
    setOptValue(optVal);
}

const onSelectPid = async () => {
    try {
        const response = await fetch(`http://localhost:8000/items/partner/${selectedPid}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const data = await response.json();
            const pItems = data;
            if (pItems?.items?.length == 0) {
                itemsList.innerHTML = "";
                document.getElementById("noItems").innerText = "No items to display!"
            } else {
                document.getElementById("noItems").innerText = ""
                displayItems(pItems?.items);
            }
        } else {
            console.log("Error", response.status);
        }
    } catch (error) {
        console.log("Error", error);
    }
}

pid.classList.add("p-2", "cursor-pointer", "w-56");

// document.getElementById('uploadForm').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('image', document.getElementById('imageInput').files[0]);
//     let title = document.getElementById("postTitle").value;
//     let desc = document.getElementById("postDesc").value;
//     console.log(title, desc, formData)
//     try {
//         const response = await fetch('http://localhost:8000/posts/6605c78acda7c35228f4a003', {
//             method: 'POST',
//             body: JSON.stringify({
//                 title: title,
//                 description: desc,
//                 imageUrl: formData
//             })
//         });

//         if (response.ok) {
//             const imageData = await response.blob(); // Convert response to Blob
//             const imageUrl = URL.createObjectURL(imageData); // Create URL for Blob
//             document.getElementById('uploadedImage').src = imageUrl; // Set img src to display the uploaded image
//             alert('Post success!')
//         } else {
//             alert('Failed to post!');
//         }
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         alert('Failed to upload image');
//     }
// });

async function loadHTMLFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch HTML file');
        }
        const htmlContent = await response.text();
        clearance.innerHTML = htmlContent;

        // Find all script tags in the loaded HTML content
        const scriptTags = clearance.querySelectorAll('script');

        // Dynamically load and execute each script
        scriptTags.forEach(async script => {
            const src = script.getAttribute('src');
            if (src) {
                // Fetch and execute external JavaScript files
                const jsResponse = await fetch(src);
                if (!jsResponse.ok) {
                    throw new Error(`Failed to fetch JavaScript file: ${src}`);
                }
                const jsContent = await jsResponse.text();
                eval(jsContent); // Execute the JavaScript code
            } else {
                // Execute inline JavaScript
                eval(script.textContent);
            }
        });
    } catch (error) {
        console.error('Error loading HTML file:', error);
    }
}

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
            updateFeaturedRestaurants();
            let donationCentres = partners?.filter(p => p?.partnerType == "donation center");
            donatePartners(donationCentres);
            let stores = partners?.filter(p => p?.partnerType == "store");
            let restaurants = partners?.filter(p => p?.partnerType == "restaurant");
            populateDiscover(donationCentres, stores, restaurants);
            setOptValue(ptype.value)
        } else {
            console.log("Error", response.status);
        }
    } catch (error) {
        console.log("Error", error);
    }
}

const getItems = async () => {
    try {
        const itemsResponse = await fetch('http://localhost:8000/items', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const itemsData = await itemsResponse.json();

        if (itemsResponse.ok) {
            console.log(itemsData);
            if (itemsData?.items.length == 0) {
                document.getElementById("noItems").innerText = "No items to display!"
            } else {
                displayItems(itemsData?.items);
            }
        } else {
            console.error('Failed to fetch items:', itemsData.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

function donatePartners(dc) {
    partnerdonations.innerHTML = "";
    dc?.forEach(partner => {
        let div = document.createElement("div");
        let restName = document.createElement("div");
        let resImage = document.createElement("img");
        div.classList.add("flex", "flex-col", "gap-y-1", "border", "border-gray-300", "bg-white", "rounded-md", "min-w-full", "max-w-full", "h-fit", "shadow-sm");
        resImage.src = partner?.bannerImage;
        resImage.classList.add("h-32", "w-full", "rounded-md", "object-cover")
        restName.innerText = partner?.userId?.name;
        restName.classList.add("text-base", "py-1", "px-2", "leading-none", "font-semibold", "tracking-wide");
        div.appendChild(resImage);
        div.appendChild(restName);
        let donateBtn = document.createElement("button");
        donateBtn.innerText = "Donate";
        donateBtn.classList.add("py-1", "px-2", "mt-1", "m-2", "rounded", "bg-blue-500", "text-gray-100", "w-calc(100%-8px)");
        div.appendChild(donateBtn);
        partnerdonations.appendChild(div);
    })
}

function updateFeaturedRestaurants() {
    featuredrestaurants.innerHTML = "";
    partners.forEach(partner => {
        let div = document.createElement("div");
        let restName = document.createElement("div");
        let resImage = document.createElement("img");
        div.classList.add("flex", "flex-col", "gap-y-1", "border", "border-gray-300", "bg-white", "rounded-md", "min-w-full", "max-w-full", "h-fit", "shadow-sm");
        resImage.src = partner?.bannerImage;
        resImage.classList.add("h-32", "w-full", "rounded-md", "object-cover")
        restName.innerText = partner?.userId?.name;
        restName.classList.add("text-base", "leading-none", "pt-2", "pb-3", "px-2", "tracking-wide", "cursor-pointer", "font-semibold");
        restName.onclick = () => window.location.href = `../pages/partner_profile.html?id=${partner?._id}`
        div.appendChild(resImage);
        div.appendChild(restName);
        featuredrestaurants.appendChild(div);
    })
}

function updateFeed() {
    innerfeed.innerHTML = "";
    if (tab === 1) {
        posts.forEach(post => {
            let div = document.createElement("div");
            let postTitle = document.createElement("div");
            let postImage = document.createElement("img");
            let postDesc = document.createElement("div");
            div.classList.add("flex", "flex-col", "gap-y-1", "rounded-xl", "min-w-full", "max-w-full", "h-fit", "shadow", "bg-white", "cursor-pointer");
            postImage.src = post?.image;
            postImage.classList.add("h-56", "w-full", "rounded-xl", "border-none", "object-cover");
            postTitle.innerText = post?.title;
            postTitle.classList.add("text-xl", "leading-none", "font-semibold", "tracking-wide", "p-3");
            postDesc.innerText = post?.description;
            postDesc.classList.add("text-sm", "px-3", "pb-3");
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
        clearance.style.display = "block";
        // loadHTMLFile('../pages/clearance.html');
    }
}

function populateDiscover(donationCentres, stores, restaurants) {
    discover.innerHTML = "";
    let partnersArr = [restaurants, stores, donationCentres]
    partnersArr.forEach(p => {
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("flex", "flex-col", "gap-y-3", "px-3", "py-1", "rounded");
        let pTitle = document.createElement("div");
        pTitle.classList.add("text-xl", "leading-none", "font-semibold");
        if (partnersArr.indexOf(p) == 0)
            pTitle.innerText = "RESTAURANTS";
        if (partnersArr.indexOf(p) == 1)
            pTitle.innerText = "STORES";
        if (partnersArr.indexOf(p) == 2)
            pTitle.innerText = "DONATION CENTRES";
        mainDiv.appendChild(pTitle);
        let horizontalScrollable = document.createElement("div");
        horizontalScrollable.classList.add("w-full", "overflow-x-auto", "flex", "items-center", "gap-x-3");
        horizontalScrollable.style.scrollbarWidth = 'none';
        p?.forEach(idx => {
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("rounded-md", "flex", "flex-col", "gap-y-2", "bg-white", "border", "border-gray-300");
            let postImage = document.createElement("img");
            postImage.classList.add("h-40", "min-w-96", "max-w-96", "rounded-md", "object-cover");
            postImage.src = idx?.bannerImage;
            let postTitle = document.createElement("div");
            postTitle.innerText = idx?.userId?.name;
            postTitle.classList.add("text-xl", "leading-none", "font-semibold", "tracking-wide", "pt-1", "px-2.5", "cursor-pointer");
            let navigateUrl = "../pages/partner_profile.html?id=" + idx?._id;
            postTitle.onclick = () => window.location.href = navigateUrl;
            let address = document.createElement("p");
            address.innerText = idx?.userId?.address;
            address.classList.add("px-2.5", "text-blue-700", "pb-3", "text-sm", "tracking-wide");
            cardDiv.appendChild(postImage);
            cardDiv.appendChild(postTitle);
            cardDiv.appendChild(address);
            horizontalScrollable.appendChild(cardDiv);
        })
        mainDiv.appendChild(horizontalScrollable);
        discover.appendChild(mainDiv);
    })
}

function displayItems(itemsData) {
    itemsList.innerHTML = ''; // Clear previous items
    let lsPartnerId = localStorage.getItem("partnerId");
    itemsData.forEach(item => {
        const productItem = `
                <div class="col-lg-4 col-md-6">
                    <div class="product__item bg-white my-1.5 rounded-md overflow-hidden min-w-[250px]">
                        <div class="product__item__pic !h-32" >
<<<<<<< HEAD
                            <img class="product__item__pic set-bg !h-32 w-full" src="${item?.images[0]}" alt="biryani">
                            <ul class="product__hover">
                             <!--   <li><a href="img/biryani.jpg" class="image-popup"><span class="arrow_expand"></span></a></li> -->
                                <li><a href="#" class="add-to-cart" data-item='${JSON.stringify(item)}'><span class="icon_bag_alt"></span></a></li>
=======
                            <img class="product__item__pic set-bg !h-32 w-full" src="../assets/images/test_images/biryani.jpg" alt="biryani">
                            ${item?.partnerId === lsPartnerId ? '' : `
                            <ul class="product__hover" id="ul-hover">
                                <li id="cart-logo"><a href="#" class="add-to-cart" data-item='${JSON.stringify(item)}'><span class="icon_bag_alt"></span></a></li>
>>>>>>> origin
                            </ul>
                            `}
                        </div >
        <div class="product__item__text p-3">
            <h6 class="!mb-2"><a href="#" class="!text-xl leading-none">${item.title}</a></h6>
            <p>${item.description}</p>
            <div class="product__price">$ ${item.price}</div>
        </div>
                    </div >
                </div > `;
        itemsList.innerHTML += productItem;
    });

    // Add event listeners for add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const item = JSON.parse(event.currentTarget.dataset.item);
            addToCart(item);
        });
    });

    function addToCart(item) {
        cartCount++;
        cartCountElement.textContent = cartCount;

        // Store item details in cartItems array
        cartItems.push(item);

        // Store cartItems in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}

window.addEventListener('load', () => {

    if (tab == 1) {
        tabfeed.style.backgroundColor = "#045be6";
        tabdiscover.style.backgroundColor = "transparent";
        tabclearance.style.backgroundColor = "transparent";
        tabfeed.style.color = "white";
        tabdiscover.style.color = "#1f2937";
        tabclearance.style.color = "#1f2937";
    }
    if (tab == 2) {
        tabdiscover.style.backgroundColor = "#045be6";
        tabfeed.style.backgroundColor = "transparent";
        tabclearance.style.backgroundColor = "transparent";
        tabdiscover.style.color = "white";
        tabfeed.style.color = "#1f2937";
        tabclearance.style.color = "#1f2937";
    }
    if (tab == 3) {
        tabclearance.style.backgroundColor = "#045be6";
        tabdiscover.style.backgroundColor = "transparent";
        tabfeed.style.backgroundColor = "transparent";
        tabclearance.style.color = "white";
        tabdiscover.style.color = "#1f2937";
        tabfeed.style.color = "#1f2937";
    }

    tabfeed.addEventListener("click", () => {
        tab = 1;
        tabfeed.style.backgroundColor = "#045be6";
        tabdiscover.style.backgroundColor = "transparent";
        tabclearance.style.backgroundColor = "transparent";
        tabfeed.style.color = "white";
        tabdiscover.style.color = "#1f2937";
        tabclearance.style.color = "#1f2937";
        updateFeed();
    });

    tabdiscover.addEventListener("click", () => {
        tab = 2;
        tabdiscover.style.backgroundColor = "#045be6";
        tabfeed.style.backgroundColor = "transparent";
        tabclearance.style.backgroundColor = "transparent";
        tabdiscover.style.color = "white";
        tabfeed.style.color = "#1f2937";
        tabclearance.style.color = "#1f2937";
        updateFeed();
    });

    tabclearance.addEventListener("click", () => {
        tab = 3;
        tabclearance.style.backgroundColor = "#045be6";
        tabdiscover.style.backgroundColor = "transparent";
        tabfeed.style.backgroundColor = "transparent";
        tabdiscover.style.color = "#1f2937";
        tabfeed.style.color = "#1f2937";
        tabclearance.style.color = "white";
        updateFeed();
    });

    getPosts();
    getPartners();
    getItems();
});