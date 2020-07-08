const tba = new blueAllianceApiHelper();

async function fetchEndgameAverage(teamNumber, eventKey) {
  const teamKey = "frc" + teamNumber;
  const matches = await tba.get("/team/" + teamKey + "/event/" + eventKey + "/matches");

  let totalEndgamePoints = 0;
  let totalMatches = 0;
  for (let i = 0; i < matches.length; i++) {
    match = matches[i];
    if (match.comp_level === "qm") {
      let endgameAction = "";

      let redStationNum = match.alliances.red.team_keys.indexOf(teamKey) + 1;
      if (redStationNum !== 0) {
        endgameAction = match.score_breakdown.red["endgameRobot"+redStationNum];
      }
      else {
        let blueStationNum = match.alliances.blue.team_keys.indexOf(teamKey) + 1;
        endgameAction = match.score_breakdown.blue["endgameRobot"+blueStationNum];
      }

      if (endgameAction === "Hang") {
        totalEndgamePoints += 25;
      }
      else if (endgameAction === "Park") {
        totalEndgamePoints += 5;
      }

      totalMatches++;
    }
  }

  if (totalMatches > 0) {
    return totalEndgamePoints / totalMatches;
  }

  return "No matches played";
}

async function fetch2020EndgameAverages(teamNumber) {
  const teamKey = "frc" + teamNumber;
  const events = await tba.get("/team/" + teamKey + "/events/2020/simple");

  let averages = [];
  for(let i = 0; i < events.length; i++) {
    const event = events[i];
    const eventName = event.name;
    const eventKey = event.key;

    const endgameAverage = fetchEndgameAverage(teamNumber, eventKey);

    averages[i] = {eventName: eventName, average: endgameAverage};
  }

  for (let i = 0; i < averages.length; i++) {
    averages[i].average = await averages[i].average;
  }

  return averages;
}
