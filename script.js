console.log("Hello world");

fetch('http://localhost:8080/ofud/api/v1/estudiantes')
    .then(response => response.json())
    .then(data => {
        console.log("data:")
        console.log(data)
        const studentTableBody = document.getElementById('student-table-body');
        console.log(studentTableBody)
        data.forEach(student => {
            console.log("--")
            console.log(student)
            const tr = document.createElement('tr');
            const codigoTd = document.createElement('td');
            const apellidoTd = document.createElement('td');
            const celularTd = document.createElement('td');
            const correoInstitucionalTd = document.createElement('td');
            const correoPersonalTd = document.createElement('td');
            const documentoTd = document.createElement('td');
            const nacimientoTd = document.createElement('td');
            const nombreTd = document.createElement('td');
            const tipoTd = document.createElement('td');

            codigoTd.textContent = student.codigo;
            apellidoTd.textContent = student.apellido;
            celularTd.textContent = student.celular;
            correoInstitucionalTd.textContent = student.correoInstitucional;
            correoPersonalTd.textContent = student.correoPersonal;
            documentoTd.textContent = student.documento;
            nacimientoTd.textContent = student.nacimiento;
            nombreTd.textContent = student.nombre;
            tipoTd.textContent = student.tipo;

            tr.appendChild(codigoTd);
            tr.appendChild(nombreTd);
            tr.appendChild(apellidoTd);
            tr.appendChild(celularTd);
            tr.appendChild(correoInstitucionalTd);
            tr.appendChild(correoPersonalTd);
            tr.appendChild(documentoTd);
            tr.appendChild(nacimientoTd);
            tr.appendChild(tipoTd);

            studentTableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error(error);
    });

console.log("done with fetch");
