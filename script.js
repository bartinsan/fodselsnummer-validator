// Dette er et Script som tester og validerer Norske fødselsnummer.
// Martin Sandvik


function saniterNummer(nummerStreng) {
    if (nummerStreng.length !== 11) {
        return false;
    }

    if (isNaN(nummerStreng)) {
        return false;
    }
    return true;
}

function splittOgSjekkIndividnummer(fodselsNrStreng) {
    // Splitter opp fødselsnummer
    let dag = fodselsNrStreng.substr(0,2); // Dag
    let mnd = fodselsNrStreng.substr(2,2); // Måned
    let ar = fodselsNrStreng.substr(4,2);  // År
    let arInt = parseInt(ar);                 // År som integer
    let id = fodselsNrStreng.substr(6,3);

    // Kontrollerer individnummer og år opp mot inndeling
    if (id > 0 && id <= 499) {                                   // IndividNr 0-499 (1900-1999)

        return true;

    } else if (id >= 500 && id <= 749 && ar >= 54 && ar <= 99) { // IndividNr 500-749 (1854-1899)

        return true;

    } else if (id >= 900 && id <= 999 && ar >= 40 && ar <= 99) { // IndividNr 900-999 (1940-1999)

        return true;

    } else if (id >= 500 && id <= 999 && ar >= 0o0 && ar <= 39) { // IndividNr 500-999 (2000-2039)

        arInt += 2000;

        let fodselsDato = new Date(arInt, mnd-1, dag);
        fodselsDato.setHours(0,0,0,0,);
        let dagensDato = new Date();
        dagensDato.setHours(0,0,0,0);

        // Sjekker om fødselsdato er mindre eller lik dagens dato.
        return fodselsDato.valueOf() <= dagensDato.valueOf();

    } else {

        return false;
    }
}

function validerFodselsnummer(fodselsNr) {

    // Sjekker lengde og om input er et tall
    if (!saniterNummer(fodselsNr)) {
        return false
    }

    // Splitter og sjekker individnummer
    if (!splittOgSjekkIndividnummer(fodselsNr)) {
        return false
    }

    return true;

}

if (typeof exports !== 'undefined') {
    exports.saniterNummer = saniterNummer;
    exports.splittOgSjekkIndividnummer = splittOgSjekkIndividnummer;
}



