function sendMessage(message) {
  return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, function(response) {resolve(response);});
  });
}
