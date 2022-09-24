var opened = 0;

function courbe() {

    let a = localStorage.getItem("a");
    let b = localStorage.getItem("b");
    let c = localStorage.getItem("c");
    let alpha = localStorage.getItem("alpha");
    let beta = localStorage.getItem("beta");

    let zoom = localStorage.getItem("zoom");

    // Si un graphique a dejà été créé alors il est supprimé
    if (opened != 0 ) {
        document.querySelector("#graph").innerHTML = "" ;
    }

    let parentDiv = document.getElementById("graph");

    let canvas =  document.createElement('canvas');
    parentDiv.appendChild(canvas);
        
    parentDiv.appendChild(document.createElement("br"));

    let button1 = document.createElement("button");
    button1.setAttribute("onclick", "zoomMoins()");
    button1.setAttribute("id", "zoom1");
    button1.innerHTML = "-" ;
    parentDiv.appendChild(button1);

    let zoomValue = document.createElement("span");
    zoomValue.setAttribute("id", "zoomValue")
    zoomValue.innerHTML = zoom ;
    parentDiv.appendChild(zoomValue);

    let button2 = document.createElement("button");
    button2.setAttribute("onclick", "zoomPlus()");
    button2.setAttribute("id", "zoom2");
    button2.innerHTML = "+" ;
    parentDiv.appendChild(button2);


    opened = 1; // Indique qu'un graphique a été généré

    canvas.width = 500;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 500, 500);

    // Génère l'absisse et l'ordonné
    ctx.beginPath();
        ctx.strokeStyle = "#3f3f3f";
        ctx.lineWidth = 3;
        ctx.moveTo(0, 250);
        ctx.lineTo(500, 250);
        ctx.moveTo(250, 0);
        ctx.lineTo(250, 500);
    ctx.stroke();

    // Génère les carreaux
    ctx.beginPath();
        ctx.strokeStyle = "#3f3f3f";
        ctx.lineWidth = 1;
        var line = 0;
        for (var i = 0; i < 9; i++) {
            line = line + 50
            ctx.moveTo(line, 0);
            ctx.lineTo(line, 500);
        }
        line = 0;
        for (var i = 0; i < 9; i++) {
            line = line + 50
            ctx.moveTo(0, line);
            ctx.lineTo(500, line);
        }
    ctx.stroke();


    // Génère la courbe
    ctx.translate(250, 250);
    ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 3;
        
        var x = -250;
        for (var i = 0; i < 5000; i++) {
            ctx.moveTo(x*zoom, y*zoom);
            x = x+0.1;
            var y = (a*x**2+b*x+1*c)*-1;
            ctx.lineTo(x*zoom, y*zoom);
        }
    ctx.stroke();

    ctx.font = "32px serif";
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.beginPath();
        ctx.arc(alpha*zoom, beta*-zoom, 5, 0, 100);
    ctx.fill();
    ctx.stroke();
    ctx.fillText("\u03b2", zoom*alpha+10, -zoom*beta-5);

}