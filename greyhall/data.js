var data = {
	"Enemies":{
		"Goblin":{
			"HP":10,
			"Deck":["Atk-1","Atk-1","Atk-2","Atk-2","Atk-3","Atk-4","Def-1","Def-2","Cure-1","Stab"],
		}
	},
	"Heroes":{
		"Warrior": {
			"Level":1,
			"MaxHP":20,
			"Deck": ["Atk-1","Atk-1","Atk-2","Atk-3","Def-1","Def-1","Def-2","Def-3","Cure-1","Bash"],
			"Skill":["Guard","Resolve","Parry","Fortify","Unbreakable"],
			"SkillLv":1,
		},
	},
	"Cards":{
		"Atk":{
			"Type":"Attack",
			"Desc":"Hit the enemy with your weapon. Deal X Combat damage",
			"Effect":"self.admg+=x"
		},
		"Bolt":{
			"Type":"Bolt",
			"Desc":"Cast a magical bolt of energy. Deal X Magic damage",
			"Effect":"self.bdmg+=x"
		},
		"Cure":{
			"Type":"Cure",
			"Desc":"Cast healing magic to recover health. Recover X HP",
			"Effect":"self.heal+=x",	
		},
		"Def":{
			"Type":"Defend",
			"Desc":"Brace yourself against enemy attack. Gain X Shield",
			"Effect":"self.sp+=x",	
		},
		"Bash":{
			"Desc":"Deal damage equal to total shield. Remove all shield.",
			"Effect":"self.admg+=self.shield;self.shield=0",
		},
		"Break":{
			"Desc":"Destroy enemy shield",
			"Effect":"enemy.shield=0",
		},
		"Stab":{
			"Desc":"Deal damage that pierces shield",
			"Effect":"enemy.tdmg+=3",
		}
	},
	"Skills":{
		"Guard":{
			"Desc":"At the beginning of each combat, gain 3 Shield",
			"Condition":"begin",
			"Effect":"self.sp+=3",	
		},
		"Fortify":{
			"Desc":"Every time you shuffle, gain 6 Shield",
			"Condition":"shuffle",
			"Effect":"self.sp+=6"
		},
		"Parry":{
			"Desc":"Every time you play Attack, gain 1 Shield",
			"Condition":"self_move",
			"Effect": "if(self_move=='Attack')self.sp+=1"
		},
		"Resolve":{
			"Desc":"Every time you play Defend, gain 1 Shield",
			"Condition":"self_move",
			"Effect": "if(self_move=='Defend')self.sp+=1"
		},
		"Unbreakable":{
			"Desc":"Before your every turn, gain 3 Shield",
			"Condition":"start_turn",
			"Effect":"self.sp+=1",
		},

	},
	"power_icon":{
		"Atk":"&#9876;",
		"Bolt":"&#128498;",
		"Cure":"&#9765;",
		"Def":"&#128737;",
	}
}