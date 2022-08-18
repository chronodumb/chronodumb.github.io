var gamestate = {
		dungeon:{
			name:"Goblin Fortress",
			mobs:["Goblin"],
			events:[],
			path:["mob","mob","mob","mob","mob","mob","mob","mob","mob","mob"],
			floor:1,
			step:1,
			hero:{
				"Name":"Warrior",
				"Level":1,
				"MaxHP":30,
				"HP":30,
				"SP":0,
				"Deck": ["Bolt-1","Atk-1","Atk-2","Atk-3","Def-1","Def-1","Def-2","Def-3","Cure-1","Bash"],
				"Skills":["Guard"],
			},
			enemy:{
				"Name":"Goblin",
				"Level":1,
				"MaxHP":16,
				"HP":10,
				"SP":0,
				"Deck":["Atk-1","Atk-1","Atk-2","Atk-2","Atk-3","Atk-4","Def-1","Def-2","Cure-1","Stab"],
				"Skills":[],
			},	
		},
	}

var turn = 0;
var tracker = "Ready";

var atk = gamestate.dungeon.hero;
var def = gamestate.dungeon.enemy;
		


function initCombat(){
	//shuffle
	shuffle(atk);
	shuffle(def);

	nextTurn();
}

function nextTurn(){
	if (turn%2==0){
		tracker = "Your Turn";
		atk = gamestate.dungeon.hero;
		def = gamestate.dungeon.enemy;
		yourMove(atk);
	}
	else{
		tracker = "Enemy Turn";
		atk = gamestate.dungeon.enemy;
		def = gamestate.dungeon.hero;
		enemyMove(atk)
	}
	turn++;
}

function yourMove(player){
	console.log(tracker);
	if (player.Hands){
		
	} else {
		player.Hands = [];
	}

	while(player.Hands.length < 5){
		player.Hands.push(draw(player));
	}
	console.log(player.Hands);

	update();
}

function draw(player){
	if (player.Deck.length > 0){
		return player.Deck.pop(0);
	} else {
		shuffle(player);
		draw(player);
	}
}

function shuffle(player){
	if (player.Deck && player.Deck.length>0){
		shuffleArray(player.Deck);
		console.log(player.Name + " shuffles " + player.Deck);
	} else if (player.Discard && player.Discard.length>0){
		player.Deck = player.Discard;
		shuffle(player);
	} 
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getCard(n){

}



function update(){
	gamestate.dungeon.hero.Hands.forEach(function(n){
		var cname = n.split('-')[0];
		var power = "";
		if(n.split('-')[1]) power = n.split('-')[1];
		var icon = "&#10025;"
		if(data.power_icon[cname]) icon = data.power_icon[cname];


		$('.hero .hands').append('<div class="card '+cname+'">'+ cname + power + '<div class="power">'+ icon +'</div>' +'</div>');
	});
	
	console.log("updating");
}

$(document).ready(function(){
	console.log(data)
	initCombat();

});

