let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let hasResized = false;
const warningBoxButton = document.getElementById("warningBoxButton")

setInterval(checkScreenSize , 50);

function checkScreenSize() {
    //halfway through doign this i realized i could have done most of this in CSS, but whatever im keeping it in 😎
    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;
    const warningBoxDisplayHeight = document.getElementById("warningBoxDisplayHeight");
    const warningBoxDisplayWidth = document.getElementById("warningBoxDisplayWidth");

    warningBoxDisplayHeight.innerText = `Height: ${screenHeight}px`;
    warningBoxDisplayWidth.innerText = `Width: ${screenWidth}px`;

    const DisplayBox = document.getElementById("warningBoxDisplay")
    DisplayBox.style.height = `${screenHeight / 10}px`;
    DisplayBox.style.width = `${screenWidth / 10}px`;
    warningBoxDisplayHeight.style.position = "fixed";
    warningBoxDisplayWidth.style.position = "fixed";
    warningBoxDisplayHeight.style.transform = `translateX(${-(screenWidth / 10) - 20}px)`;
    warningBoxDisplayWidth.style.transform = `translateY(${(screenHeight / 10) - 20 }px)`;
    DisplayBox.style.marginBottom = `${screenHeight / 20}px`;

    const warningBoxENOUGH = document.getElementById("warningBoxENOUGH")
    if (document.documentElement.clientWidth > 1200 && screenWidth < 1200) {
        warningBoxENOUGH.innerText = "You just have to put it on fullscreen and it will be okay B)";
    }
    if (screenHeight < 900) {
        warningBoxDisplayHeight.style.color = "red";
        DisplayBox.style.borderLeft = "red 4px solid";
        DisplayBox.style.borderRight = "red 4px solid";
    } else {
        warningBoxDisplayHeight.style.color = "white";
        DisplayBox.style.borderLeft = "white 2px solid";
        DisplayBox.style.borderRight = "white 2px solid";
    }
    if (screenWidth < 1200) {
        warningBoxDisplayWidth.style.color = "red";
        DisplayBox.style.borderBottom = "red 4px solid";
        DisplayBox.style.borderTop = "red 4px solid";
    } else {
        warningBoxDisplayWidth.style.color = "white";
        DisplayBox.style.borderBottom = "white 2px solid";
        DisplayBox.style.borderTop = "white 2px solid";
    }

    const warningBoxH1 = document.getElementById("warningBoxH1")
    if(screenHeight > 900 && screenWidth > 1200) {
        warningBoxButton.classList.add("warBoxButton_ON")
        warningBoxButton.classList.remove("warBoxButton_OFF")
        warningBoxButton.innerText = "Let's get golfing!";
        warningBoxH1.innerText = "Your device's screen now IS large enough for the experience!";
        hasResized = true;
    } else {
        warningBoxButton.classList.add("warBoxButton_OFF")
        warningBoxButton.classList.remove("warBoxButton_ON")
        warningBoxButton.innerText = "Resize to Continue";
        warningBoxH1.innerText = "Your device's screen isn't large enough for the experience!";
    }
    
};

document.getElementById('warningBoxButton').addEventListener('click', () => {
    if (hasResized == true) {
        transition()
        setTimeout(() => goTo("index.html"), 1200);
    }
});


function goGame() {
    if (screenHeight < 900 || screenWidth < 1200) {
        const warningBox = document.getElementById("warningBox");
        warningBox.style.display = "flex";
        warningBox.style.right = "0%";

    } else {
        transition()
        setTimeout(() => goTo("index.html"), 1200);
    }
};

function Settings() {
    transition()
};

function goCredits() {
    transition()
    setTimeout(() => goTo("credits.html"), 1200);
};

function goTo(href) {
    window.location.href = href
};

function transition() {
    const box = document.getElementById("transitionBox")
    box.style.right = "0%";
};

function openLevelSelection() {
    const levelSelector = document.getElementById("levelSelector")
    levelSelector.style.display = "flex"
    levelSelector.style.right = "0%";
};
function closeLevelSelection() {
    const levelSelector = document.getElementById("levelSelector")
    levelSelector.style.right = "100%";
}
function goToLevel(worldIndex, levelIndex) {
    localStorage.setItem("worldIndex", worldIndex);
    localStorage.setItem("levelIndex", levelIndex);
    goGame()
};