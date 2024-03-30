document.addEventListener('DOMContentLoaded', () => {
    const itemsList = document.getElementById('items-list');
    const fetchItemsBtn = document.getElementById('fetch-items-btn');
    const cartCountElement = document.getElementById('cart-count');

    // Cart initialization
    let cartCount = 0;
    let cartItems = []; // Array to store cart items

    document.getElementById('filter-icon').addEventListener('click', function() {
        var filterOptions = document.getElementById('filter-options');
        filterOptions.classList.toggle('active');
    });
    
    document.querySelectorAll('.filter-option').forEach(item => {
        item.addEventListener('click', function() {
            var selectedOption = this.getAttribute('data-value');
            console.log('Selected option:', selectedOption);
            // Add your logic here to handle the selected option
        });
    });
    
    

    fetchItemsBtn.addEventListener('click', async () => {
        try {
            const itemsResponse = await fetch('/items');
            const itemsData = await itemsResponse.json();

            if (itemsResponse.ok) {
                displayItems(itemsData);
                console.log(itemsData);
            } else {
                console.error('Failed to fetch items:', itemsData.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    });

    // fetchItemsBtn.addEventListener('click', async () => {
    //     try {
    //         const itemsResponse = await fetch('/items');
    //         const itemsData = await itemsResponse.json();
    //         console.log("THIS IS ITEMS: "+JSON.stringify(itemsData));
    //         if (itemsResponse.ok) {
    //             // Fetch all partners
    //             const partnersResponse = await fetch('/partners');
    //             const partnersData = await partnersResponse.json();
    //             console.log("THIS IS PARTNER: "+JSON.stringify(partnersData));
    //             if (partnersResponse.ok) {
    //                 // Map partner data to items
    //                 const itemsWithPartners = itemsData.map(item => {
    //                     const partner = partnersData.find(partner => partner._id === item.partnerId);
    //                     return { ...item, partner };
    //                 });
    //                 console.log("THIS IS ITEM WITH PARTNER: "+JSON.stringify(itemsWithPartners));

    //                 // Display items based on the filter selected
    //                 const filterOption = document.querySelector('.filter-option.active').dataset.value;
    //                 if (filterOption === 'store') {
    //                     const storeItems = itemsWithPartners.filter(item => item.partner.partnerType === 'store');
    //                     displayItems(storeItems);
    //                 } else if (filterOption === 'restaurant') {
    //                     const restaurantItems = itemsWithPartners.filter(item => item.partner.partnerType === 'restaurant');
    //                     displayItems(restaurantItems);
    //                 } else {
    //                     // By default, display all items
    //                     displayItems(itemsData);
    //                 }
    //             } else {
    //                 console.error('Failed to fetch partners:', partnersData.message);
    //             }
    //         } else {
    //             console.error('Failed to fetch items:', itemsData.message);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error.message);
    //     }
    // });
    
    // document.querySelectorAll('.filter-option').forEach(option => {
    //     option.addEventListener('click', function() {
    //         // Remove active class from all options
    //         document.querySelectorAll('.filter-option').forEach(opt => {
    //             opt.classList.remove('active');
    //         });
    //         // Add active class to the clicked option
    //         this.classList.add('active');
    //     });
    // });
    

    function displayItems(itemsData) {
        itemsList.innerHTML = ''; // Clear previous items
        itemsData.forEach(item => {
            const productItem = `
                <div class="col-lg-4 col-md-6">
                    <div class="product__item">
                        <div class="product__item__pic" >
                            <img class="product__item__pic set-bg" src="biryani.jpg" alt="biryani">
                            <ul class="product__hover">
                                <li><a href="biryani.jpg" class="image-popup"><span class="arrow_expand"></span></a></li>
                                <li><a href="#" class="add-to-cart" data-item='${JSON.stringify(item)}'><span class="icon_bag_alt"></span></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="#">${item.title}</a></h6>
                            <p>${item.description}</p>
                            <div class="product__price">$ ${item.price}</div>
                        </div>
                    </div>
                </div>`;
            itemsList.insertAdjacentHTML('beforeend', productItem);
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
});
