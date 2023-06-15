var opened = 0;

function courbe() {

    let a = localStorage.getItem("a");
    let b = localStorage.getItem("b");
    let c = localStorage.getItem("c");
    let alpha = localStorage.getItem("alpha");
    let beta = localStorage.getItem("beta");

    let zoom = localStorage.getItem("zoom");

    let parentDiv = document.getElementById("graph");

    // Si un graphique a déjà été créé alors il est supprimé
    if (opened != 0 ) {
        parentDiv.innerHTML = "";
    }

    let url = document.createElement('a');
    parentDiv.appendChild(url) // Permettra par la suite de faire un lien clicable de l'image

    let canvas =  document.createElement('canvas');
    url.appendChild(canvas);
        
    parentDiv.appendChild(document.createElement("br"));

    // Bouton pour dézoomer
    let button1 = document.createElement("button");
    button1.setAttribute("onclick", "zoomMoins()");
    button1.setAttribute("id", "zoom1");
    button1.innerHTML = "-" ;
    parentDiv.appendChild(button1);

    // Affiche la valeur actuelle du zoom
    let zoomValue = document.createElement("span");
    zoomValue.setAttribute("id", "zoomValue")
    zoomValue.innerHTML = zoom ;
    parentDiv.appendChild(zoomValue);

    // Bouton pour zoomer
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
        // style
        ctx.strokeStyle = "#3f3f3f";
        ctx.lineWidth = 1;
        ctx.font = "20px serif";
        ctx.fillStyle = "black";
        
        // tracé des lignes verticales 
        var line = 0;
        for (var i = 0; i < 9; i++) {
            line = line + 50
            ctx.moveTo(line, 0);
            ctx.lineTo(line, 500);
            if (line-250 != 0) {
                ctx.fillText(Math.round(((line-250)/-zoom)*10)/10, 255, line-2);
            }
        }

        // tracé des lignes horizontales
        line = 0;
        for (var i = 0; i < 9; i++) {
            
            line = line + 50
            ctx.moveTo(0, line);
            ctx.lineTo(500, line);
            ctx.fillText(Math.round(((line-250)/zoom)*10)/10, line+2, 245);
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
        ctx.arc(alpha*zoom, beta*-zoom, 5, 0, 100); // trace un cercle au niveau de l'extremum
    ctx.fill();
    ctx.stroke();
    ctx.fillText("\u03b2", zoom*alpha+10, -zoom*beta-5); // écrit la lettre grecque bêta à l'emplacement de l'extremum

    // Permet que lorque l'image est cliquée, elle s'ouvre dans un autre onglet
    // notament pour qu'elle soit lisible sur mobile
    // cf. l20
    url.setAttribute("href", canvas.toDataURL('image/png'));
    url.setAttribute("target", "_blank");
}