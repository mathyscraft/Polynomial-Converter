var opened = 0;

function courbe() {

    let a = localStorage.getItem("a");
    let b = localStorage.getItem("b");
    let c = localStorage.getItem("c");

    // Si un graphique a dejà été créé alors il est supprimé
    console.log(document.querySelector('canvas'), opened)
    if (opened != 0 ) {
        document.querySelector('canvas').remove();
    }
    
    // Crée le nouveau nœud à insérer
    let newNode = document.createElement('canvas');

    // Obtient une référence au nœud parent
    let parentDiv = document.getElementById("copyright").parentNode;

    // Ajoute le nouvel élément créé dans le DOM
    let sp2 = document.getElementById("copyright");
    parentDiv.insertBefore(newNode, sp2);

    opened = 1; // Indique qu'un graphique a été généré

    newNode.width = 500;
    newNode.height = 500;
    var ctx = newNode.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 500, 500);

    // Génère l'absisse et l'ordonné
    ctx.beginPath();
        ctx.strokeStyle = "#3f3f3f";
        ctx.moveTo(0, 250);
        ctx.lineTo(500, 250);
        ctx.moveTo(250, 0);
        ctx.lineTo(250, 500);
    ctx.stroke();

    // Génère la courbe
    ctx.beginPath();
    ctx.translate(250, 250);
        ctx.strokeStyle = "blue";

        var x = -250;
        var y = 0;
        for (var i = 0; i < 500; i++) {
            ctx.moveTo(x*5, y*5);
            x++ ;
            y = (a*x**2+b*x+1*c)*-1;
            ctx.lineTo(x*5, y*5)
        }
    ctx.stroke();

}