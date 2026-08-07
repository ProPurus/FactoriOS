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

const apps = ["intro", "notes", "terminal"];
const youtuberIDs = new Map([
  ["doshdoshington", "@DoshDoshington"],
  ["michaelhendriks", "@MichaelHendriks"],
  ["nilaus", "@Nilaus"],
  ["trupen", "@Trupen"],
  ["admiralgaming", "@admiraltygaming"],
  ["docjade", "@DocJade"],
  ["xterminator", "@Xterminator"],
  ["neuroplastic", "@NeuroplasticIdeas"],
  ["avadiistrategy", "@AVADIIStrategy"]
]);

// some terminal-action
let terminalInput = document.getElementById("terminalinput");
let terminalContent = document.getElementById("terminalcontent");

function printToTerminal(text){
  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = text;
  document.getElementById("terminalinputline").before(newParagraph);
}

if (terminalInput){
  terminalInput.addEventListener("keydown", (key) => {
    if (key.key === "Enter"){
      let input = terminalInput.value;
      printToTerminal("> " + input);
      terminalInput.value = "";

      let command = input.split(" ")[0];
      let argument = input.split(" ")[1];
      switch(command.toLowerCase()){
        case "test":
          printToTerminal("Hello, World!");
          break;
        case "open":
          let app = argument.toLowerCase();
          let isRealApp = false;
          for(let i = 0; i < apps.length; i++){
            if (app === apps[i]){
              openWindow(document.getElementById(app));
              isRealApp = true;
            }
          }
          if (isRealApp){
            printToTerminal("Successfully opened " + app);
          } else {
            printToTerminal('"' + app + '" ' + "is'nt a real app");
          }
          break;
        case "help":
          printToTerminal('Command list: "open [app]" opens said app,' + 
            ' "developer" opens the website of the game,' + 
            ' "visit [youtuber]" leads to the youtube-homepage of a youtuber (only certain ones I selected) (please write names of youtubers consisting of multiple words as one word)');
          break;
        case "developer":
          window.open("https://www.factorio.com/");
          printToTerminal("Successfully opened the game's website");
          break;
        case "visit":
          let youtuber = argument.toLowerCase();
          if (youtuberIDs.has(youtuber)){
            window.open("https://www.youtube.com/" + youtuberIDs.get(youtuber));
            printToTerminal("Successfully opened the youtube of " + youtuber);
          } else {
            printToTerminal("Sorry, your youtuber isn't in my list");
          }
          break;
        default:
          if (command === ""){
            printToTerminal("Please enter an actual command ;)");
          } else {
            printToTerminal(command.length < 10 ?
              '"' + command + '" ' + "is'nt a valid command" :
              "This isn't a valid command");
          }
          break;
      }
    }
  })
}
