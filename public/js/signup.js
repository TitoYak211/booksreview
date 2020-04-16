const signup = async (name, email, password, passwordConfirm) => {
    console.log(name, email, password, passwordConfirm);
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
        })
        console.log(res);
    } catch (error) {
        console.log(error.response.data);
    }
};

document.querySelector('.signup-form').addEventListener('submit', e => {

    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    signup(name, email, password, passwordConfirm);
});