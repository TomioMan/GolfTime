const tutContainer = document.getElementById("tutorial");
const tutorialNo = document.getElementById("tutorialNo");
const tutorialYes = document.getElementById("tutorialYes");

if (worldIndex == 0 && levelIndex == 0) {
    tutContainer.style.display = "flex"
}

tutorialNo.addEventListener("click", ()=> {
    tutContainer.style.opacity = "0%"
    setTimeout(()=>{
        tutContainer.style.display = "none"
    },200)
});

tutorialYes.addEventListener("click", ()=> {
    tutContainer.style.opacity = "0%"
    setTimeout(()=>{
        tutContainer.style.display = "none"
    },200)
    tutorialStep1.style.display = "flex"
});


const tutorialStep1 = document.getElementById("tutorialStep1")
const tutorialStep1button = document.getElementById("tutorialStep1button")

const tutorialStep2 = document.getElementById("tutorialStep2")
const tutorialStep2button = document.getElementById("tutorialStep2button")

const tutorialStep3 = document.getElementById("tutorialStep3")
const tutorialStep3button = document.getElementById("tutorialStep3button")

const tutorialStep4 = document.getElementById("tutorialStep4")
const tutorialStep4button = document.getElementById("tutorialStep4button")

const tutorialStep5 = document.getElementById("tutorialStep5")
const tutorialStep5button = document.getElementById("tutorialStep5button")


tutorialStep1button.addEventListener("click", ()=>{
    tutorialStep1.style.opacity = "0%"
    tutorialStep1.style.transform = "translateY(50px)"
    tutorialStep2.style.display = "flex"
    setTimeout(()=>{
        tutorialStep1.style.display = "none"
    },200);
    bodyClicked = false;
});

tutorialStep2button.addEventListener("click", ()=>{
    tutorialStep2.style.opacity = "0%"
    tutorialStep2.style.transform = "translateY(50px)"
    tutorialStep3.style.display = "flex"
    setTimeout(()=>{
        tutorialStep2.style.display = "none"
    },200)
    bodyClicked = false;
});

tutorialStep3button.addEventListener("click", ()=>{
    tutorialStep3.style.opacity = "0%"
    tutorialStep3.style.transform = "translateY(50px)"
    tutorialStep4.style.display = "flex"
    setTimeout(()=>{
        tutorialStep3.style.display = "none"
    },200)
    bodyClicked = false;
});

tutorialStep4button.addEventListener("click", ()=>{
    tutorialStep4.style.opacity = "0%"
    tutorialStep4.style.transform = "translateY(50px)"
    tutorialStep5.style.display = "flex"
    setTimeout(()=>{
        tutorialStep4.style.display = "none"
    },200)
    bodyClicked = false;
});

tutorialStep5button.addEventListener("click", ()=>{
    tutorialStep5.style.opacity = "0%"
    tutorialStep5.style.transform = "translateY(50px)"
    setTimeout(()=>{
        tutorialStep5.style.display = "none"
    },200)
    bodyClicked = false;
});