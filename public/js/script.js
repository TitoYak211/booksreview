const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');
const logoutButton = document.querySelector('.nav__el--logout');
const alertPosition = document.querySelector('main');
const hideAlertPosition = document.querySelector('.alert');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

// Hide alerts
const hideAlert = () => {
    if (hideAlertPosition) {
        hideAlertPosition.parentElement.removeChild(hideAlertPosition);
    };
};

// Show alerts
const showAlert = (status, message) => {
    // Hide all existing alerts
    hideAlert();

    // Show alert as a div element
    const alertBox = `<div class="alert alert--${status}">${message}</div>`;

    if (alertPosition) {
        alertPosition.insertAdjacentHTML('afterbegin', alertBox);
    };

    // Clear all alerts after 2 seconds
    window.setTimeout(hideAlert, 2000);
};

// Sign user up
const signup = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });

        if (res.data.status === 'Success') {
            showAlert('success', 'You have successfully created your account!');

            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        };

    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};

// Login user
const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/users/login',
            data: {
                email,
                password
            }
        });

        if (res.data.status === 'Success') {
            showAlert('success', 'You are logged in successfully!');

            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        };

    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};

// log user out
const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/users/logout'
        });

        if (res.data.status === 'Success') {
            location.reload(true);
        };

    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};

// Update user data
const updateData = async (data, type) => {
    try {
        const url =
            type === 'password'
                ? 'http://127.0.0.1:3000/api/users/updatePassword'
                : 'http://127.0.0.1:3000/api/users/updateMe'

        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if (res.data.status === 'Success') {
            showAlert('success', 'You have successfully updated your details');
        };

    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};

// Execute logout
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
};

// Execute signup
if (signupForm) {
    signupForm.addEventListener('submit', e => {
        // Disable browser's default behavior when form is submitted
        e.preventDefault();
    
        // Get user signup details from form input fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        
        // Sign up the user
        signup(name, email, password, passwordConfirm);
    });
};

// Execute login
if (loginForm) {
    loginForm.addEventListener('submit', e => {

        // Disable browser's default behavior when form is submitted
        e.preventDefault();
    
        // Get user signup details from form input fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        // Login the user
        login(email, password);
    });
};

// Execute updateData
if (userDataForm) {
    userDataForm.addEventListener('submit', e => {
        // Disable browser's default behavior when form is submitted
        e.preventDefault();

        // Get name, email from form input fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        // Update name, email
        updateData({name, email}, 'data');
    });
};

// Change password
if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', async e => {
        // Disable browser's default behavior when form is submitted
        e.preventDefault();

        // Get details from form input fields
        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        
        // Update password
        await updateData({passwordCurrent, password, passwordConfirm}, 'password');
    });
};