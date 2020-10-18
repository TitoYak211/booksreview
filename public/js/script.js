const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');
const logoutButton = document.querySelector('.nav__el--logout');
const alertPosition = document.querySelector('main');
const hideAlertPosition = document.querySelector('.alert');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const searchForm = document.querySelector('.search__form');

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
            url: '/api/users/signup',
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
            url: '/api/users/login',
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
            url: '/api/users/logout'
        });

        if (res.data.status === 'Success') {
            showAlert('success', 'You have been logged out successfully!');

            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
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
                ? '/api/users/updatePassword'
                : '/api/users/updateMe'

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

const searchBook = async (keyword) => {
    try {
        //Fetch the books matching query
        const res = await axios({
            method: 'GET',
            url: `/?keyword=${keyword}`
        });
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}

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

        // Get name, email, photo from form input fields
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        
        // Update name, email
        updateData(form, 'data');
    });
};

// Change password
if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', async e => {
        // Disable browser's default behavior when form is submitted
        e.preventDefault();

        // Indicate loading process
        document.querySelector('.btn_save_password').textContent = 'Updating...';

        // Get details from form input fields
        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        
        // Update password
        await updateData({ passwordCurrent, password, passwordConfirm }, 'password');

        // Reset button to default
        document.querySelector('.btn_save_password').textContent = 'Save password';

        // Clear input fields
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    });
};

if (searchForm) {
    searchForm.addEventListener('submit', async e => {
        // Disable browser's default behavior when form is submitted
        e.preventDefault();

        const keyword = searchForm.querySelector('input[name=keyword]').value;

        // Make a GET request to the books route, searching for keyword
        await searchBook(keyword);
    });
};