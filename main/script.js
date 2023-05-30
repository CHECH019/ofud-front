const tabButtons = document.querySelectorAll('.tab-button');
const tabContentPanes = document.querySelectorAll('.tab-content .tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;

        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        tabContentPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        button.classList.add('active');
        document.querySelector(`.tab-content .tab-pane[data-tab="${targetTab}"]`).classList.add('active');
    });
});

const nameElement = document.getElementById('name')
nameElement.textContent = localStorage.getItem('name');


window.addEventListener('load', () => {
    const myDate = new Date(); // Aquí puedes reemplazarlo con tu propia fecha

    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, '0');
    const day = String(myDate.getDate()).padStart(2, '0');
    const hours = String(myDate.getHours()).padStart(2, '0');
    const minutes = String(myDate.getMinutes()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log(formattedDateTime);
    /* remove second/millisecond if needed - credit ref. https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time#comment112871765_60884408 */
  
    document.getElementById('datetime').value = formattedDateTime;
 });

