(function() {
    'use strict';

    // Checks for updates
    const updateCheck = true;

    // Enable debug messages into the console
    const debugEnabled = localStorage.getItem('debugEnabled') === 'true';
    const debugMessages = debugEnabled;

    // Varables used for updater
    let hasIgnoredUpdate = false;

    if (updateCheck) checkUpdate();

    // Observer configuration
    const observerConfig = {
        childList: true, // Watch for changes in the children of the target node
        subtree: true   // Watch for changes in the entire subtree
    };

    // Log debug messages to console for extension version
    function logDebugMessage(message) {
        const debugEnabled = localStorage.getItem('debugEnabled') === 'true';
        if (debugEnabled) {
            chrome.runtime.sendMessage({ action: 'logDebugMessage', message: message });
        }
    }

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
        divClasses.push("dgEhJe6g", "fEy1Z2XT", "bOvWNQ", "dgEhJe6g", "fEy1Z2XT")
        divIDs.push("anuUDQLF","ignielAdBlock")

         // Remove divs based on class names
        divClasses.forEach(function(className){
            var elements = document.querySelectorAll('.' + className);
            elements.forEach(function(element){
                element.remove();
                if (debugMessages){
                    logDebugMessage("ABB: Deleted Class " + className)
                }
            })
        })

        // Remove divs based on IDs
        divIDs.forEach(function(idName){
            var elements = document.querySelectorAll('#' + idName);
            elements.forEach(function(element){
                element.remove();
                if (debugMessages){
                    logDebugMessage("ABB: Deleted ID " + idName)
                }
            })
        })

    }


    function checkUpdate(){
        if (hasIgnoredUpdate){
            return;
        }
        chrome.runtime.sendMessage({ action: 'checkUpdate' });
    }
})();