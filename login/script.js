const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("HOLA")

    const url = 'http://localhost:8080/ofud/api/v1/empleados/coord'
    const email = document.querySelector('#email').value;
    const data = {
        email
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.Response == 'Denegado'){
                alert(data.Response);
            }else{
                loginForm.reset();
                localStorage.setItem('name', data.Response);
                window.location.href = '../main/main.html';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while login in.');
        });
});