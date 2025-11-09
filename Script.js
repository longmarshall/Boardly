fetch('https://www.thesportsdb.com/api/v1/json/123/livescore.php')
  .then(res => res.json())
  .then(data => {
    const scores = data.events;
    const container = document.getElementById('live-scores');
    container.innerHTML = ''; // Clear old scores

    scores.forEach(event => {
      const div = document.createElement('div');
      div.className = 'score-card';
      div.innerHTML = `
        <h3>${event.strEvent}</h3>
        <p>${event.strHomeTeam} ${event.intHomeScore} - ${event.intAwayScore} ${event.strAwayTeam}</p>
        <button onclick="connectToBoardly('${event.strHomeTeam}', '${event.intHomeScore}', '${event.strAwayTeam}', '${event.intAwayScore}')">
          Send to Scoreboard
        </button>
      `;
      container.appendChild(div);
    });
  });

