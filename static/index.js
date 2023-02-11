function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

const search = () => {

    const player = document.getElementById('player_id').value;
    const country = document.getElementById('country_id').value;
    const league = document.getElementById('league_id').value;
    const club = document.getElementById('club_id').value;
    const jersey_num = document.getElementById('jersey_id').value;

    const table = document.getElementById('table');

    table.innerHTML = '';

    fetch('http://localhost:3000/api/search', {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ player: player, country: country, league: league, club: club, jersey_num: jersey_num })
    })
        .then(res => res.json())
        .then(data => {



            const row = document.createElement('tr');
            table.appendChild(row);

            row.innerHTML = ` <td>Player</td> 
                                    <td>Jersey Number</td> 
                                    <td>Country</td> 
                                    <td>Club</td> 
                                    <td>League</td>`


            for (var i = 0; i < data.length; i++) {


                table.innerHTML += `<tr> 
                                        <td><span onclick={}>${data[i].Player_fName}</span></td> 
                                        <td><span>${data[i].Player_JerseyNum}</span></td> 
                                        <td><span>${data[i].Country_Name}</span></td> 
                                        <td><span>${data[i].Club_Name}</span></td> 
                                        <td><span>${data[i].League_Name}</span></td> 
                                    </tr> `

            }
        })
}

const projection_defender = () => {

    const value = document.getElementById('player_defender').value;
    fetch('http://localhost:3000/api/defender/' + value, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            const table = document.getElementById('table-1');

            for (var i = 0; i < data.length; i++) {

                if (data[i].age <= 26) {
                    tackles_under26 = data[i].Tackles * 1.5
                    aerial_won_under26 = data[i].AerialDuelsWon * 1.5
                    interception_under26 = data[i].Interceptions * 1.5
                    table.innerHTML = ` <tr> <th></th><th>Average</th> <th>Projection</th> </tr>
                                            <tr> <td>Tackles</td><td>${data[i].Tackles}</td> <td>${tackles_under26}</td> </tr>
                                            <tr> <td>Aerials Duel Won</td><td>${data[i].AerialDuelsWon}</td> <td>${aerial_won_under26}</td> </tr>
                                            <tr> <td>Interceptions</td><td>${data[i].Interceptions}</td> <td>${interception_under26}</td> </tr>`

                } else if (data[i].age > 26 && data[i].age < 28) {
                    table.innerHTML = ` <tr> <th>Average</th> <th>Projection</th> </tr>
                                        <tr> <td>${data[i].Tackles}</td> <td>${data[i].Tackles}</td> </tr>
                                        <tr> <td>${data[i].AerialDuelsWon}</td> <td>${data[i].AerialDuelsWon}</td> </tr>
                                        <tr> <td>${data[i].PassesCompleted}</td> <td>${data[i].Interceptions}</td> </tr>`
                } else if (data[i].age >= 28) {
                    tackles_over28 = data[i].Tackles / 1.5
                    aerial_won_over28 = data[i].AerialDuelsWon / 1.5
                    interception_over28 = data[i].Interceptions / 1.5

                    table.innerHTML = ` <tr> <th>Average</th> <th>Projection</th> </tr>
                                        <tr> <td>${data[i].Tackles}</td> <td>${tackles_over28}</td> </tr>
                                        <tr> <td>${data[i].AerialDuelsWon}</td> <td>${aerial_won_over28}</td> </tr>
                                        <tr> <td>${data[i].Interceptions}</td> <td>${interception_over28}</td> </tr>`
                }
            }

        })
}

const projection_midfield = () => {

    const value = document.getElementById('player_midfielder').value;
    fetch('http://localhost:3000/api/midfielder/' + value, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            const table = document.getElementById('table-1');

            for (var i = 0; i < data.length; i++) {

                if (data[i].age <= 26) {
                    assist_under26 = data[i].Assists * 1.5
                    passes_atmp_under26 = data[i].PassesAttempted * 1.5
                    assist_comp_under26 = data[i].PassesCompleted * 1.5
                    assist_throughball_under26 = data[i].ThroughBalls * 1.5

                    table.innerHTML = ` <tr> <th></th><th>Average</th> <th>Projection</th> </tr>
                                            <tr> <td>Assists</td><td>${data[i].Assists}</td> <td>${assist_under26}</td> </tr>
                                            <tr> <td>Passes Attempted</td><td>${data[i].PassesAttempted}</td> <td>${passes_atmp_under26}</td> </tr>
                                            <tr> <td>Passes Completed</td><td>${data[i].PassesCompleted}</td> <td>${assist_comp_under26}</td> </tr>
                                            <tr> <td>Through Balls</td><td>${data[i].ThroughBalls}</td> <td>${assist_throughball_under26}</td> </tr> `

                } else if (data[i].age > 26 && data[i].age < 28) {
                    table.innerHTML = ` <tr> <th>Average</th> <th>Projection</th> </tr>
                                            <tr> <td>${data[i].Assists}</td> <td>${data[i].Assists}</td> </tr>
                                            <tr> <td>${data[i].PassesAttempted}</td> <td>${data[i].PassesAttempted}</td> </tr>
                                            <tr> <td>${data[i].PassesCompleted}</td> <td>${data[i].PassesCompleted}</td> </tr>
                                            <tr> <td>${data[i].ThroughBalls}</td> <td>${data[i].ThroughBalls}</td> </tr> `
                } else if (data[i].age >= 28) {
                    assist_over28 = data[i].Assists / 1.5
                    passes_atmp_over28 = data[i].PassesAttempted / 1.5
                    assist_comp_over28 = data[i].PassesCompleted / 1.5
                    assist_throughball_over28 = data[i].ThroughBalls / 1.5

                    table.innerHTML = ` <tr> <th>Average</th> <th>Projection</th> </tr>
                                            <tr> <td>${data[i].Assists}</td> <td>${assist_over28}</td> </tr>
                                            <tr> <td>${data[i].PassesAttempted}</td> <td>${passes_atmp_over28}</td> </tr>
                                            <tr> <td>${data[i].PassesCompleted}</td> <td>${assist_comp_over28}</td> </tr>
                                            <tr> <td>${data[i].ThroughBalls}</td> <td>${assist_throughball_over28}</td> </tr> `
                }
            }

        })
}

const projection_forward = () => {

    const value = document.getElementById('player_forward').value;
    fetch('http://localhost:3000/api/forward/' + value, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            const table = document.getElementById('table-1');

            for (var i = 0; i < data.length; i++) {

                if (data[i].age <= 26) {
                    sot_under26 = data[i].ShotsOnTarget * 1.5
                    goals_under26 = data[i].Goals * 1.5
                    dribbles_comp_under26 = data[i].DribblesCompleted * 1.5
                    offside_under26 = data[i].OffSidesPerGame * 1.5

                    table.innerHTML = ` <tr> <th></th><th>Average</th> <th>Projection</th> </tr>
                                        <tr> <td>ShotsOnTarget</td><td>${data[i].ShotsOnTarget}</td> <td>${sot_under26}</td> </tr>
                                        <tr> <td>Goals</td><td>${data[i].Goals}</td> <td>${goals_under26}</td> </tr>
                                        <tr> <td>DribblesCompleted</td><td>${data[i].DribblesCompleted}</td> <td>${dribbles_comp_under26}</td> </tr>
                                        <tr> <td>OffSidesPerGame</td><td>${data[i].OffSidesPerGame}</td> <td>${offside_under26}</td> </tr> `

                } else if (data[i].age > 26 && data[i].age < 28) {
                    table.innerHTML = ` <tr> <th>Average</th> <th>Projection</th> </tr>
                                        <tr> <td>${data[i].ShotsOnTarget}</td> <td>${data[i].ShotsOnTarget}</td> </tr>
                                        <tr> <td>${data[i].Goals}</td> <td>${data[i].Goals}</td> </tr>
                                        <tr> <td>${data[i].DribblesCompleted}</td> <td>${data[i].DribblesCompleted}</td> </tr>
                                        <tr> <td>${data[i].OffSidesPerGame}</td> <td>${data[i].OffSidesPerGame}</td> </tr> `
                } else if (data[i].age >= 28) {
                    sot_over28 = data[i].ShotsOnTarget / 1.5
                    goals_over28 = data[i].Goals / 1.5
                    dribbles_comp_over28 = data[i].DribblesCompleted / 1.5
                    offside_over28 = data[i].OffSidesPerGame / 1.5

                    table.innerHTML = ` <tr> <th>Average</th> <th>Projection</th> </tr>
                                        <tr> <td>${data[i].ShotsOnTarget}</td> <td>${sot_over28}</td> </tr>
                                        <tr> <td>${data[i].Goals}</td> <td>${goals_over28}</td> </tr>
                                        <tr> <td>${data[i].DribblesCompleted}</td> <td>${dribbles_comp_over28}</td> </tr>
                                        <tr> <td>${data[i].OffSidesPerGame}</td> <td>${offside_over28}</td> </tr> `
                }
            }
        })
}

const projection_goalie = () => {

    const value = document.getElementById('player_goalie').value;
    fetch('http://localhost:3000/api/goalie/' + value, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            const table = document.getElementById('table-1');

            for (var i = 0; i < data.length; i++) {

                if (data[i].age <= 26) {
                    cs_under26 = data[i].CleanSheets * 1.5
                    goals_con_under26 = data[i].GoalsConceded * 1.5
                    save_under26 = data[i].SavesMade * 1.5

                    table.innerHTML = ` <tr> <th></th> <th>Average</th> <th>Projection</th> </tr>
                                        <tr> <td>Clean Sheets</td><td>${data[i].CleanSheets}</td> <td>${cs_under26}</td> </tr>
                                        <tr> <td>Goals Conceded</td><td>${data[i].GoalsConceded}</td> <td>${goals_con_under26}</td> </tr>
                                        <tr> <td>Saves Made</td><td>${data[i].SavesMade}</td> <td>${save_under26}</td> </tr> `

                } else if (data[i].age > 26 && data[i].age < 28) {
                    table.innerHTML = ` <tr> <th>Average</th> <th>Projection</th> </tr>
                                        <tr> <td>${data[i].CleanSheets}</td> <td>${data[i].CleanSheets}</td> </tr>
                                        <tr> <td>${data[i].GoalsConceded}</td> <td>${data[i].GoalsConceded}</td> </tr>
                                        <tr> <td>${data[i].SavesMade}</td> <td>${data[i].SavesMade}</td> </tr> `
                } else if (data[i].age >= 28) {
                    cs_over28 = data[i].CleanSheets / 1.5
                    goals_con_over28 = data[i].GoalsConceded / 1.5
                    saves_over28 = data[i].SavesMade / 1.5

                    table.innerHTML = ` <tr> <th>Average</th> <th>Projection</th> </tr>
                                        <tr> <td>${data[i].CleanSheets}</td> <td>${cs_over28}</td> </tr>
                                        <tr> <td>${data[i].GoalsConceded}</td> <td>${goals_con_over28}</td> </tr>
                                        <tr> <td>${data[i].SavesMade}</td> <td>${saves_over28}</td> </tr> `
                }

            }
        })
}

const topPlayer_goalie = () => {

    const value = document.getElementById('input-1').value;
    const table = document.getElementById('table-5');

    table.innerHTML = '';

    const row = document.createElement('tr');
    table.appendChild(row);

    row.innerHTML = ` <td>Player</td> 
                        <td>Most Saves Made</td>`


    fetch('http://localhost:3000/api/forward/leaderboard/' + value, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then((data) => {

            for (var i = 0; i < data.length; i++) {
                table.innerHTML += ` 
                                    <tr>
                                    <td>${data[i].player}</td>
                                    <td>${data[i].SavesMade}</td>  
                                    </tr>`
            }

        })

}

const topPlayer_defender = () => {

    const value = document.getElementById('input-2').value;
    const table = document.getElementById('table-5');

    table.innerHTML = '';

    const row = document.createElement('tr');
    table.appendChild(row);

    row.innerHTML = ` <td>Player</td> 
                        <td>Most Tackles</td>`


    fetch('http://localhost:3000/api/forward/leaderboard/' + value, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then((data) => {

            for (var i = 0; i < data.length; i++) {
                table.innerHTML += ` 
                                    <tr>
                                    <td>${data[i].player}</td>
                                    <td>${data[i].Tackles}</td>  
                                    </tr>`
            }

        })
}

const topPlayer_midfielder = () => {

    const value = document.getElementById('input-3').value;
    const table = document.getElementById('table-5');

    table.innerHTML = '';

    const row = document.createElement('tr');
    table.appendChild(row);

    row.innerHTML = ` <td>Player</td> 
                        <td>Most Assists</td>`


    fetch('http://localhost:3000/api/forward/leaderboard/' + value, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then((data) => {

            for (var i = 0; i < data.length; i++) {
                table.innerHTML += ` 
                                    <tr>
                                    <td>${data[i].player}</td>
                                    <td>${data[i].Assists}</td>  
                                    </tr>`
            }

        })

}

const topPlayer_forward = () => {

    const value = document.getElementById('input-4').value;
    const table = document.getElementById('table-5');

    table.innerHTML = '';

    const row = document.createElement('tr');
    table.appendChild(row);

    row.innerHTML = ` <td>Player</td> 
                        <td>Most Goals</td>`


    fetch('http://localhost:3000/api/forward/leaderboard/' + value, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then((data) => {


            for (var i = 0; i < data.length; i++) {
                table.innerHTML += ` 
                                    <tr>
                                    <td>${data[i].player}</td>
                                    <td>${data[i].Goals}</td>  
                                    </tr>`
            }

        })
}

const player_rating = () => {

    const player = document.getElementById('player_create').value;
    const position = document.getElementById('position_id').value;
    const table = document.getElementById('table-6');

    fetch('http://localhost:3000/api/create_team', {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ player_create: player, position_id: position })
    })
        .then(res => res.json())
        .then((data) => {

            for (var i = 0; i < data.length; i++) {

                if (position === "Defender") {

                    table.innerHTML += ` 
                        <tr>
                        <td>Player: ${data[i].player}</td> 
                        <td>defRating: ${data[i].defRating}</td> 
                        </tr>
                        `

                } else if (position === "Midfielder") {

                    table.innerHTML += ` 
                        <tr>
                        <td>Player: ${data[i].player}</td> 
                        <td>midRating: ${data[i].midRating}</td>  
                        </tr>
                        `

                } else if (position === "Forward") {

                    table.innerHTML += ` 
                        <tr>
                        <td>Player: ${data[i].player}</td> 
                        <td>forRating: ${data[i].forRating}</td>    
                        </tr>
                        `

                } else {

                    table.innerHTML += ` 
                        <tr>
                        <td>Player: ${data[i].player}</td> 
                        <td>goalierating: ${data[i].goalierating}</td>
                        </tr>
                        `
                }

                console.log(output)
            }
        })
}

