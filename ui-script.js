let form = document.getElementById("ui-form");
function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);

function setUIStatus(klasse, melding) {

    let statusOmrade = document.querySelector('.status-omrade');
    let nyttElement = document.createElement('p');
    nyttElement.innerHTML = melding;
    nyttElement.className = klasse;

    if (statusOmrade.hasChildNodes()) {
        while (statusOmrade.hasChildNodes()){
            statusOmrade.removeChild(statusOmrade.lastChild);

        }
    }

    statusOmrade.appendChild(nyttElement);

}

function valider(fodselsNrStreng) {
    if (!validerFodselsnummer(fodselsNrStreng)) {
        setUIStatus('error', '\u2612 Ugyldig fødselsnummer. Prøv igjen!');
    } else {
        setUIStatus('info', '\u2611 Gyldig fødselsnummer!')
    }
}