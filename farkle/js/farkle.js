var Farkle = {};

function test(){
    var a = [1,2,2,3,3,3]
    var b = [1,2,2]
    var c = [1,1,2]
    var d = [1,1,1]

    console.log("b is a subset of a : " + b.every(function (val) {return a.indexOf(val) >= 0;}));
    console.log("c is a subset of a : " + c.every(function (val) {return a.indexOf(val) >= 0;}));
    console.log("d is a subset of a : " + d.every(function (val) {return a.indexOf(val) >= 0;}));

}

function start(conf){
    config(conf);

    setTimeout(function(){
        turn(1);
    }, 1000);

}

function config(conf){

    //custom new game setup
    if (conf){

    } else { //base game setup
        Farkle.players = [];
        Farkle.turn = 0;
        Farkle.pattern = Pattern.default;
        Farkle.goal = 10000;
        Farkle.special = true;

        Farkle.players = [
            {id:1,name:"player 1",hands:[],points:0,ai:false},
            {id:2,name:"player 2",hands:[],points:0,ai:true},
            {id:3,name:"player 3",hands:[],points:0,ai:true},
            {id:4,name:"player 4",hands:[],points:0,ai:true},
        ];

    }


    //generate special patterns
    special();
}

function turn(x){

    //first roll required all dice to re-roll

    var name= Farkle.players[x-1].name;
    var dice= Farkle.players[x-1].hands;

    console.log( name + "'s turn, rolls dice: ");

    dice = [roll(),roll(),roll(),roll(),roll(),roll()];

    console.log(dice.sort());

    console.log("possible moves: ");

    var p = Farkle.pattern;
    for (var i=0; i<p.length; i++) {
        if (iscubset(p[i].pattern, dice)){
            console.log(p[i].pattern);
        }
    }

}

function iscubset(pattern,dice){

    var p = pattern.slice(0);
    var d = dice.slice(0);


    var i = d.length;

    while(i--){
        x = p.indexOf(d[i]);
        if(x >= 0){
            p.splice(x,1);
        }

        if (i==0 && p.length == 0){
            return true;
        }
    }

    return false;
}


function roll(){
    return Math.floor(Math.random() * ((6 - 1) + 1) + 1);
}


var Pattern = {};

Pattern.default = [
    {score: 100,pattern:[1]},
    {score:  50,pattern:[5]},
    {score: 200,pattern:[2,2,2]},
    {score: 300,pattern:[3,3,3]},
    {score: 400,pattern:[4,4,4]},
    {score: 500,pattern:[5,5,5]},
    {score: 600,pattern:[6,6,6]},
    {score:1000,pattern:[1,1,1]},
    {score:3000,pattern:[1,2,3,4,5,6]},
    {score:1500,pattern:'AAAA',special:true},
    {score:2000,pattern:'AAABBB',special:true},
    {score:2000,pattern:'AABBCC',special:true},
    {score:2500,pattern:'AAAAAA',special:true},
];

function special(){
    var pattern = Farkle.pattern;

    if (Farkle.special){

        var special = [];

        var i = pattern.length;
        while(i--){
            if (pattern[i].special){

                if (!pattern[i].pattern.includes('B')) {
                    for (a = 1; a <= 6; a++) {
                        var p = pattern[i].pattern;
                        var s = pattern[i].score;
                        p = p.replace(/A/g, a);
                        n = p.split("").map(Number);
                        special.push({score:s,pattern:n});
                    }
                } else if (!pattern[i].pattern.includes('C')){
                    for (a=1;a<=6;a++){
                        for (b=a+1;b<=6;b++){
                            var p = pattern[i].pattern;
                            p = p.replace(/A/g,a);
                            p = p.replace(/B/g,b);
                            n = p.split("").map(Number);
                            special.push({score:s,pattern:n});
                        }
                    }
                } else {
                    for (a=1;a<=6;a++){
                        for (b=a+1;b<=6;b++){
                            for (c=b+1;c<=6;c++){
                                var p = pattern[i].pattern;
                                p = p.replace(/A/g,a);
                                p = p.replace(/B/g,b);
                                p = p.replace(/C/g,c);
                                n = p.split("").map(Number);
                                special.push({score:s,pattern:n});
                            }
                        }
                    }
                }



                pattern.splice(i,1);
            }

            console.log(i);

            if (i==0){
                Farkle.pattern = pattern.concat(special);
                console.log(Farkle.pattern);
            }
        }

    } else {
        var i = pattern.length;
        while(i--){
            if (pattern[i].special){
                pattern.splice(i,1);
            }
        }
    }


}




start();