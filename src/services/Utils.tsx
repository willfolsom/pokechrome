export function getCurrentTab(callback: any) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      callback(tabs[0]);
    }
  );
}

export function setCurrentIcon(icon: string) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var canvasContext = canvas.getContext("2d");
    canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext?.drawImage(img, 0, 0, canvas.width, canvas.height);
    var id = canvasContext?.getImageData(0, 0, canvas.width, canvas.height);
    chrome.browserAction.setIcon({ imageData: id });
  };
  img.src = icon;
}
