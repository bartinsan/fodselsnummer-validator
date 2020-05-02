// Dette er et Script som tester og validerer Norske fødselsnummer.
// Martin Sandvik


function saniterNummer(nummer) {
    if (nummer.length !== 11) {
        console.log("Feil: Ugyldig lengde.");
        return false;
    }

    if (nummer.NaN) {
        console.log("Feil: Må kun inneholde tall.")
        return false;
    }
    return true;
}

function validerFodselsnummer(fodselsNr) {

    // Sjekker lengde og om input er et tall
    if (!saniterNummer(fodselsNr)) {
        return false
    }

    return true;

}




