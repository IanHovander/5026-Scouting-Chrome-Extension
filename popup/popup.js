function sendMessage(message) {
  return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, function(response) {resolve(response);});
  });
}

async function fetchEndgameAverages() {
  const averages = await sendMessage({action: "calcEndgameAverage", teamNumber: $("#teamNumber").val()});

  $("#averagesDisplay").empty();
  for (let i = 0; i < averages.length; i++) {
      $("#averagesDisplay").append( '<div class="event"><div class="eventName">' + averages[i].eventName + ':</div> <div class="averageScore">' + averages[i].average + '</div></div>');
  }
}

$( document ).ready(function() {
    $("#endgamePointsButton").on("click", fetchEndgameAverages);
});
