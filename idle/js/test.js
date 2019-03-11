console.log("test");

var x = 0;
var i = 1;

update();
function update(){
    x += i;
    draw();
    setTimeout(function(){update()},1e3);
}
function upgrade(a){
    switch (a){
        case 10:
            if (x >= 10){
                x-=10;
                i++;
                draw();
            }
            break;
    }
}
function draw(){
    document.getElementById("x").innerHTML=x;
    console.log("draw " + x)
}