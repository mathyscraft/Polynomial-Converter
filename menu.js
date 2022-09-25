const css = document.documentElement.style
let style = 0;
sessionStorage.setItem("style", style);

if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkmode() ;
}

function menu() {

    document.getElementById("overlay").hidden  = !document.getElementById("overlay").hidden ;
    document.getElementById("nav").hidden  = !document.getElementById("nav").hidden ;
}

function darkmode() {
    style = 1;
    sessionStorage.setItem("style", style);
    
    css.setProperty('--couleur1', '#131313');
    css.setProperty('--couleur2', '#313131');
    css.setProperty('--couleur3', '#f1f1f1');
    css.setProperty('--couleur4-1', '#7209b7');
    css.setProperty('--couleur4-2', '#8f3dc5');

    document.getElementById('darkmode-button').setAttribute("style", 
        "background-color: white;"+
        "color: black;");
    css.setProperty('--darkmode-icon', 'url(darkmode_black.svg)');
    document.getElementById('originalmode-button').setAttribute("style", "");
    document.getElementById('businessmode-button').setAttribute("style", "");

    document.getElementById("image").setAttribute("src", "courbe_1.png") ;
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

    document.getElementById("image").setAttribute("src", "courbe_0.png") ;
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

    document.getElementById("image").setAttribute("src", "courbe_2.png");
}
