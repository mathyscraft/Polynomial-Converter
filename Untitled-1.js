var a;
var b;
var c;

var i = 0;

function clic(){


    for (i = i; i < 1; i++) {
        document.getElementById("opened-bloc").innerHTML +=
        "<img src='courbe.png'>";
    }

    var form = document.getElementById("form");
    a = form.elements[0].value ;
    b = form.elements[1].value ;
    c = form.elements[2].value ;
    console.log(a+" ; "+b+" ; "+c);


    var delta = b**2-4*a*c ;
    var alpha = (-b)/(2*a) ;
    var beta = -delta/(4*a) ;
    var xa = (-b-Math.sqrt(delta))/(2*a);
    var xb = (-b+Math.sqrt(delta))/(2*a);

    var signeB;
    var signeC;
    if (b < 0) {
        b = -b
        signeB = '-'
    } else {
        signeB = '+'
    }
    if (c < 0) {
        c = -c
        signeC = '-'
    } else {
        signeC = '+'
    }

    var signeAlpha;
    var signeBeta;
    if (alpha < 0) {
        alpha = -alpha
        signeAlpha = '+'
    } else {
        signeAlpha = '-'
    }
    if (beta < 0) {
        beta = -beta
        signeBeta = '-'
    } else {
        signeBeta = '+'
    }

    if (xa < xb) {

        if (a < 0) {
            signeContraire = "]"+xa+";"+xb+"[ > 0";
        } else {
            signeContraire = "]"+xa+";"+xb+"[ < 0";
        }

    } else {

        if (a < 0) {
            signeContraire = "]"+xb+";"+xa+"[ > 0";
        } else {
            signeContraire = "]"+xb+";"+xa+"[ < 0";
        }

    }
    let racineA = xa;
    let racineB = xb;

    var signeXa;
    var signeXb;
    if (xa < 0) {
        xa = -xa
        signeXa = '+'
        console.log("x1: -"+xa);
    } else {
        signeXa = '-'
        console.log("x1: +"+xa);
    }
    if (xb < 0) {
        xb = -xb
        signeXb = '+'
        console.log("x2: -"+xb);
    } else {
        signeXb = '-'
        console.log("x2: +"+xb);
    }


    console.log("Forme polynomiale: "+a+"x²"+signeB+b+"x"+signeC+c);

    console.log("Forme canonique: "+a+"(x"+signeAlpha+alpha+")"+signeBeta+beta);

    if (delta >= 0) {
        formeFactorisee = "Forme factorisée: <span class='result'>"+a+"(x"+signeXa+xa+") (x"+signeXb+xb+")</span>";
        console.log("Forme factorisée: "+a+"(x"+signeXa+xa+")(x"+signeXb+xb+")");
    } else {
        formeFactorisee = "Pas de forme factorisée";
        console.log(formeFactorisee);
    }

    console.log("Delta: "+delta);

    console.log(signeContraire)

    document.getElementById("reponse").innerHTML = 
    "Forme polynomiale: <span class='result'>"+a+"x²"+signeB+b+"x"+signeC+c +"</span><br>"+
    "Forme canonique: <span class='result'>"+a+"(x"+signeAlpha+alpha+") "+signeBeta+beta +"</span><br>"+
    formeFactorisee +"<br>"+
    "Delta: <span class='result'>"+delta +"</span><br>"+
    "Racine n°1 : <span class='result'>"+racineA+"</span><br>"+
    "Racine n°2 : <span class='result'>"+racineB+"</span><br>"+
    "<span class='result'>"+signeContraire+"</span><br>"
    

} 