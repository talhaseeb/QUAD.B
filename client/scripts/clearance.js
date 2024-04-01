const itemsList = document.getElementById('items-list');
const fetchItemsBtn = document.getElementById('fetch-items-btn');
const cartCountElement = document.getElementById('cart-count');

window.addEventListener('load', async () => {

    // Cart initialization
    let cartCount = 0;
    let cartItems = []; // Array to store cart items

    // document.getElementById('filter-icon').addEventListener('click', function() {
    //     var filterOptions = document.getElementById('filter-options');
    //     filterOptions.classList.toggle('active');
    // });

    // document.querySelectorAll('.filter-option').forEach(item => {
    //     item.addEventListener('click', function() {
    //         var selectedOption = this.getAttribute('data-value');
    //         console.log('Selected option:', selectedOption);
    //         // Add your logic here to handle the selected option
    //     });
    // });


    try {
        const itemsResponse = await fetch('http://localhost:8000/items', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const itemsData = await itemsResponse.json();

        if (itemsResponse.ok) {
            console.log(itemsData);
            if (itemsData?.items.length == 0) {
                document.getElementById("no-items").innerText = "No items to display!"
            } else {
                displayItems(itemsData?.items);
            }
        } else {
            console.error('Failed to fetch items:', itemsData.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }

    function displayItems(itemsData) {
        itemsList.innerHTML = ''; // Clear previous items
        itemsData.forEach(item => {
            const productItem = `
                <div class="col-lg-4 col-md-6">
                    <div class="product__item bg-white my-1.5 rounded-md overflow-hidden min-w-[250px]">
                        <div class="product__item__pic !h-32" >
                            <img class="product__item__pic set-bg !h-32 w-full" src="../assets/images/test_images/biryani.jpg" alt="biryani">
                            <ul class="product__hover">

                                <li><a href="#" class="add-to-cart" data-item='${JSON.stringify(item)}'><span class="icon_bag_alt"></span></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text p-3">
                            <h6 class="!mb-2"><a href="#" class="!text-xl leading-none">${item.title}</a></h6>
                            <p>${item.description}</p>
                            <div class="product__price">$ ${item.price}</div>
                        </div>
                    </div>
                </div>`;
            itemsList.innerHTML += productItem;
        });
//                              <!--  <li><a href="img/biryani.jpg" class="image-popup"><span class="arrow_expand"></span></a></li> -->
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
});
