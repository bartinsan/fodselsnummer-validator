let assert = require("assert");
let mocha = require("mocha");
const describe = mocha.describe;

let script = require('../script');

describe('-- Testing av logikk i script.js for å validere fødselsnummer --', function () {


    describe('saniterNummer_tester:', function() {

        describe('Fødselsnummer er ikke 11 siffer langt', function () {
            let testNummer = '111111111112';
            it('Bør returnere "false" når fødselsnummer ikke er 11 siffer langt', function () {
                assert.strictEqual(script.saniterNummer(testNummer), false);
            });
        });

        describe('Fødselsnummer er 11 karakterer langt, men er ikke et nummer.', function () {
            let testNummer = '1111111111a';
            it ('Bør returnere "false" når fødselsnummer er 11 karakterer langt', function () {
                assert.strictEqual(script.saniterNummer(testNummer), false);
            });
        });

        describe('Fødselsnummer er et nummer og er 11 siffer langt', function () {
            let testNummer = '11111111111';
            it('Bør returnere "false" når fødselsnummer er et nummer og er 11 siffer langt.', function () {
                assert.strictEqual(script.saniterNummer(testNummer), true);
            });
        });

    });

    describe('splittOgSjekkIndividnummer_tester', function () {

        describe('Individnummer er større enn 0 og mindre enn eller lik 499', function () {
            let testNummer = '11111122211';
            it('Bør returnere "true" når individnummer er større en 0 og mindre enn eller lik 499', function () {
                assert.strictEqual(script.splittOgSjekkIndividnummer(testNummer), true);
            });
        });

        describe('Individnummer er større enn eller lik 500 og mindre enn eller lik 749,' +
            ' og fødselsår er større enn eller lik 54 og mindre enn eller lik 99.', function () {
            let testNummer = '11116670011';
            it('Bør returnere "true" når individnummer er større enn eller lik 500 og mindre enn eller lik 749, ' +
                'og fødselsår er større enn eller lik 54 og mindre enn eller lik 99', function () {
                assert.strictEqual(script.splittOgSjekkIndividnummer(testNummer), true);
            });
        });

        describe('Individnummer er større enn eller lik 900 og mindre eller lik 999, ' +
            'og fødselsår er større enn eller lik 40 og mindre enn eller lik 99.', function () {
            let testNummer = '11116695011';
            it('Bør returnere "true" når individnummer er større enn eller lik 900 og mindre eller lik 999, ' +
                'og fødselsår er større enn eller lik 40 og mindre enn eller lik 99.', function () {
                assert.strictEqual(script.splittOgSjekkIndividnummer(testNummer), true);
            });
        });

        describe('Individnummer er større enn eller lik 500 og mindre enn eller lik 999, ' +
            'og fødselsår er større enn eller lik 00 og mindre enn eller lik 39, ' +
            'og fødselsdato er ikke høyere enn dagens dato.', function () {
            let testNummer = '0105205011';
            it('Bør returnere "true" når individnummer er større enn eller lik 500 og mindre enn eller lik 999, ' +
                'og fødselsår er større enn eller lik 00 og mindre enn eller lik 39,' +
                ' og fødselsdato ikke høyere enn dagens dato.', function () {
                assert.strictEqual(script.splittOgSjekkIndividnummer(testNummer), true);
            });
        });

        describe('Individnummer er større enn eller lik 500 og mindre enn eller lik 999, og fødselsår er større enn eller lik 00 og mindre enn eller lik 39, ' +
            ' men fødselsdato er høyere enn dagens dato.', function () {

            let testDato = new Date();
            testDato.setDate(testDato.getDate()+1);
            let testDatoArray = testDato.toLocaleDateString('en-GB').split('/');
            let testDatoStreng = ('0' + testDatoArray[1]).slice(-2) + ('0' + testDatoArray[0]).slice(-2) + testDatoArray[2].slice(-2);

            let testNummer = testDatoStreng  + '66611';

            it('Bør returnere "false" når fødselsdato er større enn dagens dato', function () {
                assert.strictEqual(script.splittOgSjekkIndividnummer(testNummer), false);
            });

        });

        describe('Individnummeret er større enn eller lik 500 og mindre enn eller lik 749, men fødselsår er mindre enn 54', function () {
            let testNummer = '01012152011';
            it('Bør returnere "false" når individnummer er større enn eller lik 500 og mindre enn eller lik 749, men fødselsår er mindre enn 54', function () {
                assert.strictEqual(script.splittOgSjekkIndividnummer(testNummer), false);
            });
        });

        describe('Individnummeret er større enn eller lik 900 og mindre enn eller lik 999, men fødselsår er mindre enn 40', function () {
            let testNummer = '01012152011';
            it('Bør returnere "false" når individnummer er større enn eller lik 500 og mindre enn eller lik 749, men fødselsår er mindre enn 54', function () {
                assert.strictEqual(script.splittOgSjekkIndividnummer(testNummer), false);
            });
        });

    });

});

