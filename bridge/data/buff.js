/*
events:
    onEnter, onReady, beforeMove, onMove, afterMove, beforeHit, onHit, afterHit, onDeath, onApply
*/

states = {
    "buffs":{
        "endure": {
            "name": "Endure",
            "desc": "Survive against a fatal attack once",
            "type": "buff",
            "stack": false,
            "onHit": function (self, attacker, dmg) {
                if (self.hp - dmg <= 0) {
                    self.hp = 1;
                    clear("resolve");
                }
            },
        },

        "immune":{
            "name": "Immune",
            "desc": "Prevent the next debuff",
            "type": "buff",
            "stack": true,
            "onHit": function (self, attacker, effect){

            }
        }

        "guard": {
            "name": "Guard",
            "stack":false,
            "desc": "Block the next melee attack",
        },

        "evade": {
            "name": "Evade",
            "stack":false,
            "desc": "Avoid the next ranged attack",
        }
        "invisible": {
            "name": "Invisible",
            "desc": "Cannot be targeted, removed upon next move",
            "stack":false,
            "onApply": function(self) {
                //check if no enemy have truesight, else perform reveal
            }
            "onMove":{
                clear("invisible");
            }
        }
        "truesight": {
            "name": "True Sight",
            "desc": "Reveal invisible units",
        }
    }

    "debuff": {
        "poison": {
            "name": "Poison",
            "desc": "Lose health every turn",
            "type": "debuff",
            "stack": true,
            "onReady": function (self){
                self.hp--;
            }
        },

        "bleed": {
            "name": "Bleed",
            "desc": "Lose health every time you move",
            "stack": true,
            "onMove": function (self) {
                self.hp--;
            }
        }

        "burn": {
            "name": "Burn",
            "desc": "Lose health every time you are hit",
            "stack": true,
            "onHit": function (self) {
                self.hp--;
            }
        }

        "cursed": {
            "name": "Cursed",
            "desc": "Cannot recover health",
            "stack": true,
        }

        "weaken": {
            "name": "Weaken",
            "desc": "Lose atk",
        }
    }

    "clear": function (buffs,target){

        if (buffs == null || buffs.length == 0){
            return buffs;
        }

        let  i = 0;
        if (target == null){ //Random
            i = roll(buffs.length)-1;
        } else {
            i = buffs.indexOf(target);
        }

        if (i>=0){
            buffs.splice(i, 1);
        }

        return buffs;
    },
    "roll" : function (max){
        return Math.floor(Math.random() * max + 1);
    }
}


let defender = {
    "hp":4,
    "atk":3,
    "buffs":["endure"];
    "debuffs":["poison"]
}

let attacker = {
    "hp":5,
    "atk":5,
    "buffs":[];
}

let dmg = 5;

//Damage flow. attacker.onAttack, defender.onHit,
function eventTest(attacker,defender){

    let damage = 0;
    attacker.onAttack(){
        damage = attacker.atk;
    }

    defender.onHit(){
    }
}

console.log(buffs.resolve);
