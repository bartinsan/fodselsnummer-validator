let assert = require("assert");
let mocha = require("mocha");
const describe = mocha.describe;

let testF = require('../script');

describe('-- Testing av logikk for å validere fødselsnummer --', function () {


    describe('saniterNummer_tester:', function() {

        describe('Fødselsnummer er ikke 11 siffer langt', function () {
            let testNummer = '111111111112';
            it('Bør returnere "false" når fødselsnummer ikke er 11 siffer langt', function () {
                assert.equal(testF.saniterNummer(testNummer), false);
            });
        });

        describe('Fødselsnummer er 11 karakterer langt, men er ikke et nummer.', function () {
            let testNummer = '1111111111a';
            it('Bør returnere "false" når fødselsnummer er 11 karakterer langt', function () {
                assert.equal(testF.saniterNummer(testNummer), false);
            });
        });

        describe('Fødselsnummer er et nummer og er 11 siffer langt', function () {
            let testNummer = '11111111111';
            it('Bør returnere "false" når fødselsnummer er et nummer og er 11 siffer langt.', function () {
                assert.equal(testF.saniterNummer(testNummer), true);
            });
        });

    });

});

