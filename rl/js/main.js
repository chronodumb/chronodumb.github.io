console.log("init");


var _map = createMap(20,20)


function createMap(columnCount, rowCount) {
    const map = [];
    for (let x = 0; x < columnCount; x++) {
        map[x] = []; // set up inner array
        for (let y = 0; y < rowCount; y++) {
        }
    }
    return map;
}

function init(){
    $("body").append("<div id='main'></div>")
}

function render(){
}

$(document).ready(function(){
    init();
})

