const css = document.documentElement.style
let style = 0;
localStorage.setItem("style", style);

function menu() {

    document.getElementById("overlay").hidden  = !document.getElementById("overlay").hidden ;
    document.getElementById("nav").hidden  = !document.getElementById("nav").hidden ;
}

function darkmode() {
    style = 1;
    localStorage.setItem("style", style);
    
    css.setProperty('--couleur1', '#001d3d');
    css.setProperty('--couleur2', '#003566');
    css.setProperty('--couleur3', '#f1f1f1');
    css.setProperty('--couleur4-1', '#7209b7');
    css.setProperty('--couleur4-2', '#8f3dc5');
    document.getElementById("image").setAttribute("src", "img/courbe_1.png") 
}

function originalmode () {
    style = 0;
    localStorage.setItem("style", style);

    css.setProperty('--couleur1', '#283618');
    css.setProperty('--couleur2', '#606c38');
    css.setProperty('--couleur3', '#fefae0');
    css.setProperty('--couleur4-1', '#bc6c25');
    css.setProperty('--couleur4-2', '#d68844');
    document.getElementById("image").setAttribute("src", "img/courbe_0.png") 
}

function businessmode () {
    style = 2;
    localStorage.setItem("style", style);

    css.setProperty('--couleur1', '#f1f1f1');
    css.setProperty('--couleur2', '#c2c2c2');
    css.setProperty('--couleur3', '#2b2b2b');
    css.setProperty('--couleur4-1', '#5f77ff');
    css.setProperty('--couleur4-2', '#8193f7');
    document.getElementById("image").setAttribute("src", "img/courbe_2.png") 
}
