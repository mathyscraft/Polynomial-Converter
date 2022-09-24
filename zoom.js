var zoom = 5;
localStorage.setItem("zoom", zoom);

function zoomMoins() {
    if (zoom > 1) {
        zoom--;
        localStorage.setItem("zoom", zoom);
        courbe()
    }
}
function zoomPlus() {
    if (zoom < 20) {
        zoom++;
        localStorage.setItem("zoom", zoom);
        courbe()
    }
}