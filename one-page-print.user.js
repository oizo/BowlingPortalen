// ==UserScript==
// @name         BowlingPortalen - One page print
// @namespace    https://github.com/oizo/bowlingportalen/
// @downloadURL  https://github.com/oizo/bowlingportalen/raw/master/one-page-print.user.js
// @version      0.1
// @description  Make all the printable league game tables from BowlingPortalen fit a standard A4 paper
// @author       Danny Hvam
// @match        http://bowlingportalen.dk/DBwF/HoldTurnering/UdskrivHoldkamp/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

function preventOnLoad() {
    this.fired  = this.fired || false;
    if (document.readyState != "uninitialized" && document.readyState != "loading" && !this.fired) {
        this.fired = true;
        document.body.onload  = function(){ /* empty to prevent auto print of page */ };
    }
}

addJS_Node(null, null, preventOnLoad);

function addJS_Node(text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function fixPrintTurnamentGame() {

    // make all player name fields editable
    var printplayer = document.getElementsByClassName('printplayer');
    if (printplayer) {
        for (i = 0; i < printplayer.length; i++) {
            printplayer[i].setAttribute("contenteditable", "true");
        }
    }

    var moreThanSixPlayers = printplayer && printplayer.length > 10;

    // minimize the match info header
    var matchinfo = document.getElementsByClassName('matchinfo')[0];
    if (matchinfo && moreThanSixPlayers) {
        matchinfo.innerHTML = replaceAll(matchinfo.innerHTML,"<br>", ": ");
    }

    // update the styling to make the table fit a A4 sheet, print friendly
    var head = document.getElementsByTagName('head')[0];
    if (head) {
        var style = document.createElement('style');
        style.type = 'text/css';

        style.innerHTML += ".printpage .matchresult .resultbox { width: 15mm !important; height: 5mm !important; }";

        // if there's more than 4 series played, we need to fix the width of the scores
        var toprow = document.getElementsByClassName('toprow')[0];
        if (toprow) {
            var series = toprow.childElementCount - 3;
            if (series > 4) {
                style.innerHTML += ".printpage .matchresultschema .result, .printpage .matchresultschema .totalscol { width: 11mm; padding: 1mm; margin: 0; text-align: right; }";
            }
        }
        
        if (moreThanSixPlayers) {
            // If theres room for 10 player names, we'll have to make some adjustments
            style.innerHTML += ".printpage .matchresultschema .toprow, .printpage .matchresultschema .totalsrow, .printpage .matchresultschema .pointsrow { height: 5mm; }";
            style.innerHTML += ".printpage .matchresultschema .printplayer div, .printpage .matchresultschema .printplayer5 div { padding-top: 0mm !important; height: 6mm !important; }";
            style.innerHTML += ".printpage .matchresult { margin-bottom: 1mm;}";
            style.innerHTML += ".printpage .matchinfo { margin-bottom: 1mm; border-collapse: collapse; width: 100%; }";
        }

        head.appendChild(style);
    }

}

(function() {
    'use strict';
    fixPrintTurnamentGame();
})();
