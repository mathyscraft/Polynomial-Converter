const css = document.documentElement.style //Permet d'acceder au css pour par la suite en modifier les variables
let style = 0; // Définie le style de base en mode original
sessionStorage.setItem("style", style);

// Si le navigateur est en mode sombre alors le site passe en mode sombre
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector("#icon-page").setAttribute("href", "polynomial_icon_darkmode.svg")
    darkmode() ;
}

function menu() {
    // Lorsque le bouton menu est cliqué, si l'attribut hidden est actif 
    // alors il ne l'est plus et vice versa ce qui permet de cacher ou d'afficher le menu
    document.getElementById("overlay").hidden  = !document.getElementById("overlay").hidden ;
    document.getElementById("nav").hidden  = !document.getElementById("nav").hidden ;
}

function darkmode() {
    style = 1; // permet lorque la fonction clic() est lancée d'afficher la bonne image
    sessionStorage.setItem("style", style); 
    
    css.setProperty('--couleur1', '#131313'); // attribut à la variable css la couleur de fond 1
    css.setProperty('--couleur2', '#313131'); //couleur de fond 2
    css.setProperty('--couleur3', '#f1f1f1'); //couleur du texte
    css.setProperty('--couleur4-1', '#7209b7'); //couleur des boutons
    css.setProperty('--couleur4-2', '#8f3dc5'); //couleurs des boutons survolés

    document.getElementById('darkmode-button').setAttribute("style", 
        "background-color: white;"+
        "color: black;"); //modifie l'apparence du bouton darkmode en "mode actif"
    css.setProperty('--darkmode-icon', 'url(darkmode_black.svg)'); // change aussi la couleur de l'icone
    document.getElementById('originalmode-button').setAttribute("style", ""); //reset l'apparence dite "active" des autres boutons
    document.getElementById('businessmode-button').setAttribute("style", "");

    document.getElementById("image").setAttribute("src", "img/polynomial_img_1.svg") ;
}

function originalmode () {
    style = 0;
    sessionStorage.setItem("style", style);

    css.setProperty('--couleur1', '#283618');
    css.setProperty('--couleur2', '#606c38');
    css.setProperty('--couleur3', '#fefae0');
    css.setProperty('--couleur4-1', '#bc6c25');
    css.setProperty('--couleur4-2', '#d68844');

    document.getElementById('darkmode-button').setAttribute("style", "");
    css.setProperty('--darkmode-icon', 'url(darkmode_white.svg)');
    document.getElementById('originalmode-button').setAttribute("style",
        "background-color: white;"+
        "color: black;");
    document.getElementById('businessmode-button').setAttribute("style", "");

    document.getElementById("image").setAttribute("src", "img/polynomial_img_0.svg") ;
}

function businessmode () {
    style = 2;
    sessionStorage.setItem("style", style);

    css.setProperty('--couleur1', '#f1f1f1');
    css.setProperty('--couleur2', '#c2c2c2');
    css.setProperty('--couleur3', '#2b2b2b');
    css.setProperty('--couleur4-1', '#5f77ff');
    css.setProperty('--couleur4-2', '#8193f7');

    document.getElementById('darkmode-button').setAttribute("style", "");
    css.setProperty('--darkmode-icon', 'url(darkmode_white.svg)');
    document.getElementById('originalmode-button').setAttribute("style","");
    document.getElementById('businessmode-button').setAttribute("style",
    "background-color: white;"+
    "color: black;");

    document.getElementById("image").setAttribute("src", "img/polynomial_img_2.svg");
}
