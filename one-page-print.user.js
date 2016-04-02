// ==UserScript==
// @name         BowlingPortalen - One page print
// @namespace    https://github.com/oizo/bowlingportalen/
// @downloadURL  https://github.com/oizo/bowlingportalen/raw/master/one-page-print.user.js
// @version      0.1
// @description  Make all the printable league game tables from BowlingPortalen fit a standard A4 paper
// @author       Danny Hvam
// @match        http://bowlingportalen.dk/DBwF/HoldTurnering/UdskrivHoldkamp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML += ".printpage .matchresultschema .toprow, .printpage .matchresultschema .totalsrow, .printpage .matchresultschema .pointsrow {";
    style.innerHTML += "	height: 5mm;";
    style.innerHTML += "}";
    style.innerHTML += ".printpage .matchresultschema .printplayer div, .printpage .matchresultschema .printplayer5 div {";
    style.innerHTML += "	padding-top: 0mm !important;";
    style.innerHTML += "	height: 5mm !important;";
    style.innerHTML += "}";
    head.appendChild(style);

})();
