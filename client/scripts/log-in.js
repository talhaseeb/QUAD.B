
//Generate Register Form
// Initialize isPartner
let isPartner = false;
// Store the initial values of the input fields
let storedValues = {
    fullName: '',
    email: '',
    password: '',

};

// Store the initial form HTML
const initialFormHTML = '<h1>Register</h1>' +
    '<input type="text" placeholder="Full Name" id="fullName" />' +
    '<input type="text" placeholder="Email" id="email" />' +
    '<input type="password" placeholder="Password" id="password" />' +
    '<select id="partnerDropdown">' +
    '<option value="true">Not a Partner</option>' +
    '<option value="false">Partner</option>' +
    '</select>' +
    '<input type="submit" value="Register" />' +
    '<div class="links">' +
    '<a href="#" id="loginLink">Log in</a>' +
    '</div>';

// Add event listener to the register link
document.getElementById('registerLink').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    // Replace the form content with the initial HTML
    document.getElementById('loginForm').innerHTML = initialFormHTML;

    // Add event listener to dropdown change
    document.getElementById('partnerDropdown').addEventListener('change', handleDropdownChange);

    // Add event listener to revert back to login form
    document.getElementById('loginLink').addEventListener('click', handleLoginLinkClick);
});

// Function to handle dropdown change
function handleDropdownChange() {
    isPartner = this.value === 'false';

    if (isPartner) {
        // Store the values of the initial fields
        storedValues.fullName = document.getElementById('fullName').value;
        storedValues.email = document.getElementById('email').value;
        storedValues.password = document.getElementById('password').value;

        // Add partner-specific fields
        let partnerFieldsHTML = '<input type="text" placeholder="Banner Image URL" id="bannerImage" />' +
            '<input type="text" placeholder="Socials" id="socials" />' +
            '<textarea placeholder="Description" id="description"></textarea>' +
            '<input type="text" placeholder="Short Description" id="shortDescription" />' +
            '<input type="submit" value="Register" />' +
            '<input type="button" id="backButton" value="Back" />' + // Change type to "button"
            '<div class="links">' +
            '<a href="#" id="loginLink">Log in</a>' +
            '</div>';

        // Update the form content with the partner-specific HTML
        document.getElementById('loginForm').innerHTML = partnerFieldsHTML;

        // Add event listener to the "Back" button
        document.getElementById('backButton').addEventListener('click', handleBackButtonClick);
    }

    // Add event listener to revert back to login form
    document.getElementById('loginLink').addEventListener('click', handleLoginLinkClick);
}

// Function to handle "Back" button click
function handleBackButtonClick(event) {
    event.preventDefault();
    // Store the values of the initial fields
    storedValues.bannerImage = document.getElementById('bannerImage').value;
    storedValues.socials = document.getElementById('socials').value;
    storedValues.description = document.getElementById('description').value;
    storedValues.short_description = document.getElementById('shortDescription').value;
    console.log(storedValues);
    // // Restore the initial registration form
    // document.getElementById('loginForm').innerHTML = initialFormHTML;
    // Restore the initial registration form with stored values
    document.getElementById('loginForm').innerHTML = initialFormHTML;
    document.getElementById('fullName').value = storedValues.fullName;
    document.getElementById('email').value = storedValues.email;
    document.getElementById('password').value = storedValues.password;
    // Reattach event listener to the dropdown change
    document.getElementById('partnerDropdown').addEventListener('change', handleDropdownChange);
    // Add event listener to revert back to login form
    document.getElementById('loginLink').addEventListener('click', handleLoginLinkClick);
}

// Function to handle "Log in" link click
function handleLoginLinkClick(event) {
    event.preventDefault(); // Prevent default link behavior
    location.reload(); // Reload the page to show the login form
}






// Function to handle login form submission
function handleLoginFormSubmit(event) {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Send a POST request to the login endpoint
    fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (response.ok) {
                // If login is successful, extract user data from response and save to local storage
                response.json().then(data => {
                    const { _id, isPartner, partnerId } = data;
                    localStorage.setItem('userId', _id);
                    localStorage.setItem('isPartner', isPartner);
                    // Redirect to index.html or perform other actions as needed
                    if (isPartner) {
                        window.location.href = '../pages/partner_profile.html?id=' + data?.partnerId;
                    }
                    else
                        window.location.href = '../pages/feed.html';
                });
            } else {
                // If login fails, handle error or redirect back to the login page
                window.location.href = '/login.html';
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            // Handle error if needed
        });
}

// Add event listener to the login form
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleLoginFormSubmit);
