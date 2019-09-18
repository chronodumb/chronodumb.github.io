/* Cut Scene Player by chronodumb ©2019 */

let _act;
let _line=0;
let _vars={};

function play(act,line=0,vars={}){
    _act = act;
    _line = line;
    _vars = vars;

    next();
}

