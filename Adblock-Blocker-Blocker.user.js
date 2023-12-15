// ==UserScript==
// @name         Adblock Blocker Blocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block those pesky adblock blockers!
// @author       tekshteint
// @icon         https://github.com/tekshteint/Adblock-Blocker-Blocker/blob/main/icon.png?raw=true
// ==/UserScript==

(function() {
    'use strict';

    // Checks for updates
    const updateCheck = false;

    // Enable debug messages into the console
    const debugMessages = true;

    // Varables used for updater
    let hasIgnoredUpdate = false;

    if (updateCheck) checkUpdate();


    function murderBlockers(){
        // Adblock blocker div class names
        const divClasses = [];
        const divIDs = [];
        divClasses.push("dgEhJe6g", " fEy1Z2XT  ",)
        divIDs.push("anuUDQLF",)

        // Remove divs based on class names
        divClasses.forEach(function(className){
            var elements = document.querySelectorAll('.' + className);
            elements.forEach(function(element){
                element.remove();
            })
        })

        // Remove divs based on IDs
        divIDs.forEach(function(idName){
            var elements = document.querySelectorAll('#' + idName);
            elements.forEach(function(element){
                element.remove();
            })
        })

    }


    function checkUpdate(){
        if (hasIgnoredUpdate){
            return;
        }

        const scriptUrl = '';

        fetch(scriptUrl)
        .then(response => response.text())
        .then(data => {
            // Extract version from the script on GitHub
            const match = data.match(/@version\s+(\d+\.\d+)/);
            if (match) {
                const githubVersion = parseFloat(match[1]);
                const currentVersion = parseFloat(GM_info.script.version);

                if (githubVersion > currentVersion) {
                    console.log('Adblock Blocker Blocker: A new version is available. Please update your script.');

                    var result = window.confirm("Adblock Blocker Blocker: A new version is available. Please update your script.");

                    if (result) {
                        window.location.replace(scriptUrl);
                    }

                } else {
                    console.log('Adblock Blocker Blocker: You have the latest version of the script.');
                }
            } else {
                console.error('Adblock Blocker Blocker: Unable to extract version from the GitHub script.');
            }
        })
        .catch(error => {
            hasIgnoredUpdate = true;
            console.error('Adblock Blocker Blocker: Error checking for updates:', error);
        });
        hasIgnoredUpdate = true;
    }






})();