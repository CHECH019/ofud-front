const registrationForm = document.querySelector('.registration-form');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const codigo = document.querySelector('#codigo').value;
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const celular = document.querySelector('#celular').value;
    const correoInstitucional = document.querySelector('#correo_institucional').value;
    const correoPersonal = document.querySelector('#correo_personal').value;
    const documento = document.querySelector('#documento').value;
    const nacimiento = document.querySelector('#nacimiento').value;
    const tipo = document.querySelector('#tipo').value;

    const data = {
        codigo,
        nombre,
        apellido,
        celular,
        correoInstitucional,
        correoPersonal,
        documento,
        nacimiento,
        tipo
    };

    fetch('http://localhost:8080/ofud/api/v1/estudiantes/registro', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Student successfully registered!');
            registrationForm.reset();
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while registering the student.');
        });
});
