const blastButton = document.getElementById('blastButton');
const chargerBar = document.getElementById('chargerBar');
let goingUp = true;
// Sprites
const SpriteBall = 'media/images/ball.png';
const SpriteTransparent = "media/images/Transparent.png"

let bodyClickedMUSIC = false;
document.body.addEventListener('mousedown', function () {
    if (!bodyClickedMUSIC) {
        bodyClickedMUSIC = true;
        const music = new Audio('media/sounds/golf-central.mp3');
        music.volume = 0.05;
        music.loop = true;
        music.play();
    }
});
document.addEventListener('keydown', function () {
    if (!bodyClickedMUSIC) {
        bodyClickedMUSIC = true;
        const music = new Audio('media/sounds/golf-central.mp3')
        music.volume = 0.05; 
        music.loop = true;
        music.play();
    }
});


//trigger debug mode
const debugOutput = document.getElementById('degugOutput');
let debugMode = false;
let noobMode = false;
window.addEventListener('keydown', (event) => {
    if (event.key === 'd' && event.ctrlKey) {
        if (!debugMode) {
            debugMode = true;
            console.log("Debug enabl.");
        }
        else if (debugMode) {
            console.log("Debug disabl.");
            debugMode = false;
        }
    }
    if (event.key === 'n') {
        if (!noobMode) {
            console.log("newborn mode enabled.");
            noobMode = true;
        }
        else if (noobMode) {
            console.log("newborn mode dinabled.");
            noobMode = false;
        }
    }
});

//a flasj function!
function flash(id, time = 1000) {
    const element = document.getElementById(id);
    if (!element) return;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, time);
}

//speed tracker, tracks speed B)
const blastButtonInner = document.getElementById("blastButtonInner")
let ballVelocityX = 0;
let ballVelocityY = 0;
let ballSpeed = 0;
let canFire = true;

function speedTracking() {
    ballVelocityX = ball.velocity.x;
    ballVelocityY = ball.velocity.y;
    ballSpeed = Math.sqrt(ballVelocityX * ballVelocityX + ballVelocityY * ballVelocityY);
    if (debugMode){
        const debugSpeedOutputTotal = document.getElementById("debugSpeedOutputTotal");
        const debugSpeedOutputX = document.getElementById("debugSpeedOutputX");
        const debugSpeedOutputY= document.getElementById("debugSpeedOutputY");

        setInterval(() => {
            debugSpeedOutputTotal.innerHTML = `Ball velocityㅤ:   ${ballSpeed.toFixed(2)}`
            debugSpeedOutputX.innerHTML = `Ball X velocity: ${ballVelocityX.toFixed(2)}`
            debugSpeedOutputY.innerHTML = `Ball Y velocity: ${ballVelocityY.toFixed(2)}`
        }, 100 )
    }
    if (ballSpeed > 0.1) {
        blastButtonInner.style.filter = "saturate(0)";
        chargerBar.style.filter = "saturate(0)";
        blastButton.style.filter = "saturate(0)";
        canFire = false;
        //console.log(ballSpeed)
    } else {
        blastButtonInner.style.filter = "saturate(1)";
        blastButton.style.filter = "saturate(1)";
        chargerBar.style.filter = "saturate(1)";
        canFire = true;
    }
};

speedTrackingClock = setInterval(speedTracking , 50)





// stopping and starting the charger via button.
function chargerBarRunning() {
    let currentHeight = parseInt(chargerBar.style.height) || 0;
    
    if (currentHeight >= 320) {
        goingUp = false;
    } else if (currentHeight <= 40) {
        goingUp = true;
    }
    if (goingUp) {
        if (currentHeight < 200) {
            chargerBar.style.height = (currentHeight + 4) + 'px';
        } else {
            chargerBar.style.height = (currentHeight + 5) + 'px';
        }
    }
    else {
        if (currentHeight < 200) {
            chargerBar.style.height = (currentHeight - 4) + 'px';
        } else {
            chargerBar.style.height = (currentHeight - 5) + 'px';
        }
    }
}

chargerBarClock = setInterval(chargerBarRunning , 10);
let currentHeightExport = 0;

let isChargerBarClockRunning = true;
if (canFire) {
    blastButton.addEventListener('click', () => {
        let currentHeight = parseInt(chargerBar.style.height) || 0;

        if (debugMode) {
            const click = new Audio('media/sounds/button-click.mp3');
            click.volume = 0.1;
            click.play();
        }
        
        if (isChargerBarClockRunning) {
            clearInterval(chargerBarClock);
            isChargerBarClockRunning = false;
            console.log(Math.round(currentHeight / 320 * 100) + "% power"); 
            if (currentHeight >= 305) {
                chargerBar.style.height = '320px';
                console.log("Big Shot!");
                var sonicSpring = new Audio('media/sounds/sonic-spring.mp3');
                sonicSpring.volume = 0.3;
                sonicSpring.play();
            }
            if (currentHeight <= 50) {
                var miBombo = new Audio('media/sounds/mi-bombo-fast.mp3');
                miBombo.volume = 0.1;
                miBombo.play();
                flash("soSmall", 1500)
            }

            if (currentHeight >= 305){
                currentHeightExport = 320;
            } else {
                currentHeightExport = currentHeight
            }
        } 
        else if (!isChargerBarClockRunning && canFire) {
            chargerBarClock = setInterval(chargerBarRunning , 10);
            isChargerBarClockRunning = true;
        }   
    });
}





//victory screen toggle
const victoryScreen = document.getElementById('victoryScreen');
const victoryScreenContent = document.getElementById('victoryScreenContent');
let victoryShown = false;

function showVictoryScreen() {
    if (!victoryShown) {
        victoryScreen.style.display = 'flex';
        victoryShown = true;
        victoryScreen.classList.add('victory_screen_animation');
        victoryScreenContent.classList.add('victory_screen_content_animation');
        setTimeout(() =>{
            const winSound = new Audio('media/sounds/win-soundeffect-high.mp3');
            winSound.volume = 0.2;
            winSound.play();
        }, 100)
    } else {
        victoryScreen.style.display = 'none';
        victoryShown = false;
    }
}

//timer and clock and strikes and such!
const timerDisplay = document.getElementById('timer');
const WinDisplayTimerDisplay = document.getElementById('timer-win');
let isTimerRunning = false;
let time = 0;
let timerInterval = null;
let bodyClicked = false;
const strikeCounter = document.getElementById('strikeCounter');
const WinDisplayStrikeCounter = document.getElementById('strikeCounter-win');
const WinDisplaypointCounter = document.getElementById('pointCounter-win');
let strikes = 0;


document.body.addEventListener("mousedown", () => {
    if (!bodyClicked) {
        if (!isTimerRunning) {
            timerInterval = setInterval(Timer, 1000);
            isTimerRunning = true;
            bodyClicked = true;
        }
    }
});

function Timer () {
    time++;
    timerDisplay.innerHTML = time + "s";
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
        isTimerRunning = false;
    }
}

function addStrike() {
    strikes++;
    strikeCounter.innerHTML = strikes;
}

let gamePoints = 0;

const win_lvlIndicatorLevel = document.getElementById("victory_screen_levelIndicatorLevel");
const win_lvlIndicatorWorld = document.getElementById("victory_screen_levelIndicatorWorld");
const win_lvlIndicatorName = document.getElementById("victory_screen_levelIndicatorName");
function victory() {
    showVictoryScreen();
    stopTimer();
    if (levelIndex < 8) {
        win_lvlIndicatorLevel.textContent = `0${levelIndex + 1}`;
    } else {
        win_lvlIndicatorLevel.textContent = `${levelIndex + 1}`;
    }
    if (worldIndex < 8) {
        win_lvlIndicatorWorld.textContent = `0${worldIndex + 1}`;
    } else {
        win_lvlIndicatorWorld.textContent = `${worldIndex + 1}`;
    }
    const thisLevelObj = getLevelObject(worldIndex, levelIndex);
    win_lvlIndicatorName.textContent = "Unknown";
    if (thisLevelObj && thisLevelObj.name) { // check if there even is a name
        win_lvlIndicatorName.textContent = thisLevelObj.name;
    }
    WinDisplayTimerDisplay.innerHTML = time + " seconds";
    WinDisplayStrikeCounter.innerHTML = strikes;
    if (gamePoints >= 1) {
        WinDisplaypointCounter.innerHTML = "points: " + gamePoints;
    }
    gradeLevel(worldIndex, levelIndex)
    setTimeout(() => {
        time = 0;
        strikes = 0;
        timerDisplay.innerHTML = time + "s";
        strikeCounter.innerHTML = strikes;
        gamePoints = 0
    }, 100)
};



//happening on load of a level
const lvlIndicator = document.getElementById("levelIndicator");
const lvlIndicatorLevel = document.getElementById("levelIndicatorLevel");
const lvlIndicatorWorld = document.getElementById("levelIndicatorWorld");
const lvlIndicatorName = document.getElementById("levelIndicatorName");

startTransition()

function startTransition() {
    const box = document.getElementById("startTransitionBox");
    box.style.right = "100%";
    setTimeout(() => {
        lvlIndicator.style.animation = "loadAnimation 1s , slideToPlace 3s ease-out";
        lvlIndicatorLevel.style.animation = "rainbowColor 2s";
        lvlIndicatorWorld.style.animation = "rainbowColor 2s";
    }, 400);
    setTimeout(() => {
        lvlIndicator.style.animation = 0
        lvlIndicatorLevel.style.animation = 0
        lvlIndicatorWorld.style.animation = 0
    }, 3600);
};

function goTo(href) {
    window.location.href = href
};
function goHome() {
    transition()
    setTimeout(() => goTo('menu.html'), 1200);
};




function transition() {
    const box = document.getElementById("transitionBox")
    box.style.right = "100%";
    setTimeout(() => {
        box.style.transition = "none"
        box.style.right = "-300%";
    }, 2000)
    setTimeout(() => {
        box.style.transition = "right 2s ease-in-out"
    }, 3000)
};





// Angle Turner Canvas
const canvas = document.getElementById("angle_turner");
const ctx = canvas.getContext("2d");
const pointerLength = 74;

const center = { x: canvas.width / 2, y: canvas.height / 2 };
let mouse = { x: center.x, y: center.y };
let isHolding = false;
const angleturnerSOUND = new Audio("media/sounds/concrete-scrape.mp3")
angleturnerSOUND.volume = 0;
angleturnerSOUND.loop = true;

// where the angle turner begins
let angle = -1.57;

function getPointerEnd() {
    return {
        x: center.x + Math.cos(angle) * pointerLength,
        y: center.y + Math.sin(angle) * pointerLength
    };
}

canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    // rotate only if mouse is being held down
    if (isHolding) {
        angle = Math.atan2(mouse.y - center.y, mouse.x - center.x);
        angleturnerSOUND.play();
        angleturnerSOUND.volume = 0.07;
    }
    if (!isHolding) {
        angleturnerSOUND.volume = 0;
    }
});

canvas.addEventListener("mousedown", e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const tip = getPointerEnd();

    // if click is near the pointres tip
    const dx = mx - tip.x;
    const dy = my - tip.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 20) {
        isHolding = true;
    }
});

canvas.addEventListener("mouseup", () => {
    isHolding = false;
});

let outputXoutput = 0;
let outputYoutput = 0;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw center
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(center.x, center.y, 5, 0, Math.PI * 2);
    ctx.fill();

    // pointer end point
    const endX = center.x + Math.cos(angle) * pointerLength;
    const endY = center.y + Math.sin(angle) * pointerLength;

    // draw pointer
    if (isHolding) {
        ctx.strokeStyle = "#ff6600ff";
    } else {
        ctx.strokeStyle = "#ff0000ff";
    }
    if (ballSpeed > 0.1) {
        ctx.strokeStyle = "#6e6e6e";
    }
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // compute output values
    const outputX = Math.round(Math.cos(angle) * 100);
    const outputY = Math.round(Math.sin(angle) * 100);

    outputXoutput = outputX;
    outputYoutput = outputY;

    // draw text into debug
    if (debugMode) {
        debugOutput.style.display = "block"
        const existing = debugOutput.querySelector('#debugAngleOutput');
        if (existing) {
            existing.textContent = `Angle X: ${outputX} | Angle Y: ${outputY}`;
        } else {
            const paragraph = document.getElementById("debugAngleOutput");
            paragraph.textContent = `Angle X: ${outputX} | Angle Y: ${outputY}`;
        }
    } else if (!debugMode) {
        debugOutput.style.display = "none"
    }

    requestAnimationFrame(draw);
}

draw();





// Game
const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Body = Matter.Body;

const engine = Engine.create();
const world = engine.world;


engine.gravity.y = 0;
engine.gravity.x = 0;

// renderer (necessary)
const gameContainer = document.getElementById('game') || document.body;
const render = Render.create({
    element: gameContainer,
    engine: engine,
    options: {
        width: gameContainer.clientWidth || 800,
        height: gameContainer.clientHeight || 800,
        wireframes: false,
        background: '#228b2201'
    }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// walls
const wallThickness = 50;
const walls = [
    Bodies.rectangle(400, -25, 1000, wallThickness, { isStatic: true }),
    Bodies.rectangle(400, 926, 1000, wallThickness, { isStatic: true }),
    Bodies.rectangle(-25, 400, wallThickness, 1000, { isStatic: true }),
    Bodies.rectangle(925, 400, wallThickness, 1000, { isStatic: true })
];
World.add(world, walls);

const ball = Bodies.circle(750, 450, 16, {
    label: 'ball',
    restitution: 0.9,
    frictionAir: 0.03,
    render: { 
        fillStyle: '#ffffff01' ,
        sprite: {
            texture: SpriteBall,
            xScale: 1,
            yScale: 1
        }
    }
});
const hole = Bodies.circle(700, 700, 20, {
    label: 'hole',
    isStatic: true,
    render: { fillStyle: '#000000' }
});

World.add(world, ball);


function createWall(x, y, w = 45, h = 45,) {
    const box = Bodies.rectangle(x + 22.5, y + 22.5, w, h, Object.assign({
        isStatic: true,
        render: { fillStyle: '#131313' }
    },));
    World.add(world, box);
    return box;
}
//debug menu thing
document.getElementById('debugCreateWall').addEventListener('click', () => {
    const inputX = document.getElementById('createWallX').valueAsNumber - 1;
    const inputY = document.getElementById('createWallY').valueAsNumber - 1;
    const inputLenghtX = document.getElementById('createWallLenghtX').valueAsNumber ;
    const inputLenghtY = document.getElementById('createWallLenghtY').valueAsNumber ;

    if (isNaN(inputLenghtX) || isNaN(inputLenghtY)) {
        createWall(inputX * 45, inputY * 45);
    } else {
        createWall(inputX * 45, inputY * 45, inputLenghtX, inputLenghtY);
    }
});

function createDestructible(x, y, w = 45, h = 45,) {
    const box = Bodies.rectangle(x + 22.5, y + 22.5, w, h, Object.assign({
        label: 'destructible',
        render: { fillStyle: '#7c0b0bff' }
    },));
    box.isDestructible = true;
    World.add(world, box);
    return box;
}
//debug menu thing
document.getElementById('debugCreateExplosive').addEventListener('click', () => {
    const inputX = document.getElementById('createExBoxX');
    const inputY = document.getElementById('createExBoxY');

    let x = inputX.valueAsNumber - 1;
    let y = inputY.valueAsNumber - 1;

    x = x * 45;
    y = y * 45;

    createDestructible(x, y);
});

function createPoint(x, y, w = 30, h = 30, opts = {}) {
    const box = Bodies.rectangle(x + 22.5, y + 22.5, w, h, Object.assign({
        label: 'point',
        isSensor: true,
        isStatic: true,
        render: { fillStyle: '#ffee00ff' }
    }, opts));
    World.add(world, box);
    return box;
}
//debug menu thing
document.getElementById('debugCreatePoint').addEventListener('click', () => {
    const inputX = document.getElementById('createPointX');
    const inputY = document.getElementById('createPointY');

    let x = inputX.valueAsNumber - 1;
    let y = inputY.valueAsNumber - 1;

    x = x * 45;
    y = y * 45;

    createPoint(x, y);
});

function playGifAtPosition(worldX, worldY, gifSrc = 'media/gifs/destroy-box.gif', duration = 800, width = 80) {
    const container = document.getElementById('game') || document.body;
    const img = document.createElement('img');
    img.src = gifSrc;
    img.style.position = 'absolute';
    img.style.left = worldX + 'px';
    img.style.top = worldY + 'px';
    img.style.transform = 'translate(-50%, -50%)';
    img.style.pointerEvents = 'none';
    img.style.zIndex = '9';
    img.style.width = width + 'px';
    container.appendChild(img);
    setTimeout(() => {
        if (img.parentNode) img.parentNode.removeChild(img);
    }, duration);
}

function createRightTriangle4(x, y, base = 45, height = 45, opts = { isStatic: true }) {
    const equalize = -20;
    const verts = [
        { x: equalize, y: equalize },
        { x: equalize + base, y: equalize },
        { x: equalize, y: equalize + height }
    ];
    
    const tri = Bodies.fromVertices(x + 16, y + 16, verts, Object.assign({
        label: 'triangle',
        isStatic: true,
        render: { fillStyle: '#ffaa00' }
    }, opts), true);

    World.add(world, tri);
    return tri;
}


// all the collision events
Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];

        // ball hole
        if (
            (pair.bodyA.label === 'ball' && pair.bodyB.label === 'hole') ||
            (pair.bodyA.label === 'hole' && pair.bodyB.label === 'ball')
        ) {
            if (!victoryShown) {
                victory();
            }
            ball.render.sprite.texture = SpriteTransparent;
            let hole;
            if (pair.bodyA.label == 'hole') {
                hole = pair.bodyA;
            } else {
                hole = pair.bodyB;
            }
            const posX = hole.position.x;
            const posY = hole.position.y;
            playGifAtPosition(posX, posY, 'media/images/ball-in-hole.gif', 1100, 20);
            Matter.Body.setVelocity(ball, {x: 0, y: 0});
        }

        // desturctible boxes 
        if (
            (pair.bodyA.label === 'ball' && pair.bodyB.label === 'destructible') ||
            (pair.bodyA.label === 'destructible' && pair.bodyB.label === 'ball')
        ) {
            let destructibleBody;
            if (pair.bodyA.label == 'destructible') {
                destructibleBody = pair.bodyA;
            } else {
                destructibleBody = pair.bodyB;
            }

            // double-check it's still present, then remove it
            if (world.bodies && world.bodies.indexOf(destructibleBody) !== -1) {
                setTimeout(() => {
                    World.remove(world, destructibleBody);
                }, 10);

                const posX = destructibleBody.position.x;
                const posY = destructibleBody.position.y;
                playGifAtPosition(posX, posY + 15, 'media/images/explosion.gif', 750);

                const boom = new Audio('media/sounds/destroy-box.mp3');
                boom.volume = 0.2;
                boom.play();

            }
        }

        let pointBody = null;
        if (pair.bodyA.label === 'point' && pair.bodyB.label === 'ball') {
            pointBody = pair.bodyA;
        } 
        else if (pair.bodyB.label === 'point' && pair.bodyA.label === 'ball') {
            pointBody = pair.bodyB;
        }

        if (world.bodies && world.bodies.indexOf(pointBody) !== -1) {
            setTimeout(() => {
                World.remove(world, pointBody);
            }, 10);

            const pointPickup = new Audio('media/sounds/point-pickup.mp3');
            pointPickup.volume = 0.2;
            pointPickup.play();

            gamePoints = gamePoints + 1;
        }
    }
});

// create an overlay canvas for the aim line
const gameContainerEl = gameContainer;
gameContainerEl.style.position = gameContainerEl.style.position || 'relative';

const overlay = document.createElement('canvas');
overlay.id = 'gameOverlay';
overlay.style.position = 'absolute';
overlay.style.left = '0';
overlay.style.top = '0';
overlay.style.pointerEvents = 'none';
overlay.style.zIndex = '5';
overlay.width = render.canvas.width;
overlay.height = render.canvas.height;
gameContainerEl.appendChild(overlay);

const octx = overlay.getContext('2d');

function resizeOverlay() {
    overlay.width = gameContainerEl.clientWidth || render.canvas.width;
    overlay.height = gameContainerEl.clientHeight || render.canvas.height;
}
window.addEventListener('resize', resizeOverlay);

// draw aim line from ball while holding the angle_turner pointer
function drawAimLine() {
    octx.clearRect(0, 0, overlay.width, overlay.height);

    if (isHolding && ball) {
        const bx = ball.position.x;
        const by = ball.position.y;
        const len = 200 

        const ex = bx + Math.cos(angle) * len;
        const ey = by + Math.sin(angle) * len;

        // create a gradient
        const grad = octx.createLinearGradient(bx, by, ex, ey);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        octx.strokeStyle = grad;
        octx.lineCap = 'round';
        octx.lineWidth = 5;
        octx.beginPath();
        octx.moveTo(bx, by);
        octx.lineTo(ex, ey);
        octx.stroke();
    }

    requestAnimationFrame(drawAimLine);
}
drawAimLine();

// --- INPUT VARIABLES ---
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let noobModePower = 0;

function noobModeToggle() {
    if (noobMode){
        noobModePower = 1
    } else {
        noobModePower = 0;
    };
};

noobModeClock = setInterval(noobModeToggle , 100)

// noob mode drag and shoot
document.addEventListener('mousedown', function(event) {
isDragging = true;
dragStart.x = event.clientX;
dragStart.y = event.clientY;
});

document.addEventListener('mouseup', function(event) {
if (!isDragging) {
    return;
    }   
isDragging = false;

let dx = dragStart.x - event.clientX;
let dy = dragStart.y - event.clientY;
if (debugMode) {
    console.log("DirectionX: " + dx + " DirectionY: " + dy)
}

let power = 0.1;

// Apply movement
if (canFire) {
    Body.setVelocity(ball, { x: (dx * power) * noobModePower, y: (dy * power) * noobModePower });
    //addStrike();
    if (noobMode) {
        addStrike();
    }
};
});

// Applying the game menu things to the game
if (canFire) {
    blastButton.addEventListener('click', () => {
        console.log("FIRED")
        if (!isChargerBarClockRunning && canFire) {
            Body.setVelocity(ball, { 
                x: (outputXoutput * (currentHeightExport / 100)) / 10, 
                y: (outputYoutput * (currentHeightExport / 100)) / 10 
            });
            addStrike();
        }
    });
}



function getLevelObject(worldIndex, levelIndex) {
    const levels = window.levels || [];

    if (!levels[worldIndex] || !levels[worldIndex][levelIndex]) {
        return null;
    }

    return levels[worldIndex][levelIndex];
}

function grabLevel(worldIndex, levelIndex) {
    const levels = window.levels || [];
    if (!levels[worldIndex] || !levels[worldIndex][levelIndex]) {
        console.log("Level doesn't exist!");
        return null;
    }

    const levelObj = levels[worldIndex][levelIndex];

    window.currentLevel = levelObj;
    currentLevel = levelObj;

    return levelObj.layout || null;
}

function grabLevelBallStartX(worldIndex, levelIndex) {
    const levels = window.levels || [];
    if (!levels[worldIndex] || !levels[worldIndex][levelIndex]) {
        console.log("Level doesn't exist!");
        return null;
    }

    const levelObj = levels[worldIndex][levelIndex];

    window.currentLevel = levelObj;
    currentLevel = levelObj;

    return levelObj.ballStartX || null;
}
function grabLevelBallStartY(worldIndex, levelIndex) {
    const levels = window.levels || [];
    if (!levels[worldIndex] || !levels[worldIndex][levelIndex]) {
        console.log("Level doesn't exist!");
        return null;
    }

    const levelObj = levels[worldIndex][levelIndex];

    window.currentLevel = levelObj;
    currentLevel = levelObj;

    return levelObj.ballStartY || null;
}

function getBodyByLabel(world, label) {
    const all = Matter.Composite.allBodies(world);
    for (const body of all) {
        if (body.label === label) return body;
    }
    return null;
}

function teleportByLabel(world, label, x, y) {
    const body = getBodyByLabel(world, label);
    if (!body) return;

    Matter.Body.setVelocity(body, {x: 0, y: 0});
    Matter.Body.setPosition(body, {x, y});
}


//level values
let worldIndex = Number(localStorage.getItem("worldIndex")) || 0;
let levelIndex = Number(localStorage.getItem("levelIndex")) || 0;

let levelArray = [];
//loading the first level
let oldLevelArray = grabLevel(worldIndex, levelIndex)
let firstLoad = true;
firstBallCordX = grabLevelBallStartX(worldIndex, levelIndex)
firstBallCordY = grabLevelBallStartY(worldIndex, levelIndex)
const thisLevelObj = getLevelObject(worldIndex, levelIndex);
let firstLevelName = "Unknown";
if (thisLevelObj && thisLevelObj.name) { // check if there even is a name
    firstLevelName = thisLevelObj.name;
}
lvlIndicatorName.textContent = firstLevelName;
teleportByLabel(world, "ball", firstBallCordX, firstBallCordY)
if (levelIndex < 8) {
    lvlIndicatorLevel.textContent = `0${levelIndex + 1}`;
} else {
    lvlIndicatorLevel.textContent = `${levelIndex + 1}`;
}
if (worldIndex < 8) {
    lvlIndicatorWorld.textContent = `0${worldIndex + 1}`;
} else {
    lvlIndicatorWorld.textContent = `${worldIndex + 1}`;
}


//level loading on a button press
World.add(world, oldLevelArray);
const nextLevelButton = document.getElementById("nextLevelButton");
const againLevelButton = document.getElementById("againLevelButton");
const previousLevelButton = document.getElementById("previousLevelButton");
//im a professional programmer, how could you tell? ↓ ↓ ↓
const nextLevelButton2 = document.getElementById("nextLevelButton2");
const againLevelButton2 = document.getElementById("againLevelButton2");
const previousLevelButton2 = document.getElementById("previousLevelButton2");
nextLevelButton.addEventListener('click', () => {
    loadLevel("foward");
});
againLevelButton.addEventListener('click', () => {
    loadLevel("again");
});
previousLevelButton.addEventListener('click', () => {
    loadLevel("previous");
});

let transitionEnded = true;
nextLevelButton2.addEventListener('click', () => {
    if (transitionEnded) {
        loadLevel("foward");
        isTimerRunning = false;
        bodyClicked = false;
        setTimeout(() => {
            time = 0;
            timerDisplay.innerHTML = time + "s";
            strikes = 0;
            strikeCounter.innerHTML = strikes;
        }, 1100)
        clearInterval(timerInterval);
    }
});
againLevelButton2.addEventListener('click', () => {
    if (transitionEnded) {
        loadLevel("again");
        isTimerRunning = false;
        bodyClicked = false;
        setTimeout(() => {
            time = 0;
            timerDisplay.innerHTML = time + "s";
            strikes = 0;
            strikeCounter.innerHTML = strikes;
        }, 1100)
        clearInterval(timerInterval);
    }
});
previousLevelButton2.addEventListener('click', () => {
    if (transitionEnded) {
        loadLevel("previous");
        isTimerRunning = false;
        bodyClicked = false;
        setTimeout(() => {
            time = 0;
            timerDisplay.innerHTML = time + "s";
            strikes = 0;
            strikeCounter.innerHTML = strikes;
        }, 1100)
        clearInterval(timerInterval);
    }
});
 // loading level function
function loadLevel(where) {
    transition();
    transitionEnded = false;
    // ifs for level indicator
    if (where == "foward") {
        setTimeout(() => {
            if (levelIndex < 8) {
                lvlIndicatorLevel.textContent = `0${levelIndex + 1}`;
            } else {
                lvlIndicatorLevel.textContent = `${levelIndex + 1}`;
            }
            if (worldIndex < 8) {
                lvlIndicatorWorld.textContent = `0${worldIndex + 1}`;
            } else {
                lvlIndicatorWorld.textContent = `${worldIndex + 1}`;
            }
        }, 1100);
    } else if (where == "again") {
        // i guess do nothing?
    } else if (where == "previous") {
        setTimeout(() => {
            if (levelIndex == 0) {
                lvlIndicatorLevel.textContent = `01`;
            }
            if (levelIndex < 9 && levelIndex > 0) {
                lvlIndicatorLevel.textContent = `0${levelIndex + 1}`;
            }
            if (levelIndex >= 9) {
                lvlIndicatorLevel.textContent = `${levelIndex + 1}`;
            }

            if (worldIndex == 0) {
                lvlIndicatorWorld.textContent = `01`;
            }
            if (worldIndex < 9 && worldIndex > 0) {
                lvlIndicatorWorld.textContent = `0${worldIndex + 1}`;
            }
            if (worldIndex >= 9) {
                lvlIndicatorWorld.textContent = `${worldIndex + 1}`;
            }

        }, 1100);
    }

    // ifs for checking the next level
    if (where == "foward") {
        if (window.levels && window.levels[worldIndex] && window.levels[worldIndex][levelIndex + 1]) {
            levelIndex++;
        } else if (window.levels && window.levels[worldIndex + 1] && window.levels[worldIndex + 1][0]) {
            worldIndex++;
            levelIndex = 0;
        } else {
            console.log('No next level found.');
        };
        if (debugMode){
            console.log(`next level: ${levelIndex + 1}-${worldIndex + 1}`);
        }
    } else if (where == "again") {
        // i guess do nothing?
    }else if (where == "previous") {
        if ( window.levels && window.levels[worldIndex] && window.levels[worldIndex][levelIndex - 1]) {
            levelIndex--;
        } 
        else if (window.levels && window.levels[worldIndex - 1] && window.levels[worldIndex - 1].length > 0) {
            worldIndex--;
            levelIndex = window.levels[worldIndex].length - 1;
        } 
        else {
            console.log("No previous level found.");
        }
    }

    setTimeout(() => { //between level animation
        lvlIndicator.style.animation = "loadAnimation 1s , slideToPlace 3s ease-out";
        lvlIndicatorLevel.style.animation = "rainbowColor 2s";
        lvlIndicatorWorld.style.animation = "rainbowColor 2s";
    }, 1200);

    setTimeout(() => { // happends as the black screeen is covering everytihng

        //remove old level
        oldLevelArray.forEach(body => {
            World.remove(world, body);
        });
 
        // now load new level
        levelArray = grabLevel(worldIndex, levelIndex);

        // update old reference
        oldLevelArray = levelArray;

        // add new stuff
        World.add(world, levelArray);

        let newBallX = grabLevelBallStartX(worldIndex, levelIndex);
        let newBallY = grabLevelBallStartY(worldIndex, levelIndex);
        teleportByLabel(world, "ball", newBallX, newBallY)
        console.log(`loaded level: ${levelIndex + 1}-${worldIndex + 1}`)

        victoryScreen.style.display = 'none';
        victoryShown = false;

        bodyClicked = false;

        //level name
        const thisLevelObj = getLevelObject(worldIndex, levelIndex);
        let levelName = "Unknown";
        if (thisLevelObj && thisLevelObj.name) { // check if there even is a name
            levelName = thisLevelObj.name;
        }

        lvlIndicatorName.textContent = levelName;

        
        // make it render the ball again.
        ball.render.sprite.texture = SpriteBall;

        gradeImage.style.transform = `scale(0)`;
        gradeIndicatorGradeFinal.innerHTML = `.`;
        gradeIndicatorSscore.innerHTML = `.`;

    }, 1100)

    setTimeout(() => { // making it so the fancy level indicator can do its fancy animation again
        lvlIndicator.style.animation = 0;
        lvlIndicatorLevel.style.animation = 0;
        lvlIndicatorWorld.style.animation = 0;
        transitionEnded = true;
    }, 4300);
}

const gradeImage = document.getElementById("gradeImage")

function gradeLevel(worldIndex, levelIndex) {
    const gradeTime = time * 1;
    const gradeStrike = strikes  * 10;
    const gradePoints = gamePoints  * -15;

    const gradeFinal = gradeTime + gradeStrike + gradePoints;

    const thisLevelObj = getLevelObject(worldIndex, levelIndex);

    const gradeIndicatorSscore = document.getElementById("gradeIndicatorSscore");
    const gradeIndicatorGradeFinal = document.getElementById("gradeIndicatorGradeFinal");

    let Sscore = 0;
    if (thisLevelObj && thisLevelObj.Sscore) { // check if there even is a Sscore
        Sscore = thisLevelObj.Sscore;

        const slot1 = new Audio('media/sounds/slot-machine-1.mp3');
        slot1.volume = 0.7;
        const slot2 = new Audio('media/sounds/slot-machine-2.mp3');
        slot2.volume = 0.7;

        const gradeSfxS = new Audio('media/sounds/grade-sfx-S.mp3');
        gradeSfxS.volume = 0.2;
        const gradeSfxA = new Audio('media/sounds/grade-sfx-a.mp3');
        gradeSfxA.volume = 0.4;
        const gradeSfxB = new Audio('media/sounds/grade-sfx-b.mp3');
        gradeSfxB.volume = 0.2;
        const gradeSfxC = new Audio('media/sounds/grade-sfx-c.mp3');
        gradeSfxC.volume = 0.7;
        const gradeSfxD = new Audio('media/sounds/grade-sfx-d.mp3');
        gradeSfxD.volume = 0.7;
        const gradeSfxF = new Audio('media/sounds/grade-sfx-f.mp3');
        gradeSfxF.volume = 0.2;

        setTimeout(()=>{ //first input
            slot1.play();
        },700)
        setTimeout(() => {
            gradeIndicatorSscore.innerHTML = `${thisLevelObj.Sscore}`;
            gradeIndicatorSscore.style.fontSize= `35px`
            gradeIndicatorSscore.style.transform= `scaleX(1.5)`
            slot2.play();
            setTimeout(()=>{
                gradeIndicatorSscore.style.fontSize= `25px`
            },200)
            setTimeout(() => {
                gradeIndicatorGradeFinal.innerHTML = `${gradeFinal}`;
                gradeIndicatorGradeFinal.style.fontSize= `35px`
                slot2.play();
                setTimeout(()=>{
                    gradeIndicatorGradeFinal.style.fontSize= `25px`
                },200)
            }, 800);
        }, 1000);
        setTimeout(()=>{ //sound effect based on grade
            if (gradeFinal <= Sscore) {
                gradeImage.style.transform = `scale(1.1)`
                setTimeout(() => {
                    gradeSfxS.play();
                    gradeImage.style.transform = `scale(1)`
                }, 100);
            } 
            else if (gradeFinal <= Sscore * 1.3) {
                gradeImage.style.transform = `scale(1.1)`
                setTimeout(() => {
                    gradeSfxA.play();
                    gradeImage.style.transform = `scale(1)`
                }, 100);
            } 
            else if (gradeFinal <= Sscore * 1.6) {
                gradeImage.style.transform = `scale(1.1)`
                setTimeout(() => {
                    gradeSfxB.play();
                    gradeImage.style.transform = `scale(1)`
                }, 100);
            } 
            else if (gradeFinal <= Sscore * 2){
                gradeImage.style.transform = `scale(1.1)`
                setTimeout(() => {
                    gradeSfxC.play();
                    gradeImage.style.transform = `scale(1)`
                }, 100);
            }
            else if (gradeFinal <= Sscore * 3){
                gradeImage.style.transform = `scale(1.1)`
                setTimeout(() => {
                    gradeSfxD.play();
                    gradeImage.style.transform = `scale(1)`
                }, 100);
            }
            else {
                gradeImage.style.transform = `scale(1.1)`
                setTimeout(() => {
                    gradeSfxF.play();
                    gradeImage.style.transform = `scale(1)`
                }, 100);
            }
        },2500)
    }
    if (gradeFinal <= Sscore) {
        gradeImage.src = "media/images/grade S.png";
    } 
    else if (gradeFinal <= Sscore * 1.3) {
        gradeImage.src = "media/images/grade A.png";
    } 
    else if (gradeFinal <= Sscore * 1.6) {
        gradeImage.src = "media/images/grade B.png";
    } 
    else if (gradeFinal <= Sscore * 2){
        gradeImage.src = "media/images/grade C.png";
    }
    else if (gradeFinal <= Sscore * 3){
        gradeImage.src = "media/images/grade D.png";
    }
    else {
        gradeImage.src = "media/images/grade F.png";
    }
}