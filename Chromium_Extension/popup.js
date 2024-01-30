const scriptUrl = 'https://raw.githubusercontent.com/tekshteint/Adblock-Blocker-Blocker/main/Adblock-Blocker-Blocker.user.js';

// Get the extension version from manifest
const extensionVersion = chrome.runtime.getManifest().version;

fetch(scriptUrl)
    .then(response => response.text())
    .then(data => {
        const match = data.match(/@version\s+(\d+\.\d+)/);
        if (match) {
            const latestVersion = parseFloat(match[1]);
            document.querySelector('.footer').innerText = `Extension Version: ${extensionVersion}\nLatest Version: ${latestVersion}`;
        }
    })
    .catch(error => console.error('Error fetching version:', error));

document.addEventListener('DOMContentLoaded', function () {
    const debugButton = document.getElementById('debugButton');

    // Initialize debug state
    let debugEnabled = localStorage.getItem('debugEnabled') === 'true';

    updateDebugButtonState();

    debugButton.addEventListener('click', function () {
        debugEnabled = !debugEnabled;
        localStorage.setItem('debugEnabled', debugEnabled);
        updateDebugButtonState();
    });

    function updateDebugButtonState() {
        if (debugEnabled) {
            console.log("ABB: Debug Enabled");
            debugButton.innerText = 'Disable Debug';
            
        } else {
            console.log("ABB: Debug Disabled");
            debugButton.innerText = 'Enable Debug';
        }
    }
});
