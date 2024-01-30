chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'checkUpdate') {
        checkUpdate();
    } else if (request.action === 'logDebugMessage') {
        console.log("foo");
    }
});


function checkUpdate() {
    const scriptUrl = 'https://raw.githubusercontent.com/tekshteint/Adblock-Blocker-Blocker/main/Adblock-Blocker-Blocker.user.js';

    fetch(scriptUrl)
    .then(response => response.text())
    .then(data => {
        // Extract version from the script on GitHub
        const match = data.match(/@version\s+(\d+\.\d+)/);
        if (match) {
            const githubVersion = parseFloat(match[1]);

            if (githubVersion > currentVersion) {
                console.log('Adblock Blocker Blocker: A new version is available. Please update your script.');

                var result = window.confirm("Adblock Blocker Blocker: A new version is available. Please update your script.");

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