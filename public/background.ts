var pokedexIdMax = 151;

chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, function(tab){
        chrome.runtime.sendMessage({salutations: tab.url});
        updateIconFromUrl(tab.url);
    });
});

function updateIconFromUrl(url) {
    // Simple hash to get Pokemon ID from URL
    var hash = 0;
    for (var i = 0; i < url.length; i++) {
        hash += url.charCodeAt(i);
    }
    var encountered = hash % pokedexIdMax;

    // Fetch the path to the PNG of the Pokemon
    fetch('https://pokeapi.co/api/v2/pokemon/' + `${encountered}`)
            .then(res => res.json())
            .then(res => setCurrentIcon(res.sprites.front_default));
}

function setCurrentIcon(icon) {
    // Create new image that allows cross origin and set source to the PNG path
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height
        var canvasContext = canvas.getContext('2d');
        canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext?.drawImage(img, 0, 0, canvas.width, canvas.height);
        var id = canvasContext?.getImageData(0, 0, canvas.width, canvas.height);
        chrome.browserAction.setIcon({imageData: id});
    };
    img.src = icon;
}
