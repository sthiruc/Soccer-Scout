//CREATE TABLE FORWARD RATINGS
// connection.query("create table forRating as SELECT player_ID, concat(player_fname, ' ', player_lname) AS player, country_name, ( (AVG(Forward_Goals)*0.8) + (AVG(Forward_DribblesCompleted)*0.10) + (AVG(Forward_ShotsOnTarget)*0.1) )*30 AS forRating FROM finalfortable GROUP BY player_ID, concat(player_fname, ' ', player_lname), country_name ORDER BY player_ID", 
// function(err, result) {
//     if(err) throw err;
// });

//CREATE TABLE MID RATINGS
// connection.query("CREATE TABLE midRating AS SELECT player_ID, concat(player_fname, ' ', player_lname) AS player, country_name, (AVG(Midfielder_Assists)0.8 + AVG(Midfielder_PassesCompleted)0.10 + AVG(Midfielder_ThroughBalls)*0.1) 20 AS midRating FROM finalmidtable GROUP BY player_ID, concat(player_fname, ' ', player_lname), country_name ORDER BY player_ID", 
// function(err, result) {
//     if(err) throw err;
// });

//CREATE TABLE DEFENDER RATINGS
// connection.query("Create TABLE defRating AS SELECT player_ID, concat(player_fname, ' ', player_lname) AS player, country_name, ((AVG(Defender_AerialDuelsWon))*0.33 + (AVG(Defender_Interceptions))*0.33 + (AVG(Defender_Tackles)))*10 AS defRating FROM finaldeftable GROUP BY player_ID, concat(player_fname, ' ', player_lname), country_name ORDER BY player_ID", 
// function(err, result) {
//     if(err) throw err;
// });

//CREATE TABLE GOALIE RATINGS
// connection.query("CREATE TABLE goalieRating AS SELECT player_ID, concat(player_fname, ' ', player_lname) AS player, country_name, ((AVG(Goalkeeper_CleanSheets))*0.75 + (AVG(Goalkeeper_SavesMade))*0.25) * 25 AS goalieRating FROM finalgoaltable GROUP BY player_ID, concat(player_fname, ' ', player_lname), country_name ORDER BY player_ID", 
// function(err, result) {
//     if(err) throw err;
// });

//RIGHT JOIN STATEMENTS TO CREATE rating table from Player and Rating tables
// connection.query("Create Table player_rating_goal AS SELECT c.player_ID, c.player,c.Country_Name ,goalierating FROM goalierating g RIGHT JOIN player c ON c.player_id = g.player_ID", 
// function(err, result) {
//     if(err) throw err;
// });

// connection.query("create table player_rating_goaldef as Select c.player_ID, c.player, c.Country_Name, c.goalierating, defRating FROM defrating d RIGHT JOIN player_rating_goal c ON d.player_ID = c.player_ID", 
// function(err, result) {
//     if(err) throw err;
// });

// connection.query("create table player_rating_goaldefmid as Select c.player_ID, c.player, c.Country_Name, c.goalierating, c.defRating, midRating FROM midrating m RIGHT JOIN player_rating_goaldef c ON m.player_ID = c.player_ID", 
// function(err, result) {
//     if(err) throw err;
// });

// connection.query("create table finalratingTable as Select c.player_ID, c.player, c.Country_Name, c.goalierating, c.defRating, c.midRating, forRating FROM forrating f RIGHT JOIN player_rating_goaldefmid c ON f.player_ID = c.player_ID", 
// function(err, result) {
//     if(err) throw err;
// });

