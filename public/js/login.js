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

document.querySelector('.login-form').addEventListener('submit', e => {

    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
});