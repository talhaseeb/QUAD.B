
//Generate Register Form
// Initialize isPartner
let isPartner = false;
var registerUser = false;
// Store the initial values of the input fields
let storedValues = {
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    isPartner: false,
    bannerImage: '',
    socials: '',
    description: '',
    short_description: '',
    tags: '',
    logo: '',
    partnerType: ''
};

// Store the initial form HTML
const initialFormHTML = '<h1>Register</h1>' +
    '<input type="text" placeholder="Full Name" id="name" />' +
    '<input type="email" placeholder="Email" id="email" />' +
    '<input type="text" placeholder="Address" id="address"/>' +
    '<input type="tel" placeholder="Contact" id="phone"/>' +
    '<input type="password" placeholder="Password" id="password" />' +
    '<select id="partnerDropdown">' +
    '<option value="">Select User Type</option>' +
    '<option value="true">Customer</option>' +
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
        storedValues.name = document.getElementById('name').value;
        storedValues.email = document.getElementById('email').value;
        storedValues.address = document.getElementById('address').value;
        storedValues.phone = document.getElementById('phone').value;
        storedValues.password = document.getElementById('password').value;
        storedValues.isPartner = true;

        // Add partner-specific fields
        let partnerFieldsHTML =
            '<label for="bannerImage">Banner Image:</label>' +
            '<input type="file" accept="image/*" id="bannerImage" required />' +
            '<input type="text" placeholder="Socials" id="socials" required />' +
            '<textarea placeholder="Description" id="description" required></textarea>' +
            '<input type="text" placeholder="Short Description" id="short_description" required />' +
            '<select id="partnerType" required>' +
            '<option value="">Select Partner Type</option>' +
            '<option value="store">Store</option>' +
            '<option value="restaurant">Restaurant</option>' +
            '<option value="donationCenter">Donation Center</option>' +
            '</select>' +
            '<input type="text" placeholder="Tags (separated by commas or spaces)" id="tags" required />' +
            '<label for="logo">Logo: </label>' +
            '<input type="file" accept="image/*" id="logo" required />' +
            '<input type="submit" id="registerLink" value="Register" />' +
            '<input type="button" id="backButton" value="Back" />' +
            '<div class="links">' +
            '<a href="#" id="loginLink">Log in</a>' +
            '</div>';

        // Update the form content with the partner-specific HTML
        document.getElementById('loginForm').innerHTML = partnerFieldsHTML;

        // Populate partner-specific fields with stored values if available
        document.getElementById('socials').value = storedValues.socials || '';
        document.getElementById('description').value = storedValues.description || '';
        document.getElementById('short_description').value = storedValues.short_description || '';
        document.getElementById('tags').value = storedValues.tags || '';
        document.getElementById('partnerType').value = storedValues.partnerType || '';

        // Add event listener to the "Back" button
        document.getElementById('backButton').addEventListener('click', handleBackButtonClick);
    }

    // Add event listener to revert back to login form
    document.getElementById('loginLink').addEventListener('click', handleLoginLinkClick);
}

// Function to handle "Back" button click
function handleBackButtonClick(event) {
    event.preventDefault();
    // Split the input value into an array of tags
    const tagsInput = document.getElementById('tags').value;
    const tagsArray = tagsInput.split(/[,\s]+/).filter(tag => tag.trim() !== '');

    // Store the values of the initial fields
    storedValues.bannerImage = document.getElementById('bannerImage').files[0];
    storedValues.socials = document.getElementById('socials').value;
    storedValues.description = document.getElementById('description').value;
    storedValues.short_description = document.getElementById('short_description').value;
    storedValues.logo = document.getElementById('logo').files[0];
    storedValues.tags = tagsArray;
    storedValues.partnerType = document.getElementById('partnerType').value;
    storedValues.isPartner = true;
    console.log(storedValues);

    // Restore the initial registration form with stored values
    document.getElementById('loginForm').innerHTML = initialFormHTML;
    document.getElementById('name').value = storedValues.name;
    document.getElementById('email').value = storedValues.email;
    document.getElementById('address').value = storedValues.address;
    document.getElementById('phone').value = storedValues.phone;
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
    if (registerUser == false) {
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
                        localStorage.setItem('partnerId', partnerId);
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
}

async function handleRegistrationFormSubmit(event) {
    event.preventDefault();

    const partnerTypeElement = document.getElementById('partnerType');

    const registrationForm = storedValues.isPartner;
    storedValues.partnerType = partnerTypeElement ? partnerTypeElement.value : null;
    const isType = storedValues.partnerType;

    if (registrationForm && isType) {
        registerUser = true;
        const tagsInput = document.getElementById('tags').value;
        const tagsArray = tagsInput.split(/[,\s]+/).filter(tag => tag.trim() !== '');

        storedValues.bannerImage = document.getElementById('bannerImage').files[0] || '';
        storedValues.socials = document.getElementById('socials').value || '';
        storedValues.description = document.getElementById('description').value || '';
        storedValues.shortDescription = document.getElementById('short_description').value || '';
        storedValues.logo = document.getElementById('logo').files[0] || '';
        storedValues.tags = tagsArray || [];
        storedValues.partnerType = document.getElementById('partnerType').value || '';

        try {
            const formData = new FormData(event.target);
            const name = formData.get('name') || storedValues.name;
            const email = formData.get('email') || storedValues.email;
            const address = formData.get('address') || storedValues.address;
            const phone = formData.get('phone') || storedValues.phone;
            const password = formData.get('password') || storedValues.password;
            const isPartner = storedValues.isPartner;
            const bannerImage = formData.get('bannerImage') || storedValues.bannerImage;
            const socials = formData.get('socials') || storedValues.socials;
            const description = formData.get('description') || storedValues.description;
            const shortDescription = formData.get('short_description') || storedValues.shortDescription;
            const tags = formData.get('tags') || storedValues.tags;
            const partnerType = formData.get('partnerType') || storedValues.partnerType;
            const logo = formData.get('logo') || storedValues.logo;

            async function getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        resolve(reader.result)
                    };
                    reader.onerror = error => reject(error);
                });
            }

            let bannerImageBase64 = "";
            let logoBase64 = "";

            try {
                bannerImageBase64 = await getBase64(bannerImage);
                logoBase64 = await getBase64(logo);
            } catch (error) {
                console.error("Error occurred while converting images to base64:", error);
            }

            const registrationData = {
                name,
                email,
                address,
                phone,
                password,
                isPartner,
                bannerImage: bannerImageBase64,
                socials,
                description,
                shortDescription,
                tags,
                logo: logoBase64,
                partnerType
            };

            try {
                const response = await fetch('http://localhost:8000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registrationData)
                });

                if (response.ok) {
                    console.log("Registration successful");
                    // Redirect to login page or perform other actions
                } else {
                    console.error('Registration failed');
                }
            } catch (error) {
                console.error('Error registering:', error);
                // Handle error if needed
            }
        } catch (error) {
            console.error("Error processing form data:", error);
            // Handle error if needed
        }
    }
    else {
        registerUser = true;
        const formData = new FormData(event.target);
        const name = formData.get('name') || document.getElementById('name').value;
        const email = formData.get('email') || document.getElementById('email').value;
        const address = formData.get('address') || document.getElementById('address').value;
        const phone = formData.get('phone') || document.getElementById('phone').value;
        const password = formData.get('password') || document.getElementById('password').value;
        const isPartner = storedValues.isPartner;

        const registrationData = {
            name,
            email,
            address,
            phone,
            password,
            isPartner,
        }
        try {
            const response = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });

            if (response.ok) {
                console.log("Registration successful");
                // Redirect to login page or perform other actions
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering:', error);
            // Handle error if needed
        }
    }
}


if (registerUser == false) {
    // Add event listener to the login form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLoginFormSubmit);
}

// Add event listener to the registration form
const registrationForm1 = document.getElementById('loginForm');
registrationForm1.addEventListener('submit', handleRegistrationFormSubmit);