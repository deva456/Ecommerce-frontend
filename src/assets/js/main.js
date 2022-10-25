function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function ImageUpdate(event) {
  document.querySelector('#MainImg').src = event.children[0].src;
  
}


