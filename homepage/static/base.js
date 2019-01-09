function openNav() {
    document.getElementById("sideMenu").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("backSideMenu").style.display = 'block';    
}
function closeNav() {
    document.getElementById("sideMenu").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("backSideMenu").style.display = 'none'; 

}