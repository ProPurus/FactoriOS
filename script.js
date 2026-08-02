// Make the DIV element draggable:
dragElement(document.getElementById("intro"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeWindow(element){
    element.style.display = "none"
}

function openWindow(element){
    element.style.display = "flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

function addApp(name){
  let screen = document.querySelector("#" + name);
  let icon = document.querySelector("#" + name + "icon");
  let close = document.querySelector("#" + name + "close");
  close.addEventListener("click" , () => closeWindow(screen));
  icon.addEventListener("click", () => handleIconTap(icon));
  addWindowTapHandling(screen);
  dragElement(document.getElementById(name));
}

var introScreen = document.querySelector("#intro")
var introScreenClose = document.querySelector("#introclose")
var introScreenOpen = document.querySelector("#introopen")
introScreenClose.addEventListener("click", function(){
    closeWindow(introScreen);
});
introScreenOpen.addEventListener("click", function(){
    openWindow(introScreen);
});
addWindowTapHandling(document.querySelector("#intro"));

addApp("notes");
addApp("terminal");
/*var notesScreen = document.querySelector("#notes")
var notesIcon = document.querySelector("#notesicon")
var notesScreenClose = document.querySelector("#notesclose")
notesIcon.addEventListener("click", () => handleIconTap(notesIcon));
notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));

addWindowTapHandling(document.querySelector("#notes"));*/


var selectedIcon = undefined

function selectIcon(element){
  element.classList.add("selected");
  selectedIcon = element
}

function deselectIcon(element){
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIconTap(element){
  if (element.classList.contains("selected")){
    deselectIcon(element);
    openWindow(document.getElementById(element.id.substring(0, element.id.length - "Icon".length)))
  } else {
    selectIcon(element)
  }
}

var biggestIndex = 5;

function addWindowTapHandling(element){
  element.addEventListener("mousedown", () => handleWindowTap(element))
}

function handleWindowTap(element){
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  deselectIcon(selectedIcon);
}

function updateTime(){
  let currentTime = new Date().toLocaleString();
  let timeText = document.querySelector("#clock");
  timeText.innerHTML = currentTime;
}

setInterval(updateTime, 1000);
