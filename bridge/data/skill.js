var _skills = [
{
    "id"        :   "defend"        ,   //skill id
    "category"  :   "active"        ,   //active, passive
    "sp"        :   20              ,   //amount to cast
    "type"      :   "buff"          ,   //buff,debuff,
    "target"    :   "self"          ,   //self,any,ally,enemy
    "targetPos" :   "self"          ,   //self,front,mid,back
    "duration"  :   5               ,   //turns. self and enemy turns are counted as 1 each
    "accuracy"  :   100             ,
    "name"      :   "Defend"        ,
    "text"      :   "Prepare to defend against an incoming attack. Gives bonus shield buff to mitigate physical damage",
    "effect"    :   function(target){
                        target.bonus.shield = 10 + (5*target.star);
                    },
},
{
    "id"        :   "bash"          ,   //skill id
    "category"  :   "active"        ,   //active, passive
    "group"     :   "skill"         ,   //skill, spell
    "sp"        :   20              ,   //amount to cast
    "type"      :   "damage"        ,   //buff,debuff,
    "target"    :   "enemy"         ,   //self,any,ally,enemy
    "targetPos" :   "front"         ,   //self,front,mid,back
    "duration"  :   1               ,   //turns. self and enemy turns are counted as 1 each
    "accuracy"  :   100             ,
    "flag"      :   ["melee","physical"],
    "name"      :   "Bash"        ,
    "text"      :   "Strikes the enemy with a heavy weapon to deal physical damage with a small chance to stun the target",
    "effect"    :   function(target){
                        damage(target,"physical")
                    },
}
]