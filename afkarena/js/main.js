const exp=[0,89,133,170,204,239,273,307,343,380,417,456,497,539,583,629,676,726,778,831,888,946,1008,1071,1138,1208,1280,1356,1436,1518,1605,1695,1789,1887,1989,2096,2208,2325,2446,2573,2706,2845,2981,3124,3272,3426,3587,3754,3928,4109,4298,4742,5191,5658,6143,6647,7169,7710,8269,8848,9447,1e4,11e3,11e3,12e3,13e3,13e3,14e3,15e3,15e3,16e3,17e3,18e3,18e3,19e3,2e4,21e3,21e3,22e3,23e3,24e3,25e3,26e3,26e3,27e3,28e3,29e3,3e4,3e4,31e3,32e3,33e3,34e3,35e3,35e3,36e3,37e3,37e3,38e3,38e3,39e3,41e3,44e3,46e3,49e3,53e3,56e3,6e4,64e3,69e3,74e3,79e3,84e3,9e4,97e3,103e3,111e3,118e3,127e3,135e3,144e3,154e3,164e3,174e3,185e3,196e3,207e3,219e3,231e3,244e3,256e3,269e3,283e3,296e3,31e4,323e3,337e3,352e3,366e3,38e4,395e3,409e3,423e3,437e3,451e3,465e3,479e3,493e3,507e3,521e3,535e3,549e3,563e3,577e3,592e3,606e3,62e4,635e3,65e4,664e3,679e3,694e3,709e3,723e3,738e3,752e3,767e3,782e3,797e3,813e3,828e3,844e3,86e4,876e3,892e3,909e3,926e3,943e3,96e4,978e3,995e3,1014e3,1031e3,1048e3,1066e3,1084e3,1102e3,1121e3,114e4,1159e3,1178e3,1198e3,1218e3,1239e3,1259e3,128e4,1302e3,1323e3,1345e3,1368e3,1391e3,1414e3,1436e3,1458e3,1481e3,1504e3,1528e3,1551e3,1575e3,16e5,1625e3,165e4,1676e3,1702e3,1728e3,1755e3,1783e3,181e4,1839e3,1867e3,1896e3,1926e3,1956e3,1986e3,2017e3,2048e3,208e4,2112e3,2145e3,2179e3,2212e3,2247e3,2282e3,2317e3,2353e3,239e4,2427e3,2465e3,2503e3,2542e3,129e5];
const gold=[0,23,72,134,222,314,444,600,740,892,1116,1300,1577,1793,2126,2377,2638,3056,3353,3837,4172,4304,4635,4769,4901,5251,5386,5750,5888,6025,6407,6547,6686,7087,7229,7371,7790,7935,8368,8516,8665,9116,9269,9421,9891,1e4,1e4,1e4,1e4,11e3,11e3,12e3,13e3,14e3,15e3,16e3,17e3,18e3,19e3,2e4,2e4,22e3,23e3,24e3,25e3,25e3,27e3,28e3,28e3,3e4,3e4,31e3,33e3,33e3,35e3,35e3,36e3,37e3,38e3,38e3,4e4,4e4,42e3,42e3,43e3,44e3,44e3,45e3,46e3,46e3,48e3,48e3,48e3,49e3,49e3,49e3,5e4,5e4,51e3,5e4,5e4,53e3,55e3,58e3,61e3,63e3,67e3,7e4,75e3,79e3,83e3,87e3,91e3,96e3,101e3,106e3,112e3,12e4,126e3,132e3,139e3,145e3,152e3,159e3,166e3,173e3,184e3,191e3,198e3,206e3,213e3,22e4,227e3,234e3,241e3,252e3,259e3,265e3,272e3,278e3,284e3,289e3,295e3,3e5,311e3,316e3,32e4,325e3,329e3,333e3,337e3,341e3,345e3,348e3,352e3,361e3,365e3,368e3,371e3,373e3,376e3,379e3,382e3,384e3,387e3,396e3,398e3,401e3,403e3,405e3,407e3,41e4,412e3,414e3,416e3,418e3,427e3,429e3,431e3,433e3,436e3,438e3,44e4,442e3,444e3,446e3,448e3,457e3,459e3,461e3,463e3,465e3,467e3,469e3,471e3,473e3,475e3,477e3,479e3,489e3,491e3,493e3,496e3,498e3,5e5,502e3,504e3,506e3,508e3,51e4,513e3,523e3,525e3,527e3,53e4,532e3,534e3,536e3,539e3,541e3,543e3,545e3,548e3,55e4,561e3,563e3,566e3,568e3,57e4,573e3,575e3,578e3,58e4,582e3,585e3,587e3,59e4,601e3,604e3,606e3,304e4];
const essence=[0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,250,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1200,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3e3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6e3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12e3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25e3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3e4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4e4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3174];
const sum = arr => arr.reduce((a,b) => a + b, 0)

var h=1;
var iexp=0,igold=0,iess=0,cexp=0,cgold=0,cess=0;


function add(){
    h++;
    $(".total").before('<tr class="hero" id="h' + h + '"> <td>'+h+'</td><td><input type="text" class="slvl" value=""/></td><td><input type="text" class="elvl" value=""/></td><td class="val"></td><td class="val"></td><td class="val"></td><td class="time sm"></td><td class="time sm"></td><td class="time sm"></td><td><input type="button" onclick="remove(\'h'+h+'\')" value="x"/></td></tr>');
    calculate();
}

function remove(id){
    $("#"+id).detach();
    calculate();
}

Number.prototype.pretty = function(){
    let value = this.valueOf();
    let suffixes = ["", "K", "M", "B","T"];
    let suffixNum = Math.floor((""+value).length/3);
    let shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        let shortNum = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}

$(document).ready(function(){

    // calculate();

});

function calculate(){

    let total = {
        exp : 0,
        gold : 0,
        ess : 0,

        timeexp : 0,
        timegold : 0,
        timeess : 0,
    }

    let ctotal = {
        exp : -cexp,
        gold : -cgold,
        ess : -cess,

        timeexp : 0,
        timegold : 0,
        timeess : 0,
    }


    $(".hero").each(function(i){
        let start = $(this).find(".slvl").val();
        let end = $(this).find(".elvl").val();

        console.log(start + "," + end)

        let needexp = sum(exp.slice(start, end));
        let needgold = sum(gold.slice(start, end));
        let needessence = sum(essence.slice(start, end));

        $($(this).children()[3]).attr("title",needexp);
        $($(this).children()[3]).html(needexp.pretty());

        $($(this).children()[4]).attr("title",needgold);
        $($(this).children()[4]).html(needgold.pretty());

        $($(this).children()[5]).attr("title",needessence);
        $($(this).children()[5]).html(needessence.pretty());

        total.exp += needexp;
        total.gold += needgold;
        total.ess += needessence;

        getIncome();

        if (iexp > 0) {
            let timeexp = needexp / iexp;
            $($(this).children()[6]).attr("title", timeexp);
            $($(this).children()[6]).html(formatTime(timeexp));
            total.timeexp += timeexp;
        }

        if (igold > 0) {
            let timegold = needgold / igold;
            $($(this).children()[7]).attr("title", timegold);
            $($(this).children()[7]).html(formatTime(timegold));
            total.timegold += timegold;
        }

        if (iess > 0) {
            let timeessence = needessence / iess;
            $($(this).children()[8]).attr("title", timeessence);
            $($(this).children()[8]).html(formatTime(timeessence));
            total.timeess += timeessence;
        }

    });

    let x = 0;
    for (let t in total) {
        ctotal[t] = ctotal[t]+total[t];

        console.log("xxxx" + ctotal[t])

        if (x < 3){
            total[t] = total[t].pretty();
            ctotal[t] = ctotal[t].pretty();
        } else {
            total[t] = formatTime(total[t]);
            ctotal[t] = formatTime(ctotal[t]);
        }


        x++;
        $($(".total").children()[x]).html(total[t]);
        $($(".ctotal ."+t)).html(total[t]);
        // $($(".ctotal ."+t)).html(ctotal[t]);
    }


    console.log($(".hero").length );
    if ($(".hero").length > 1){
        $(".total").show();
    } else {
        $(".total").hide();
    }
}

function showtime(t){
    $(".val,.time").toggle();
}

// DD:HH:MM:SS
function formatTime(s){
    const DAY = 24 * 60 * 60;
    const HOUR = 60 * 60;
    const MIN = 60;

    let day = Math.floor(s / DAY);
    s-= (day * DAY);

    let hour = Math.floor(s / HOUR);
    s-= (hour * HOUR);

    let min = Math.floor(s / MIN);
    s-= (min * MIN);

    let sec = Math.floor(s);

    return ((day > 0)? day + "d " : "")   + ((hour > 0)? hour + "h " : "")  + ((min > 0)? min + "m " : "")  + ((sec > 0) ? sec + "s" : "");
}

function getIncome() {
    iexp = $("#iexp").val() || 0;
    igold = $("#igold").val() || 0;
    iess = $("#iess").val() || 0;

    iexp = iexp / 60;
    igold = igold / 60;
    iess = iess / 120 / 60;
}

function getOwned(){
    cexp = $("#cexp").val() || 0;
    cgold = $("#cgold").val() || 0;
    cess = $("#cess").val() || 0;
}