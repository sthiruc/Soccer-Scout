const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/search', (req, res) => {
    connection.query("SELECT Player_fName, Player_JerseyNum, Country_Name, Club_Name, League_Name FROM finaltable WHERE Player_fName = '" + req.body.player + "' OR Player_JerseyNum = '" + req.body.jersey_num + "' OR Country_Name = '" + req.body.country + "' OR Club_Name = '" + req.body.club + "' OR League_Name = '" + req.body.league + "' ",
        function (err, result) {
            if (err) throw err;
            res.send(result)
        });
});

app.get('/api/defender/:projection', (req, res) => {
    connection.query("SELECT player_ID, concat(player_fname, ' ', player_lname) AS player,DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), player_dob)), '%Y') + 0 AS age, AVG(Defender_AerialDuelsWon) AS AerialDuelsWon,AVG(Defender_Interceptions) AS Interceptions,AVG(Defender_Tackles) AS Tackles FROM finaldeftable WHERE concat(player_fname, ' ', player_lname) = '" + req.params.projection + "' GROUP BY player_ID, concat(player_fname, ' ', player_lname), DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),player_dob)), '%Y') + 0 ORDER BY player_ID",
        function (err, result) {
            if (err) throw err;
            res.send(result)
        });
});

app.get('/api/midfielder/:projection', (req, res) => {
    connection.query("SELECT player_ID, concat(player_fname, ' ', player_lname) AS player,DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), player_dob)), '%Y') + 0 AS age, AVG(Midfielder_Assists) AS Assists,AVG(Midfielder_passesattempted) AS PassesAttempted,AVG(midfielder_passescompleted) AS PassesCompleted,AVG(Midfielder_throughballs) AS ThroughBalls FROM finalmidtable WHERE concat(player_fname, ' ', player_lname) = '" + req.params.projection + "' GROUP BY player_ID, concat(player_fname, ' ', player_lname), DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),player_dob)), '%Y') + 0 ORDER BY player_ID",
        function (err, result) {
            if (err) throw err;
            res.send(result)
        });
});

app.get('/api/forward/:projection', (req, res) => {
    connection.query("SELECT player_ID, concat(player_fname, ' ', player_lname) AS player,DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), player_dob)), '%Y') + 0 AS age, AVG(Forward_DribblesCompleted) AS DribblesCompleted, AVG(Forward_Goals) AS Goals, AVG(Forward_OffSidesPerGame) AS OffSidesPerGame, AVG(Forward_ShotsOnTarget) AS ShotsOnTarget FROM finalfortable WHERE concat(player_fname, ' ', player_lname) = '" + req.params.projection + "' GROUP BY player_ID, concat(player_fname, ' ', player_lname), DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),player_dob)), '%Y') + 0 ORDER BY player_ID",
        function (err, result) {
            if (err) throw err;
            res.send(result)
        });
});

app.get('/api/goalie/:projection', (req, res) => {
    connection.query("SELECT player_ID, concat(player_fname, ' ', player_lname) AS player,DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), player_dob)), '%Y') + 0 AS age, AVG(Goalkeeper_CleanSheets) AS CleanSheets,AVG(Goalkeeper_GoalsConceded) AS GoalsConceded,AVG(Goalkeeper_SavesMade) AS SavesMade FROM finalgoaltable WHERE concat(player_fname, ' ', player_lname) = '" + req.params.projection + "' GROUP BY player_ID, concat(player_fname, ' ', player_lname), DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),player_dob)), '%Y') + 0 ORDER BY player_ID",
        function (err, result) {
            if (err) throw err;
            res.send(result)
        });
});

app.get('/api/forward/leaderboard/:position', (req, res) => {

    if (req.params.position === "Forward") {
        connection.query("SELECT player,country_name,positionstat_Name,player_jerseynum,Club_Name,League_Name , SUM(Forward_Goals) AS Goals, SUM(Forward_DribblesCompleted) AS DribblesCompleted, SUM(Forward_OffSidesPerGame) AS OffSidesPerGame, SUM(Forward_ShotsOnTarget) AS ShotsOnTarget FROM fortop GROUP BY player, country_name, positionstat_Name ,player_jerseynum, Club_Name, League_Name ORDER BY SUM(Forward_Goals) DESC LIMIT 10;",
            function (err, result) {
                if (err) throw err;
                res.send(result)
            });
    } else if (req.params.position === "Midfield") {
        connection.query("SELECT player,country_name,positionstat_Name,player_jerseynum,Club_Name,League_Name , SUM(Midfielder_Assists) AS Assists, SUM(Midfielder_PassesAttempted), SUM(Midfielder_PassesCompleted), SUM(Midfielder_ThroughBalls) FROM midtop GROUP BY player, country_name, positionstat_Name ,player_jerseynum, Club_Name, League_Name ORDER BY SUM(Midfielder_Assists) DESC LIMIT 10;",
            function (err, result) {
                if (err) throw err;
                res.send(result)
            });
    } else if (req.params.position === "Defender") {
        connection.query("SELECT player,country_name,positionstat_Name,player_jerseynum,Club_Name,League_Name , SUM(Defender_AerialDuelsWon) AS AerialDuelsWon, SUM(Defender_Interceptions) AS Interceptions, SUM(Defender_Tackles) AS Tackles FROM deftop GROUP BY player, country_name, positionstat_Name ,player_jerseynum, Club_Name, League_Name ORDER BY SUM(Defender_Tackles) DESC LIMIT 10;",
            function (err, result) {
                if (err) throw err;
                res.send(result)
            });
    } else if (req.params.position === "Goalie") {
        connection.query("SELECT player,country_name,positionstat_Name,player_jerseynum,Club_Name,League_Name , SUM(Goalkeeper_CleanSheets) AS CleanSheets, SUM(Goalkeeper_GoalsConceded) AS GoalsConceded, SUM(Goalkeeper_SavesMade) AS SavesMade FROM goaltop GROUP BY player, country_name, positionstat_Name ,player_jerseynum, Club_Name, League_Name ORDER BY SUM(Goalkeeper_SavesMade) DESC LIMIT 10;",
            function (err, result) {
                if (err) throw err;
                res.send(result)
            });
    }

});

app.post('/api/create_team', (req, res) => {

    if (req.body.position_id === "Goalie") {
        connection.query("SELECT * FROM ratings WHERE player = '" + req.body.player_create + "' ",
            function (err, result) {
                if (err) throw err;
                res.send(result)
            });
    } else if (req.body.position_id == "Defender") {
        connection.query("SELECT * FROM ratings WHERE player = '" + req.body.player_create + "' ",
            function (err, result) {
                if (err) throw err;
                res.send(result)
            });
    } else if (req.body.position_id === "Midfielder") {
        connection.query("SELECT * FROM ratings WHERE player = '" + req.body.player_create + "' ",
            function (err, result) {
                if (err) throw err;
                res.send(result)
            });
    } else if (req.body.position_id === "Forward") {
        connection.query("SELECT * FROM ratings WHERE player = '" + req.body.player_create + "' AND forRating = '" + req.body.position_id + "'",
            function (err, result) {
                if (err) throw err;
                res.send(result)
            });
    }
});



app.listen(3000, () => {
    console.log('App running on port 3000');
    connection.connect((err) => {
        if (err) throw err;
        console.log('DB Connected');
    })
});

