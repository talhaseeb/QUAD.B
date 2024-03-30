// cart.js

// Retrieve cartItems from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems'));
console.log(cartItems[0]);
const total = document.getElementById('cart-total');
// Display cart items
const cartItemsContainer = document.getElementById('cart-items');
let subtotal = 0;
if (cartItems && cartItems.length > 0) {
    
    let totalPrice = 0;
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('tr');
        cartItemElement.innerHTML = `
        <td class="cart__product__item">
       <!-- <img src="biryani.jpg" alt=""> -->
        <div class="cart__product__item__title">
            <h6>${item.title}</h6>
        </div>
    </td>
    <td class="cart__price">$ ${item.price}</td>
    <td class="cart__quantity">
    <div class="pro-qty">
    <span class="dec qtybtn">-</span>
    <input type="number" class="quantity-input" value="1" min="1" max="${item.quantity}">
    <span class="inc qtybtn">+</span>
</div>
    </td>
    <td class="cart__total">${item.price}</td>
    
        `;
        cartItemsContainer.appendChild(cartItemElement);
        // Calculate subtotal and total
        subtotal += item.price * 1; // Multiply by quantity, assuming quantity is always 1 for now
        totalPrice += item.price * 1; // Multiply by quantity, assuming quantity is always 1 for now
    });

 // Select the input element
const quantityInput = document.querySelector('.quantity-input');

// Select the increment and decrement buttons
const incButton = document.querySelector('.qtybtn.inc');
const decButton = document.querySelector('.qtybtn.dec');

// Add event listener for the increment button
incButton.addEventListener('click', () => {
    // Get the current value of the input
    let value = parseInt(quantityInput.value);
    // Increment the value
    value++;
    // Ensure the value does not exceed the maximum
    value = Math.min(value, parseInt(quantityInput.getAttribute('max')));
    // Update the input value
    quantityInput.value = value;
});

// Add event listener for the decrement button
decButton.addEventListener('click', () => {
    // Get the current value of the input
    let value = parseInt(quantityInput.value);
    // Decrement the value
    value--;
    // Ensure the value does not go below the minimum
    value = Math.max(value, parseInt(quantityInput.getAttribute('min')));
    // Update the input value
    quantityInput.value = value;
});
   

// Update subtotal in HTML
const subtotalElement = document.querySelector('.subtotal');
subtotalElement.textContent = `$ ${subtotal.toFixed(2)}`;

// Calculate total (assuming subtotal is the same as total for now)
// const total = subtotal;

// Update total in HTML
const totalElement = document.querySelector('.total');
totalElement.textContent = `$ ${subtotal.toFixed(2)}`;

} else {
    cartItemsContainer.innerHTML = '<p>No items in the cart</p>';
}

// Open modal when "Proceed to Checkout" button is clicked
document.getElementById("proceedToCheckout").addEventListener("click", function() {
    $('#checkoutModal').modal('show');
  });
  
  
  // // Handle payment confirmation
  // document.getElementById("confirmPayment").addEventListener("click", function() {
  //   const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  //   if (paymentMethod === "payOnPickup") {
  //     console.log("Payment on pick up selected");
  //     // Handle payment on pick up
  //   } else if (paymentMethod === "payNow") {
  //     console.log("Pay now selected");
  //     // Handle payment now
  //   }
  //   $('#checkoutModal').modal('hide'); // Close the modal
      
  // Listen for change event on radio buttons
  document.querySelectorAll('input[type="radio"][name="paymentMethod"]').forEach(radio => {
    radio.addEventListener("change", function() {
      if (this.value === "payNow" && this.checked) {
        $('#checkoutModal').modal('hide');
        $('#creditCardModal').modal('show');
      }
    });
  });

  // Get references to the "Confirm" and "Confirm Payment" buttons
const confirmButton = document.getElementById('confirmPayment');
const confirmPaymentButton = document.getElementById('confirmCreditCardPayment');
let unqOrderId = generateUniqueOrderId();
// Add event listener for the "Confirm" button
confirmButton.addEventListener('click', function() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    if (paymentMethod === 'payOnPickup') {
        createOrder('Pay on pick up', false, unqOrderId);
    } 
});

// Add event listener for the "Confirm Payment" button in the credit card modal
confirmPaymentButton.addEventListener('click', function() {
    createOrder('Pre Paid', true, unqOrderId);
});

document.getElementById('confirmPayment').addEventListener('click', function() {
  $('#checkoutModal').modal('hide'); // Close the checkout modal
  $('#successModal').modal('show'); // Show the success modal
});

// Add event listener for the "Confirm Payment" button
document.getElementById('confirmCreditCardPayment').addEventListener('click', function() {
  $('#creditCardModal').modal('hide'); // Close the credit card modal
  $('#successModal').modal('show'); // Show the success modal
});



function generateUniqueOrderId() {
  //const timestamp = Date.now().toString(); // Get current timestamp
  const randomNum = Math.floor(Math.random() * 1000000000); // Generate random 9-digit number
  return `ORD${randomNum}`; // Concatenate "ORD", timestamp, and random number
}
// Set dynamic value for the success message
document.getElementById('successMessage').innerText = `Your Unique Order ID is: ${unqOrderId}`;


// console.log("Unique order is: "+unqOrderId);

function createOrder(paymentMode, paymentStatus, unqOrderId) {
  let uOID = String(unqOrderId)
  const orderData = {
      partnerId: cartItems[0].partnerId,
      userId:"6605ab4935e60cb6adddaf73", //cartItems[0].partnerId.userId,
      itemId: cartItems.map(item => item._id),
      shortDescription: "This is a 2nd sample short Description from front-end",
      uniqueOrderId: uOID,
      totalPrice: subtotal,
      paymentMode: paymentMode,
      isOrderIDVerified: false,
      paymentStatus: paymentStatus
       // You need to implement this function
  };
  console.log("Order data is: "+JSON.stringify(orderData));

  // Send POST request to create the order
  fetch('/orders', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to create order');
      }
      return response.json();
  })
  .then(data => {
      // Handle successful response
      console.log('Order created successfully:', data);
  })
  .catch(error => {
      // Handle error
      console.error('Error creating order:', error);
  });
}




  
  


