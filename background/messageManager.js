//Ignore this function
function customOnMessageAddListener(callback) {
    chrome.runtime.onMessage.addListener((...args) => {
      // We don't have `arguments` in an arrow function,
      // but we can get all of them in an array using Rest Parameters.
      // See: https://www.smashingmagazine.com/2016/07/how-to-use-arguments-and-parameters-in-ecmascript-6/#rest-parameters

      callback.apply(null, args);

      return true;
    });
}

//////////////////// CUSTOM MESSAGE HANDLERS ////////////////////
customOnMessageAddListener(async (request, sender, sendResponse) => {
    if (request.action == 'calcEndgameAverage') {

      let averages = [{eventName:"No event data available", average: ""}];

      try {
        averages = await fetch2020EndgameAverages(request.teamNumber)
      }
      catch(e){}
      finally {
        sendResponse(averages);
      }
    }

});
