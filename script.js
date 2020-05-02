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

function validerKontrollSiffer(fodselsNrStreng) {
    let numberArray = (""+fodselsNrStreng).split("").map(Number);

    let d1 = numberArray[0],
        d2 = numberArray[1],
        m1 = numberArray[2],
        m2 = numberArray[3],
        a1 = numberArray[4],
        a2 = numberArray[5],
        i1 = numberArray[6],
        i2 = numberArray[7],
        i3 = numberArray[8],
        k1 = numberArray[9],
        k2 = numberArray[10];


    // Kontrollerer sjekksum for k1
    let sjekksum1 =
        11 - (((3*d1) + (7*d2) + (6*m1) + m2 + (8*a1) + (9*a2) + (4*i1) + (5*i2) + (2*i3)) % 11);

    if (sjekksum1 === 11) {
        sjekksum1 = 0;
    }
    if (sjekksum1 === 10) {
        return false;
    }
    if (sjekksum1 !== k1) {
        return false;
    }

    // Kontrollerer sjekksum for k2
    let sjekksum2 =
        11 - (((5*d1) + (4*d2) + (3*m1) + (2*m2) + (7*a1) + (6*a2) + (5*i1) + (4*i2) + (3*i3) + (2*sjekksum1)) % 11);
    if (sjekksum2 === 11) {
        sjekksum2 = 0;
    }
    if (sjekksum2 === 10) {
        return false;
    }
    return sjekksum2 === k2;


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

    return validerKontrollSiffer(fodselsNr);


}

if (typeof exports !== 'undefined') {
    exports.saniterNummer = saniterNummer;
    exports.splittOgSjekkIndividnummer = splittOgSjekkIndividnummer;
    exports.validerKontrollsiffer = validerKontrollSiffer;
}



