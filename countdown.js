var countDownDate = new Date("Jun 25, 2023 10:00:00").getTime();
var x = setInterval(function (){
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance/ (1000*60*60*24));
    var hours = Math.floor( (distance % (1000*60*60*24) ) / (1000*60*60) );
    var minutes = Math.floor( (distance % (1000*60*60) ) / (1000*60) );
    var seconds = Math.floor( (distance % (1000*60) ) / 1000 );

    document.getElementById("peace").innerHTML = days +" : " +hours+" : " +minutes+" : " +seconds+" ";

    if(distance < 0){
        clearInterval(x);
        document.getElementById("peace").innerHTML = "Pengumuman Juara"
    }
  },1000)