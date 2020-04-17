const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');

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
            alert('You have successfully created your account!');

            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        };

    } catch (error) {
        alert(error.response.data.message);
    }
};

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
            alert('You are logged in successfully!');

            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        };

    } catch (error) {
        alert(error.response.data.message);
    }
};

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