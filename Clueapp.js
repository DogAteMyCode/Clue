function depressButton(idElement) {
    var source = new String(document.getElementById(idElement).src);
    //console.log(source);
    var alt = new String(document.getElementById(idElement).alt);
    //console.log(newSource)
    console.log(alt);
    console.log(source);
    document.getElementById(idElement).src = alt;
    document.getElementById(idElement).alt = source;
}
function SetToString(set, delim){
  let str = '';
  set.forEach(function(elem){
    str += elem + delim
  });
  return str
}
function randomItem(xset) {
            var iterationNumber = 0;
            itemNumber = Math.floor(Math.random()*xset.size);
            for(var itemSet of xset) {
                if(itemNumber==iterationNumber) {
                    return itemSet
            }
        iterationNumber+=1; }}
var allobjects = new Set(["pistola","daga","llave_inglesa","candelabro","tuberia","cuerda","cocina","comedor","estudio","patio","salon_de_juegos","sala","habitacion","garaje","baño","verdi","escarlata","moradillo","blanco","mostaza","azulino"]);
var armas = new Set(["pistola","daga","llave_inglesa","candelabro","tuberia","cuerda"]);
const armasAbsolutas = new Set(["pistola","daga","llave_inglesa","candelabro","tuberia","cuerda"]);
var lugares = new Set(["cocina","comedor","estudio","patio","salon_de_juegos","sala","habitacion","garaje","baño"]);
const lugaresAbsolutos = new Set(["cocina","comedor","estudio","patio","salon_de_juegos","sala","habitacion","garaje","baño"]);
var personas = new Set(["verdi","escarlata","moradillo","blanco","mostaza","azulino"]);
const personasAbsolutas = new Set(["verdi","escarlata","moradillo","blanco","mostaza","azulino"]);
var chosenWeapon = randomItem(armas);
var chosenPlace = randomItem(lugares);
var chosenPerson = randomItem(personas);
armas.delete(chosenWeapon);
allobjects.delete(chosenWeapon);
lugares.delete(chosenPlace);
allobjects.delete(chosenPlace);
personas.delete(chosenPerson);
allobjects.delete(chosenPerson);
var envelopeCards = new Set([chosenWeapon,chosenPlace,chosenPerson]);
var victorySound = new Audio('Celebration.mp3');
var players = resourceDivision();
const p1 = players[0];
const p2 = players[1];
const p3 = players[2];
const p4 = players[3];
var player1Cards = Array.from(p1).join(', ');
document.getElementById("Statistics").innerHTML = "Tus cartas son ".concat(player1Cards,".");
function startAudio() {
    confirm("Como se juega \n Al inicio te diremos tus pistas, tienes abajo una lista de todas las pistas, para marcar una solo hace falta dar click en ella.\n Para intoducir tu primer pregunta utiliza las listas de arriba y selecciona los elementos que compondran tu pregunta, despues haz click en preguntar. \n Te responderan los demas jugadores y despues ellos preguntaran algunas cosas. \n El juego continuara asi hasta que la maquina o tu ganen");
    document.getElementById("audioPlayer").innerHTML = "";
    document.getElementById("starting").play();
    document.getElementById("ambient").play();
}
function resourceDivision() {
    var p1 = new Set();
    var p2 = new Set();
    var p3 = new Set();
    var p4 = new Set();
    randomizedUnion = new Set();
    while (randomizedUnion.size != allobjects.size) {
        randomizedUnion.add(randomItem(allobjects));
    }
    //console.log(randomizedUnion.size)
    var temp1 = new String();
    for (var i = 0; i < 10; i++) {
        try {
            temp1 = randomItem(randomizedUnion);
            randomizedUnion.delete(temp1);
            p1.add(temp1);
        }
        catch (e) { 
            break;
        }
        try {
            temp1 = randomItem(randomizedUnion);
            randomizedUnion.delete(temp1);
            p2.add(temp1);
        }
        catch (e) {
            break;
        }
        try {
            temp1 = randomItem(randomizedUnion);
            randomizedUnion.delete(temp1);
            p3.add(temp1);
        }
        catch (e) {
            break;
        }
        try {
            temp1 = randomItem(randomizedUnion);
            randomizedUnion.delete(temp1);
            p4.add(temp1);
        }
        catch (e) {
            break;
        }
    }
    p1.delete(undefined);
    p2.delete(undefined);
    p3.delete(undefined);
    p4.delete(undefined);

    return [p1,p2,p3,p4]
}
function won() {
    const moveCount = moves.length;
    var repetition = countDuplicates(moves);
    confirm("Ganaste")
    document.getElementById("Statistics").innerHTML = "Ganaste en ".concat(moveCount.toString(), " movimientos con ",repetition.toString(), " errores");
    document.getElementById("ambient").pause()
    victorySound.play();
    setTimeout(function(){
    location.reload()
}, 10000);
}
function countDuplicates(original) {
  let counts = new Set();
  original.forEach(function(x) { counts.add(x)});
  return original.length-counts.size;

}
moves = new Array();
moves.push("usefull");
function clearBtn() {
    document.getElementById("Statistics").innerHTML = " ";
}
function runRound() { 
    //console.log("started function");
    var weapon =  document.getElementById("weapon").value;
    var place = document.getElementById("place").value;
    var person = document.getElementById("person").value;
    //console.log("2 function");
    var easyAssign = new Set([weapon, place, person]);
    //console.log("3 function");
    if (chosenWeapon == weapon && chosenPlace == place && chosenPerson == person) {
        won();
        return ;
    }
    var hasBeenShown = 0;
    if (true) {
        //console.log("started");
        for (var assigned of easyAssign){
            //console.log(assigned);
            if (p2.has(assigned)) {
                confirm("Jugador 2 te ha mostrado ".concat(assigned));
                moves.push(assigned);
                //console.log(assigned);
                hasBeenShown++;
                break;
            }
            if (p3.has(assigned)){
                confirm("Jugador 3 te ha mostrado ".concat(assigned));
                moves.push(assigned);
                //console.log(assigned);
                hasBeenShown++;
                break;
            }
            if (p4.has(assigned)){
                confirm("Jugador 3 te ha mostrado ".concat(assigned));
                moves.push(assigned);
                //console.log(assigned);
                hasBeenShown++;
                break;
            }
        }
        if (hasBeenShown ==0){
            confirm("Nadie pudo mostrarte algo");
            moves.push("usefull");
        }

    }
    var playersChoice;
    var possibleAnswers;
    var gotAnswered = 0;
    for (var i=1;i<=3;i++){

        if (i==1) {
            playersChoice = new Set([p3,p4,p1]);
            possibleAnswers = ["El jugador 3 le mostro una carta", "El jugador 4 le mostro una carta", "Tu le mostraste una carta"];
        }
        if (i==2) {
            playersChoice = new Set([p4,p1,p2]);
            possibleAnswers = ["El jugador 4 le mostro una carta", "Tu le mostraste una carta", "El jugador 2 le mostro una carta"];
        }
        if (i==3) {
            playersChoice = new Set([p1,p2,p3]);
            possibleAnswers = ["Tu le mostraste una carta", "El jugador 2 le mostro una carta", "El jugador 3 le mostro una carta"];
        }
        var p2choice = new Set([randomItem(armasAbsolutas),randomItem(lugaresAbsolutos),randomItem(personasAbsolutas)]);
        var current = i+1;
        var pregunta = new String("El Jugador "+ current + " pregunto " + SetToString(p2choice, ', '));
    tryPlayer:
        for (var p2assigned of p2choice) {
    loop2:
            var indexP = 0;
            for (playerChoice of playersChoice) {
                if (playerChoice.has(p2assigned)){
                    gotAnswered++;
                    var answerSting = possibleAnswers[indexP];
                    break tryPlayer;
                indexP++;
                }
            }
        }
        if (p2choice == envelopeCards) {
            confirm(pregunta + " \n " + "Has perdido, el jugador " + current + " obtuvo la repuesta");
            location.reload();
            return;
        }
        confirm(pregunta + " \n " + answerSting);
    }
}
