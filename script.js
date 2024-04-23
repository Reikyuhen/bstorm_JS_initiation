// CREATION PAGE D'ACCUEIL

function intro() {
    const DIV_GLOBAL = document.createElement("div");
    DIV_GLOBAL.id = "global";
    document.body.appendChild(DIV_GLOBAL);

    const DIV_INTRO = document.createElement("div");
    DIV_INTRO.id = "intro";
    DIV_INTRO.className = "middle_Screen";
    DIV_GLOBAL.appendChild(DIV_INTRO);

    const H1_INTRO = document.createElement("h1");
    DIV_INTRO.appendChild(H1_INTRO);
    H1_INTRO.innerText = "Bienvenue!\n Appuyez sur le bouton pour commencer.";

    const START_BTN = document.createElement("button");
    START_BTN.id = "start_Button";
    DIV_INTRO.appendChild(START_BTN);
    START_BTN.innerText = "Commencer";

    START_BTN.onclick = () => {
        DIV_INTRO.remove();
        game_display();
    };
}

// CRÉATION ZONE DE JEUX

let players_List = [];
let gameOnRun = "";
let minPlayerRequired = 0;
let currentDelay = 1;
let animateCount = 0;
let animateInterval;
let personChoosed = "";
let classmentPlayersList = [];

function game_display() {
    DIV_GLOBAL = document.getElementById("global");

    // CREATION MODES DE JEUX

    const DIV_GAME_MODES = document.createElement("div");
    DIV_GAME_MODES.id = "game_Modes";
    DIV_GLOBAL.appendChild(DIV_GAME_MODES);

    const txt_h3_modes_jeux = document.createElement("h3");
    txt_h3_modes_jeux.innerText = "Modes de jeux";
    DIV_GAME_MODES.appendChild(txt_h3_modes_jeux);

    const DIV_GAMES = document.createElement("div");
    DIV_GAMES.id = "types_Game";
    DIV_GAME_MODES.appendChild(DIV_GAMES);

    const ELECTION_BTN = document.createElement("button");
    ELECTION_BTN.id = "election_Btn";
    ELECTION_BTN.className = "mode cyan";
    ELECTION_BTN.innerText = "Election";
    ELECTION_BTN.disabled = false;
    ELECTION_BTN.onclick = election_game_intro;
    DIV_GAMES.appendChild(ELECTION_BTN);

    const CLASSEMENT_BTN = document.createElement("button");
    CLASSEMENT_BTN.id = "classement_Btn";
    CLASSEMENT_BTN.className = "mode cyan";
    CLASSEMENT_BTN.innerText = "Classement";
    CLASSEMENT_BTN.disabled = false;
    CLASSEMENT_BTN.onclick = classementGameIntro;
    DIV_GAMES.appendChild(CLASSEMENT_BTN);

    const QUESTIONS_BTN = document.createElement("button");
    QUESTIONS_BTN.id = "questions_Btn";
    QUESTIONS_BTN.className = "mode cyan";
    QUESTIONS_BTN.innerText = "Questions";
    QUESTIONS_BTN.disabled = false;
    QUESTIONS_BTN.onclick = questionsGameIntro;
    DIV_GAMES.appendChild(QUESTIONS_BTN);

    // CREATION CONTENANT DE JEUX

    const DIV_GAME_CONTENT = document.createElement("div");
    DIV_GAME_CONTENT.id = "game_Content";
    DIV_GAME_CONTENT.className = "middle_Screen";
    DIV_GLOBAL.appendChild(DIV_GAME_CONTENT);

    const txt_h2_titre = document.createElement("h2");
    txt_h2_titre.id = "game_Title";
    txt_h2_titre.innerText = "TEXTE DU JEUX";
    DIV_GAME_CONTENT.appendChild(txt_h2_titre);

    const DIV_CARD_PLACE = document.createElement("div");
    DIV_CARD_PLACE.id = "alignement_Card";
    DIV_GAME_CONTENT.appendChild(DIV_CARD_PLACE);

    const rules_conditions = document.createElement("div");
    rules_conditions.id = "condition";
    rules_conditions.hidden = false;
    DIV_GAME_CONTENT.appendChild(rules_conditions);

    const rules_conditions_p = document.createElement("p");
    rules_conditions_p.id = "conditionText";
    rules_conditions_p.innerText = `Veuillez insérer au minimum ${minPlayerRequired} joueurs pour pouvoir jouer.`
    rules_conditions.appendChild(rules_conditions_p);

    // CREATION FONCTIONNALITÉ DE JEUX (BOUTONS)

    const DIV_GAME_FUNCTION = document.createElement("div");
    DIV_GAME_FUNCTION.id = "game_Function";
    DIV_GLOBAL.appendChild(DIV_GAME_FUNCTION);

    // BOUTON AJOUTER

    const ADD_BTN = document.createElement("button");
    ADD_BTN.id = "add_Player";
    ADD_BTN.className = "function_Btn green";
    ADD_BTN.hidden = false;
    ADD_BTN.disabled = false;
    ADD_BTN.onclick = master_Add;
    DIV_GAME_FUNCTION.appendChild(ADD_BTN);

    const LOGO_ADD_BTN = document.createElement("i");
    LOGO_ADD_BTN.className = "fa-solid fa-plus";
    ADD_BTN.appendChild(LOGO_ADD_BTN);

    // BOUTON JOUER

    const PLAY_BTN = document.createElement("button");
    PLAY_BTN.id = "play";
    PLAY_BTN.className = "function_Btn disabled";
    PLAY_BTN.hidden = false;
    PLAY_BTN.disabled = true;
    DIV_GAME_FUNCTION.appendChild(PLAY_BTN);

    const LOGO_PLAY_BTN = document.createElement("i");
    LOGO_PLAY_BTN.className = "fa-solid fa-play";
    PLAY_BTN.appendChild(LOGO_PLAY_BTN);

    // BOUTON REJOUER

    const REPLAY_BTN = document.createElement("button");
    REPLAY_BTN.id = "replay";
    REPLAY_BTN.className = "function_Btn disabled";
    REPLAY_BTN.hidden = true;
    REPLAY_BTN.disabled = true;
    DIV_GAME_FUNCTION.appendChild(REPLAY_BTN);

    const LOGO_REPLAY_BTN = document.createElement("i");
    LOGO_REPLAY_BTN.className = "fa-solid fa-rotate-left";
    REPLAY_BTN.appendChild(LOGO_REPLAY_BTN);

    // BOUTON STOP

    const STOP_BTN = document.createElement("button");
    STOP_BTN.id = "stop";
    STOP_BTN.className = "function_Btn disabled";
    STOP_BTN.hidden = true;
    STOP_BTN.disabled = true;
    DIV_GAME_FUNCTION.appendChild(STOP_BTN);

    const LOGO_STOP_BTN = document.createElement("i");
    LOGO_STOP_BTN.className = "fa-solid fa-stop";
    STOP_BTN.appendChild(LOGO_STOP_BTN);

    // LANCEMENT DU JEUX PAR DEFAUT ET PREMIER JEUX

    election_game_intro()
}

// MODE DE JEUX ELECTION

function election_game_intro() {
    minPlayerRequired = 2;
    gameOnRun = "Election";
    highlightedModeAndGameText();
    conditionsCheck();

    let playButton = document.getElementById("play");
    playButton.onclick = () => {
        hiddenAndDisabledWhenLaunched();
        electionGameRun();
    }
    console.log(gameOnRun);
}

//  MODE DE JEUX CLASSEMENT

function classementGameIntro() {
    minPlayerRequired = 4;
    gameOnRun = "Classement";
    classmentPlayersList = [];
    let playerCards = document.getElementsByClassName("player_Card");
    highlightedModeAndGameText();
    conditionsCheck();

    let playButton = document.getElementById("play");
    playButton.onclick = () => {
        hiddenAndDisabledWhenLaunched();
        for (const onGamePlayers of playerCards) {
            onGamePlayers.classList.add("onGame");
        }
        classementGameRun();
    }
    console.log(gameOnRun);
}

// MODE DE JEUX QUESTIONS

function questionsGameIntro() {
    minPlayerRequired = 2;
    gameOnRun = "Questions";
    highlightedModeAndGameText();
    conditionsCheck();

    let playButton = document.getElementById("play");
    playButton.onclick = () => {
        hiddenAndDisabledWhenLaunched();
        questionsGameRun();
    }
    console.log(gameOnRun);
}

// JEUX ELECTION

function electionGameRun(){
    let playerCards = document.getElementsByClassName("player_Card");
    let rouletteWheel = Math.floor(Math.random()*(players_List.length));
    personChoosed = "";

    for (const choosenOne of playerCards) {
        if(choosenOne.classList.contains("choosen")){
            choosenOne.classList.remove("choosen");
        }
    }
    playerCards[rouletteWheel].classList.add("choosen");
    if (currentDelay < 1000 ){
        setTimeout(electionGameRun, addTime());
    }
    else{
        currentDelay = 1;
        animateCount = 0;
        personChoosed = players_List[rouletteWheel];
        animateInterval = setInterval(animatePlayer, 500);
    }
}

// JEUX CLASSEMENT

function classementGameRun(){
    let playerCards = document.getElementsByClassName("player_Card");
    let rouletteWheel = Math.floor(Math.random()*(players_List.length));
    personChoosed = "";

    for (const choosenOne of playerCards) {
        if(choosenOne.classList.contains("choosen")){
            choosenOne.classList.remove("choosen");
        }
    }
    if (playerCards[rouletteWheel].classList.contains("onGame")){
        playerCards[rouletteWheel].classList.add("choosen");
        if (currentDelay < 1000 ){
            setTimeout(classementGameRun, addTime());
        }
        else{
            currentDelay = 1;
            animateCount = 0;
            if(classmentPlayersList.length < ((players_List.length-1))){
                personChoosed = players_List[rouletteWheel];
                playerCards[rouletteWheel].classList.remove("onGame");
                animateInterval = setInterval(animatePlayer, 500);
            }
            else{
                
            }
        }
    }
    else{
        classementGameRun();
    }
}

// JEUX QUESTIONS

function questionsGameRun() {

}

// FIN DE JEUX ELECTION + RESET DE BOUTONS

function electionGameEnd(){
    let REPLAY_BTN = document.getElementById("replay");
    let STOP_BTN = document.getElementById("stop");
    let choosenOne = document.getElementsByClassName("player_Card choosen");
    let DIV_GLOBAL = document.getElementById("global");

    // ANIMATION TEXTE JOUEUR GAGNANT
   
    let winnerScroll = document.createElement("h1");
    winnerScroll.id="winnerText";
    winnerScroll.innerText=`Félicitation ${personChoosed}, tu es l'élu(e) !!!`;
    DIV_GLOBAL.insertBefore(winnerScroll, DIV_GLOBAL.firstChild);

    // ACTIVATION BOUTONS
    
    ShowAndEnabledWhenFinished();

    REPLAY_BTN.onclick = () => {
        electionGameRun();
        ShowAndEnabledWhenFinished();
        winnerScroll.remove();
    }
    STOP_BTN.onclick = () => {
        ShowAndEnabledWhenFinished();
        hiddenAndDisabledWhenLaunched();
        winnerScroll.remove();
        if (choosenOne[0].classList.contains("choosen")){
            choosenOne[0].classList.remove("choosen");
        }
    }
}

// FIN DE JEUX CLASSEMENT + RESET DE BOUTONS

function classementGameEnd() {

}

// FIN DE JEUX QUESTIONS + RESET DE BOUTONS

function questionsGameEnd() {

}

// FONCTION DIMINUTION DU TEMPS DE ROULETTE

function addTime() {
    currentDelay = currentDelay*1.1;
    return currentDelay;
}

// FONCTION ANIMATION GAGNANTE DE PERSONNE CHOISIE

function animatePlayer(){
    let winner = document.getElementsByClassName("choosen");
    if (animateCount < 6){
        if (winner[0].classList.contains("choosenOne")){
            winner[0].classList.remove("choosenOne");
        }
        else{
            winner[0].classList.add("choosenOne");
        }
        animateCount++;
    }
    else{
        clearInterval(animateInterval);
        endGames();
    }
}
// FONCTION DE CHEMIN DE DEBUT POUR LES BOUTONS "MODES" PAR RAPPORT AU JEUX EN COURS

function highlightedModeAndGameText() {
    const ELECTION_BTN = document.getElementById("election_Btn");
    const CLASSEMENT_BTN = document.getElementById("classement_Btn");
    const QUESTIONS_BTN = document.getElementById("questions_Btn");
    const gameTitle = document.getElementById("game_Title");

    if (gameOnRun === "Election") {
        ELECTION_BTN.classList.add("highlightedMode");
        CLASSEMENT_BTN.classList.remove("highlightedMode");
        QUESTIONS_BTN.classList.remove("highlightedMode");
        gameTitle.innerText = "Qui sera l'Élu ?";
    }
    else if (gameOnRun === "Classement") {
        CLASSEMENT_BTN.classList.add("highlightedMode");
        ELECTION_BTN.classList.remove("highlightedMode");
        QUESTIONS_BTN.classList.remove("highlightedMode");
        gameTitle.innerText = "Qui sera sur le podium ?";
    }
    else if (gameOnRun === "Questions"){
        QUESTIONS_BTN.classList.add("highlightedMode");
        ELECTION_BTN.classList.remove("highlightedMode");
        CLASSEMENT_BTN.classList.remove("highlightedMode");
        gameTitle.innerText = "Qui sera le dernier survivant ?";
    }
}

// FONCTION DE CHEMIN DE FIN PAR RAPPORT AU JEUX EN COURS

function endGames() {
    if (gameOnRun === "Election"){
        electionGameEnd();
    }
    else if (gameOnRun === "Classement"){
        if (classmentPlayersList.length <= players_List.length){
            eliminatePlayer();
            classmentPlayersList.push(personChoosed);
            classementGameRun();
        }
        else {
            classementGameEnd();
        }
    }
    else if (gameOnRun === "Questions"){
        questionsGameEnd();
    }
}

// FONCTION AJOUTER JOUEURS

function master_Add() {
    let player_Name = prompt("Entrez un nom");
    if (player_Name != null){
        let correct = card_Player_Verification(player_Name);
        if (correct) {
            players_List.push(player_Name);
            conditionsCheck();
            add_Card_Player(player_Name);
        }
        else {
            master_Add();
        }   
    }
}

// FONCTION VERIFICATION NOMBRE JOUEURS

function conditionsCheck() {
    let condition_Carpet = document.getElementById("condition");
    let playButton = document.getElementById("play");
    if (players_List.length < minPlayerRequired){
        let missPlayers = minPlayerRequired-players_List.length
        let rulesConditionP = document.getElementById("conditionText")
        rulesConditionP.innerText = `Veuillez insérer au minimum ${missPlayers} joueurs pour pouvoir jouer.`
    }
    if (players_List.length >= minPlayerRequired) {
        condition_Carpet.hidden = true;
        playButton.disabled = false;
        playButton.classList.remove("disabled");
        playButton.classList.add("red");
    }
    else {
        condition_Carpet.hidden = false;
        playButton.disabled = true;
        playButton.classList.add("disabled");
        playButton.classList.remove("red");
    }
}

// VERIFICATION NOMS JOUEURS

function card_Player_Verification(player_Name) {
    const regex_Any_Letter = /[a-zA-Z]/g;

    if (player_Name === "") {
        alert("Le nom est vide. Entrez un nom valide.");
        return false;
    }
    else if (regex_Any_Letter.test(player_Name) === false) {
        alert("Le nom doit contenir au moins une lettre. Entrez un nom valide.");
        return false;
    }
    else if (exist_already(player_Name)) {
        alert("Ce nom éxiste déjà. Veuillez recommencer.");
        return false;
    }
    return true;
}

// BOUCLE DE VERIFICATION NOM DEJA EXISTANT

function exist_already(player_Name) {

    // Deux façon d'écrire la boucle for:

    // For of:

    for (const player of players_List) {
        if (player.toUpperCase() === player_Name.toUpperCase()) {
            return true;
        }
    }

    // For program. classique:

    // for (let x = 0; x < players_List.length; x++){
    //     if (players_List[x].toUpperCase()===player_Name.toUpperCase()){
    //         return true;
    //     }
    // }
}

// CREATION DE CARTE

function add_Card_Player(player_Name) {
    const DIV_ALIGNEMENT_CARD = document.getElementById("alignement_Card");

    const DIV_PLAYER_CARD = document.createElement("div");
    DIV_PLAYER_CARD.id = player_Name;
    DIV_PLAYER_CARD.className = "player_Card";
    DIV_ALIGNEMENT_CARD.appendChild(DIV_PLAYER_CARD);

    const PLAYER_NAME = document.createElement("p");
    PLAYER_NAME.innerText = player_Name;
    DIV_PLAYER_CARD.appendChild(PLAYER_NAME);

    const delete_Player_Btn = document.createElement("button");
    delete_Player_Btn.className = "delete_Player red";
    delete_Player_Btn.innerText = "-";
    delete_Player_Btn.disabled = false;
    delete_Player_Btn.onclick = () => {
        remove_Card_Player(player_Name);
    }
    DIV_PLAYER_CARD.appendChild(delete_Player_Btn);
}

// FONCTION SUPPRIMER DES JOUEURS

function remove_Card_Player(player_Name) {

    // RETIRE LA DIV DANS LE DOM

    const remove_Player = document.getElementById(player_Name);
    remove_Player.remove();

    // RETIRE LE NOM DANS LA LISTE

    // La premiere constante et sa fonction sont utiles afin de trouver, via des conditions précises, un élément dans une liste en une ligne.

    // const found_Player_Name = players_List.find(element => element == player_Name);

    // Celle-ci permet de trouver l'indice de la string donné entre parenthèse et de la supprimer.

    const found_Player_Index = players_List.indexOf(player_Name);
    if (found_Player_Index > -1) {
        players_List.splice(found_Player_Index, 1);
    }

    // VERIFIE SI TEXTE CONDITIONS A AFFICHER + BOUTON A ACTIVER OU NON

    conditionsCheck();
}

// FONCTION DE DISQUALIFICATION DES JOUEURS LORS DU JEUX CLASSEMENT

function eliminatePlayer() {
    let choosenOne = document.getElementById(`${personChoosed}`);
    if (choosenOne.classList.contains("choosen")){
        choosenOne.classList.remove("choosen");
        choosenOne.classList.add("eliminate");
    }
    classementPlayer(choosenOne);
}

// FONCTION DE MISE EN PAGE DE CLASSEMENT DE JOUEURS

function classementPlayer(rankingPlayerId) {
    let ranking = (players_List.length)-(classmentPlayersList.length);
    let rankingText = document.createElement("p");
    let rankingCup = document.createElement("img");
    if (ranking < 4){
        if (ranking == 3){
            rankingCup.src = "/images_Jeux/Trophy_bronze.png";
            rankingCup.id = "bronzeCup";
            rankingPlayerId.insertBefore(rankingCup, rankingPlayerId.firstChild);
            }
        else if (ranking == 2){
            rankingCup.src = "/images_Jeux/Trophy_silver.png";
            rankingCup.id = "silverCup";
            rankingPlayerId.insertBefore(rankingCup, rankingPlayerId.firstChild);
        }
        else{
            rankingCup.src = "/images_Jeux/Trophy_gold.png";
            rankingCup.id = "goldCup";
            rankingPlayerId.insertBefore(rankingCup, rankingPlayerId.firstChild);
        }
    }
    else {
        rankingText.innerText = `${ranking}ème`;
        rankingPlayerId.insertBefore(rankingText, rankingPlayerId.firstChild);
    }
}

// FONCTION DE MISE EN PAGE DES BOUTONS LORS DU LANCEMENT DU JEUX

function hiddenAndDisabledWhenLaunched () {

    // VARIABLE DES ID

    let election_Btn = document.getElementById("election_Btn");
    let classement_Btn = document.getElementById("classement_Btn");
    let questions_Btn = document.getElementById("questions_Btn");
    let deletePlayer = document.getElementsByClassName("delete_Player");
    let ADD_BTN = document.getElementById("add_Player");
    let PLAY_BTN = document.getElementById("play");
    let REPLAY_BTN = document.getElementById("replay");
    let STOP_BTN = document.getElementById("stop");

    // CHANGEMENT DES ETATS CACHER / VISIBLE

    hiddenOrNot(ADD_BTN);
    hiddenOrNot(REPLAY_BTN);
    hiddenOrNot(STOP_BTN);

    // CHANGEMENT DES ETATS ACTIF / INACTIF

    DisableOrNot(PLAY_BTN);
    DisableOrNot(election_Btn);
    DisableOrNot(classement_Btn);
    DisableOrNot(questions_Btn);
    for (const deleteBtn of deletePlayer) {
        DisableOrNot(deleteBtn);
    }
}

// FONCTION DES BOUTONS A REACTIVER LORS DE LA FIN DU JEUX

function ShowAndEnabledWhenFinished(){

    // VARIABLE DES IDS

    let REPLAY_BTN = document.getElementById("replay");
    let STOP_BTN = document.getElementById("stop");

    // CHANGEMENTS DES ETATS ACTIF / INACTIF

    DisableOrNot(REPLAY_BTN);
    DisableOrNot(STOP_BTN);
}

// FONCTION DE SWITCH DE BOUTON À CACHER/MONTRER

function hiddenOrNot (buttonId){
    if (buttonId.hidden == true){
        buttonId.hidden = false;
    }
    else {
        buttonId.hidden = true;
    }
}

// FONCTION DE SWITCH DE BOUTON À ACTIVER / DÉSACTIVER / ÉCLAIRER

function DisableOrNot (buttonId){
    if (buttonId.disabled == true){
        buttonId.disabled = false;
        buttonId.classList.remove("disabled");
        if (buttonId.id=="replay"){
            buttonId.classList.add("green");
        }
        else if (buttonId.classList.contains("mode")){
            buttonId.classList.add("cyan");
            if (buttonId.classList.contains("highlightedMode")){
                buttonId.classList.remove("onRunHighlightedMode");
            }
        }
        else{
            buttonId.classList.add("red");
        }
    }
    else {
        buttonId.disabled = true;
        buttonId.classList.add("disabled");
        buttonId.classList.remove("red","green","cyan");
        if (buttonId.classList.contains("highlightedMode")){
            buttonId.classList.remove("disabled");
            buttonId.classList.add("onRunHighlightedMode");
        }
    }
}

intro()