_statuses = {
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
    },
    "taunt" : {
        "name" : "taunt",
        "desc" : "All enemies shall target this unit",
        "type" : "passive",
        "stack": false,
    },
    "shield" : {
        "name" : "Shield",
        "desc" : "Enemy attacks are lowered",
        "type" : "passive",
        "stack": true,
        "onHit": function {

        }
    },
    "pierce" : {
        "name" : "pierce",
        "desc" : "Attacks ignores enemy shield",
        "type" : "passive",
    }
    "break" : {
        "name" : "break",
        "desc" : "Attacks destroy enemy shield",
        "type" : "passive",
    }
}