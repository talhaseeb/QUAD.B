let userId = localStorage.getItem("userId");
let isPartner = localStorage.getItem("isPartner");

let activeOrders = document.getElementById("active-orders");
let trendingPosts = document.getElementById("trending-posts");
let profileBtns = document.getElementById("profile-btns");
if (!isPartner) {
    activeOrders.style.display = "none";
    trendingPosts.style.marginTop = "0px";
    profileBtns.style.display = "none";
}

function populatePartnerInfo(partner_id) {
    // Fetch data from the API using the partner_id
    fetch(`http://localhost:8000/partners/${partner_id}`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched partner data:', data);
            // Assuming data is the partner object for the logged-in user
            const partner = data;

            // Populate partner name in user-info section
            const partnerNameElements = document.querySelectorAll('.partnerName');
            partnerNameElements.forEach((element, index) => {
                element.textContent = partner.userId.name;
            });

            // Populate partner address
            const partnerAddressElements = document.querySelectorAll('.partnerAddress');
            partnerAddressElements.forEach((element, index) => {
                element.textContent = partner.userId.address;
            });

            // Populate partner type
            const partnerTypeElements = document.querySelectorAll('.partnerType');
            partnerTypeElements.forEach((element, index) => {
                element.textContent = partner.partnerType;
            });

            // Populate orders placed
            const ordersPlacedElements = document.querySelectorAll('.ordersPlaced');
            ordersPlacedElements.forEach((element, index) => {
                element.textContent = partner.ordersPlaced;
            });

            // Populate net items count
            const netItemsCountElements = document.querySelectorAll('.netItemsCount');
            netItemsCountElements.forEach((element, index) => {
                element.textContent = partner.netItemsCount;
            });

            // Populate banner image
            if (partner.bannerImage) {
                const bannerImageElements = document.querySelectorAll('.bannerImage');
                bannerImageElements.forEach((element, index) => {
                    element.src = partner.bannerImage;
                });
            }

            // Populate logo
            if (partner.logo) {
                const logoElements = document.querySelectorAll('.profile-pic');
                logoElements.forEach((element, index) => {
                    element.src = partner.logo;
                });
            }

            // Populate short description
            const shortDescriptionElements = document.querySelectorAll('.shortDescription');
            shortDescriptionElements.forEach((element, index) => {
                element.textContent = partner.short_description;
            });

            // Populate description
            const descriptionElements = document.querySelectorAll('.description');
            descriptionElements.forEach((element, index) => {
                element.textContent = partner.description;
            });

            // Populate tags
            generateTags(partner);
        })
        .catch(error => console.error('Error fetching partner data:', error));
}

// Fetch items for the specific partner ID
function getItemsByPartnerId(partnerId) {
    fetch(`http://localhost:8000/items/partner/${partnerId}`)
        .then(response => response.json())
        .then(data => {
            // Call function to generate cards
            generateCards(data.items);
        })
        .catch(error => console.error('Error fetching items:', error));
}

// Fetch items for the specific partner ID
function getPostsByPartnerId(partnerId) {
    fetch(`http://localhost:8000/posts/${partnerId}`)
        .then(response => response.json())
        .then(data => {
            // Call function to generate cards
            generatePostCards(data);
        })
        .catch(error => console.error('Error fetching items:', error));
}


// Function to generate cards dynamically
function generateCards(items) {
    const cardContainer = document.getElementById('itemsCardContainer');
    cardContainer.innerHTML = ''; // Clear previous content

    items.forEach(item => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('data-item-id', item._id); // Set data attribute with item ID

        const images = item.images; // Array of image URLs
        const image = document.createElement('img');
        let mainImage = '';
        if (images) {
            mainImage = images[0]; // Assuming the first image is the main image
            image.src = mainImage;
        } else {
            // Default image if no image available
            image.src = '../assets/images/default_image.png';
        }

        image.alt = item.title; // Assuming item object has a 'title' property

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h2');
        title.textContent = item.title; // Assuming item object has a 'title' property

        const description = document.createElement('p');
        description.textContent = item.description; // Assuming item object has a 'description' property
        description.classList.add('class_item_description');

        const quantityContainer = document.createElement('span');
        const quantityLabel = document.createElement('strong');
        quantityLabel.textContent = 'Quantity: ';
        const quantityValue = document.createElement('p');
        quantityValue.textContent = item.quantity; // Assuming item object has a 'quantity' property
        quantityValue.setAttribute('contenteditable', 'false'); // Make quantity editable
        quantityValue.classList.add('class_item_quantity');
        quantityContainer.appendChild(quantityLabel);
        quantityContainer.appendChild(quantityValue);

        // Set both elements to display inline
        quantityLabel.style.display = 'inline';
        quantityValue.style.display = 'inline';

        const lineBreak = document.createElement('br'); // Create a line break to move the value to the next line
        quantityContainer.appendChild(lineBreak); // Add line break

        const priceContainer = document.createElement('span');
        const priceLabel = document.createElement('strong');
        priceLabel.textContent = 'Price: $';
        const priceValue = document.createElement('p');
        priceValue.textContent = item.price; // Assuming item object has a 'price' property
        priceValue.setAttribute('contenteditable', 'false'); // Make price editable
        priceValue.classList.add('class_item_price');
        priceContainer.appendChild(priceLabel);
        priceContainer.appendChild(priceValue);

        // Set both elements to display inline
        priceLabel.style.display = 'inline';
        priceValue.style.display = 'inline';

        const updatedAtContainer = document.createElement('h5');

        const updatedAtLabel = document.createElement('strong');
        updatedAtLabel.textContent = 'Updated At: ';

        const updatedAtValue = document.createElement('p');
        updatedAtValue.textContent = new Date(item.updatedAt).toLocaleString(); // Assuming item object has an 'updatedAt' property
        updatedAtValue.setAttribute('contenteditable', 'false'); // Make updatedAt editable

        // Set both elements to display inline
        updatedAtLabel.style.display = 'inline';
        updatedAtValue.style.display = 'inline';

        updatedAtContainer.appendChild(updatedAtLabel);
        updatedAtContainer.appendChild(updatedAtValue);

        // Add edit icon
        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-pencil-alt', 'edit-icon');
        editIcon.addEventListener('click', () => toggleEditMode(editIcon, profileBtnDiv));

        // Create an anchor element
        const profileBtnDiv = document.createElement('div');
        const updateButton = document.createElement('a');
        updateButton.classList.add('primary-btn');
        updateButton.textContent = 'Update Item';
        const img = document.createElement('img');
        img.src = '../assets/images/test_images/icons/connect.png';
        img.alt = 'Update Items';
        updateButton.appendChild(img);

        // Add an event listener to the anchor element
        updateButton.addEventListener('click', () => updateItem(item));
        profileBtnDiv.classList.add('profile-btn');
        profileBtnDiv.appendChild(updateButton);

        // Append all elements to card body
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(quantityContainer);
        cardBody.appendChild(priceContainer);
        cardBody.appendChild(updatedAtContainer);
        if (isPartner)
            cardBody.appendChild(editIcon);
        // Append image and card body to card div
        cardDiv.appendChild(image);
        cardDiv.appendChild(cardBody);

        // Append card div to card container
        cardContainer.appendChild(cardDiv);
    });
}

function generatePostCards(items) {
    const cardContainer = document.getElementById('postsCardContainer');
    cardContainer.innerHTML = ''; // Clear previous content

    items.forEach(item => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('data-item-id', item._id); // Set data attribute with item ID

        const images = item.image; // Image URL

        const image = document.createElement('img');
        if (images) {
            image.src = images;
        } else {
            // Default image if no image available
            image.src = '../assets/images/default_image.png';
        }
        image.alt = item.title; // Assuming item object has a 'title' property

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h2');
        title.textContent = item.title; // Assuming item object has a 'title' property

        const description = document.createElement('p');
        description.textContent = item.description; // Assuming item object has a 'description' property
        description.classList.add('class_post_description');

        // Add edit icon
        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-pencil-alt', 'edit-icon');
        editIcon.addEventListener('click', () => toggleEditMode(editIcon, profileBtnDiv));

        // Create the profile-btn div
        const profileBtnDiv = document.createElement('div');
        const updateButton = document.createElement('a');
        updateButton.classList.add('primary-btn');
        updateButton.textContent = 'Update Post';
        const img = document.createElement('img');
        img.src = '../assets/images/test_images/icons/connect.png';
        img.alt = 'Update Post';
        updateButton.appendChild(img);

        // Add an event listener to the anchor element
        updateButton.addEventListener('click', () => updatePost(item));
        profileBtnDiv.classList.add('profile-btn');
        profileBtnDiv.appendChild(updateButton);

        // Append all elements to card body
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(editIcon);
        // Append image and card body to card div
        cardDiv.appendChild(image);
        cardDiv.appendChild(cardBody);

        // Append card div to card container
        cardContainer.appendChild(cardDiv);
    });
}

// Function to generate tags dynamically
async function generateTags(partnerData) {
    if (!partnerData || !partnerData.tags) return;

    // Get the parent container
    const profileDescription = document.querySelector('.profile-description-tags');
    if (!profileDescription) return;

    // Clear previous content
    profileDescription.innerHTML = '';

    // Create and append h2 element
    const h2 = document.createElement('h2');
    h2.textContent = 'Tags';
    profileDescription.appendChild(h2);

    // Iterate over the tags array and create <a> elements
    partnerData.tags.forEach(tag => {
        const a = document.createElement('a');
        a.href = '#';
        a.classList.add('skill-btn');
        a.textContent = tag;
        profileDescription.appendChild(a);
    });
}


function toggleEditMode(icon, profileBtnDiv) {
    const cardBody = icon.closest('.card-body');
    const editableElements = cardBody.querySelectorAll('p');
    editableElements.forEach(element => {
        if (element.getAttribute('contenteditable') === 'true') {
            element.setAttribute('contenteditable', 'false');
        } else {
            element.setAttribute('contenteditable', 'true');
        }
    });

    // Check if the update button is appended to the card body
    if (profileBtnDiv.parentNode === cardBody) {
        // Remove the update button from the card body
        cardBody.removeChild(profileBtnDiv);
    } else {
        // Append the update button to the card body
        cardBody.appendChild(profileBtnDiv);
    }
}

function updateItem(item) {
    // Get the card element corresponding to the item
    const cardElement = document.querySelector(`.card[data-item-id="${item._id}"]`);

    // Retrieve updated values from input fields or elements
    const updatedDescription = cardElement.querySelector('p.class_item_description').textContent;
    const updatedQuantity = cardElement.querySelector('p.class_item_quantity').textContent;
    const updatedPrice = cardElement.querySelector('p.class_item_price').textContent;
    const updatedAt = new Date().toLocaleString();

    // Compare with the original values of the item
    if (
        updatedDescription !== item.description ||
        updatedQuantity !== item.quantity.toString() ||
        updatedPrice !== item.price.toString()
    ) {
        // Values were updated, so perform the PUT request
        fetch(`http://localhost:8000/items/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: updatedDescription,
                quantity: updatedQuantity,
                price: updatedPrice,
                updatedAt: updatedAt
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Item updated successfully');
                    // Display success message on the UI card
                    const messageElement = document.createElement('p');
                    messageElement.textContent = 'Item updated successfully';
                    messageElement.classList.add('update-message');
                    cardElement.appendChild(messageElement);
                } else {
                    console.error('Failed to update item');
                }
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    } else {
        console.log('No changes to update');
    }
}

function updatePost(posts) {
    // Get the card element corresponding to the item
    const cardElement = document.querySelector(`.card[data-item-id="${posts._id}"]`);

    // Retrieve updated values from input fields or elements
    const updatedDescription = cardElement.querySelector('p.class_post_description').textContent;
    const updatedAt = new Date().toLocaleString();

    // Compare with the original values of the item
    if (
        updatedDescription !== posts.description
    ) {
        // Values were updated, so perform the PUT request
        fetch(`http://localhost:8000/posts/${posts._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: updatedDescription,
                updatedAt: updatedAt
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log('posts updated successfully');
                    const messageElement = document.createElement('p');
                    messageElement.textContent = 'Post updated successfully';
                    messageElement.classList.add('update-message-post');
                    cardElement.appendChild(messageElement);
                } else {
                    console.error('Failed to update posts');
                }
            })
            .catch(error => {
                console.error('Error updating posts:', error);
            });
    } else {
        console.log('No changes to update');
    }
}




// Extract partner_id from the URL
const urlParams = new URLSearchParams(window.location.search);
const partner_id = urlParams.get('id');

// Check if partner_id is available in the URL
if (partner_id) {
    // Call the function to populate partner info with the extracted partner_id
    populatePartnerInfo(partner_id);
    getItemsByPartnerId(partner_id);
    getPostsByPartnerId(partner_id);
} else {
    console.error('User ID not found in the URL');
}




/***MODAL CODE ****/
// Get the modal
const modal1 = document.getElementById('createItemModal');
const modal2 = document.getElementById('createPostModal');

//Create Item Modal
const createItemsBtn = document.getElementById('createItemsBtn');

// Closing the modal
const closeModal = document.querySelector('.close');

// When the user clicks the button, OPEN the modal
createItemsBtn.addEventListener('click', function () {
    event.preventDefault();
    modal1.style.display = 'block';
});

// When the user clicks on <span> (x), CLOSE the modal
closeModal.addEventListener('click', function () {
    modal1.style.display = 'none';
    modal2.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, CLOSE it
window.addEventListener('click', function (event) {
    if (event.target === modal1 || event.target === modal2) {
        modal1.style.display = 'none';
        modal2.style.display = 'none';
    }
});

// Handle form submission -- CREATE ITEM
const createItemForm = document.getElementById('createItemForm');

createItemForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve form data
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const images = document.getElementById('image').files[0];

    // Create the item object
    const newItem = {
        title: title,
        description: description,
        price: price,
        quantity: quantity,
        images: images
    };

    // Send POST request to Items Table
    fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response from the server
            console.log('Item created successfully:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error creating item:', error.message);
        });

    // Close the modal after submitting the form
    modal1.style.display = 'none';

    // Optionally, you can reset the form fields here
    createItemForm.reset();
});

// Get the button that opens the modal
const createPostsBtn = document.getElementById('createPostsBtn');

// When the user clicks the button, open the modal
createPostsBtn.addEventListener('click', function () {
    event.preventDefault();
    modal2.style.display = 'block';
});

// Handle form submission -- CREATE POSTS
const createPostForm = document.getElementById('createPostForm');

createPostForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve form data
    const title = document.getElementById('post_title').value;
    const description = document.getElementById('post_description').value;
    const images = document.getElementById('post_image').files[0];

    // Create the post object
    const newPost = {
        title: title,
        description: description,
        image: images
    };

    // Send POST request to Posts Table
    fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response from the server
            console.log('Item created successfully:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error creating item:', error.message);
        });

    // Close the modal after submitting the form
    modal2.style.display = 'none';

    // Optionally, you can reset the form fields here
    createPostForm.reset();
});





