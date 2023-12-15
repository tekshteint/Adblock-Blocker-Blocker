// ==UserScript==
// @name         Adblock Blocker Blocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Block those pesky adblock blockers!
// @author       tekshteint
// @icon         https://github.com/tekshteint/Adblock-Blocker-Blocker/blob/main/icon.png?raw=true
// @match http://*/*
// @match https://*/*
// ==/UserScript==

(function() {
    'use strict';

    // Checks for updates
    const updateCheck = true;

    // Enable debug messages into the console
    const debugMessages = false;

    // Varables used for updater
    let hasIgnoredUpdate = false;

    if (updateCheck) checkUpdate();
    
    // Observer configuration
    const observerConfig = {
        childList: true, // Watch for changes in the children of the target node
        subtree: true   // Watch for changes in the entire subtree
    };

    // Handle mutations in DOM and recall
    function handleMutations(mutationsList, observer) {
        murderBlockers();
    }

    // Create a MutationObserver with the callback and configuration
    const observer = new MutationObserver(handleMutations);

    // Start observing document
    observer.observe(document, observerConfig);


    function murderBlockers(){
        //Allow scrolling after nuking adblock blocker
        document.documentElement.style.overflow = '';
        document.body.style.cssText = "visible !important";

        // Adblock blocker div class names
        const divClasses = [];
        const divIDs = [];
        divClasses.push("dgEhJe6g", "fEy1Z2XT",)
        divIDs.push("anuUDQLF",)

         // Remove divs based on class names
        divClasses.forEach(function(className){
            var elements = document.querySelectorAll('.' + className);
            elements.forEach(function(element){
                element.remove();
                if (debugMessages){
                    console.log("ABN: Deleted Class " + className)
                }
            })
        })

        // Remove divs based on IDs
        divIDs.forEach(function(idName){
            var elements = document.querySelectorAll('#' + idName);
            elements.forEach(function(element){
                element.remove();
                if (debugMessages){
                    console.log("ABN: Deleted ID " + idName)
                }
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