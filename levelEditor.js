const gameField = document.getElementById('game');
const movingPlatformMenu = document.getElementById("moving-platform-menu")
let activeMovingPlatformOriginCell = null;

if (gameField) {
    let game_tableHtml = "<table>";

    for (let row = 0; row < 20; row++) {
        let rowHtml = "<tr>";

        for (let col = 0; col < 20; col++) {
            rowHtml += `<td><button class="empty" data-row="${row}" data-col="${col}"></button></td>`;
        }

        rowHtml += "</tr>";
        game_tableHtml += rowHtml;
    }

    game_tableHtml += "</table>";
    gameField.innerHTML = game_tableHtml;
}

function openMovingPlatformMenu( startRow, StartCol) {
    movingPlatformMenu.classList.add('visible');
    clickMovingPlatformCell(startRow, StartCol)
}
function closeMovingPlatformMenu() {
    saveMovingPlatformDataToMainCell();
    wipeMovingPlatformMenu();
    movingPlatformMenu.classList.remove('visible');
    activeMovingPlatformOriginCell = null;
}



let bodyClicked = false;
document.body.addEventListener('mousedown', function () {
    if (!bodyClicked) {
        bodyClicked = true;
        const music = new Audio('media/sounds/level-editor-music.mp3');
        music.volume = 0.05;
        music.loop = true;
        music.play();
    }
});

document.addEventListener('DOMContentLoaded', function () {

    const exportButton = document.getElementById('exportButton');
    const tableButtons = document.querySelectorAll('.game table button');

    // all the blovks 
    // order = cycle order
    const sprites = [
        'empty', 
        'squere', 
        'triangle-1', 
        'point', 
        'ball', 
        'descructive', 
        'hole',
        'movingPlatform',
        'booster-1'
    ];

    const triangleSprites = ['triangle-1', 'triangle-2', 'triangle-3', 'triangle-4'];
    const boosterSprites = ['booster-1', 'booster-2', 'booster-3', 'booster-4'];
    const spriteGroups = [triangleSprites, boosterSprites];
    const allSpriteClasses = [...new Set([...sprites, ...spriteGroups.flat()])];

    function cycleSpriteSequence(btn, spriteSequence, reverse = false) {
        const currentSprite = spriteSequence.find((sprite) => btn.classList.contains(sprite));
        if (!currentSprite) return false;

        const currentIndex = spriteSequence.indexOf(currentSprite);
        const nextIndex = reverse
            ? (currentIndex - 1 + spriteSequence.length) % spriteSequence.length
            : (currentIndex + 1) % spriteSequence.length;

        spriteSequence.forEach((sprite) => btn.classList.remove(sprite));
        btn.classList.add(spriteSequence[nextIndex]);
        return true;
    }

    function getMatchingSpriteGroup(btn) {
        return spriteGroups.find((group) =>
            group.some((sprite) => btn.classList.contains(sprite))
        );
    }

    function cycleSpriteFromButton(btn, reverse = false) {
        const matchingGroup = getMatchingSpriteGroup(btn);
        if (!matchingGroup) return false;
        return cycleSpriteSequence(btn, matchingGroup, reverse);
    }

    function getNextSpriteFromMainCycle(btn) {
        const currentSprite = getButtonSprite(btn);
        const currentIndex = sprites.indexOf(currentSprite);
        return sprites[(currentIndex + 1) % sprites.length];
    }

    function getButtonSprite(btn) {
        const matchingGroup = getMatchingSpriteGroup(btn);
        if (matchingGroup) return matchingGroup[0];

        for (let i = 0; i < sprites.length; i++) {
            if (btn.classList.contains(sprites[i])) return sprites[i];
        }
        return 'empty';
    }

    function setButtonSprite(btn, state) {
        allSpriteClasses.forEach((sprite) => btn.classList.remove(sprite));
        btn.classList.add(state);
    }

    // Cycling the sprites
    tableButtons.forEach((btn, index) => {
        btn.dataset.num = index + 1;
        if (!btn.dataset.prev) btn.dataset.prev = getButtonSprite(btn);

        btn.addEventListener('contextmenu', function (e) { // right clicking
            e.preventDefault();

            const button = e.target.closest('button');
            if (!button) return;

            if (cycleSpriteFromButton(button, e.shiftKey)) return;
            if (!button.classList.contains('movingPlatform')) return;

            const row = Number(button.dataset.row);
            const col = Number(button.dataset.col);

            console.log(`Game field button clicked at row ${row}, col ${col}`);

            activeMovingPlatformOriginCell = button;
            openMovingPlatformMenu(row, col);
        });

        btn.addEventListener('mousedown', function (e) { // left clicking
            if (e.button !== 0) {
                return;
            }

            e.preventDefault();

            //ctrl click - back to default
            if (e.ctrlKey) {
                setButtonSprite(btn, 'empty');
                return;
            }

            //shift click - reverse
            if (e.shiftKey) {
                const current = getButtonSprite(btn);
                const idx = sprites.indexOf(current);
                const prevIdx = (idx - 1 + sprites.length) % sprites.length;
                setButtonSprite(btn, sprites[prevIdx]);
                return;
            }

            // Normal click - cycle
            setButtonSprite(btn, getNextSpriteFromMainCycle(btn));
        });
    });

    // Export: find all buttons with a class in the sprites array, and log their numbers (1-based)
    exportButton.addEventListener('click', function () {
        const finalPositions = [];
        const finalFunctions = [];
        const cols = 20;
        const cellSize = 45;
        let ballStartX = null;
        let ballStartY = null;

        for (let i = 0; i < tableButtons.length; i++) {
            const btn = tableButtons[i];
            if (btn.classList.contains('squere')) {
                const x = (i % cols) * cellSize + 22.5;
                const y = Math.floor(i / cols) * cellSize + 22.5;
                finalPositions.push(`Matter.Bodies.rectangle(${x}, ${y}, ${cellSize + 0.5}, ${cellSize + 0.5}, { isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('triangle-1')) {
                const x = ((i % cols) * cellSize) + 31;
                const y = (Math.floor(i / cols) * cellSize) + 15;
                finalPositions.push(`Matter.Bodies.fromVertices(${x}, ${y}, [{ x: -20 + 45, y: -20 }, { x: -20, y: -20 }, { x: -20 + 45, y: -20 + 45 }], {label: 'triangle', isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('triangle-2')) {
                const x = ((i % cols) * cellSize) + 31;
                const y = (Math.floor(i / cols) * cellSize) + 31;
                finalPositions.push(`Matter.Bodies.fromVertices(${x}, ${y}, [{x: -20 + 45, y: -20 + 45}, {x: -20, y: -20 + 45}, {x: -20 + 45, y: -20}], {label: 'triangle', isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('triangle-3')) {
                const x = ((i % cols) * cellSize) + 15;
                const y = (Math.floor(i / cols) * cellSize) + 31;
                finalPositions.push(`Matter.Bodies.fromVertices(${x}, ${y}, [{x: -20, y: -20 + 45}, {x: -20 + 45, y: -20 + 45}, {x: -20, y: -20}], {label: 'triangle', isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('triangle-4')) {
                const x = ((i % cols) * cellSize) + 15;
                const y = (Math.floor(i / cols) * cellSize) + 15;
                finalPositions.push(`Matter.Bodies.fromVertices(${x}, ${y}, [{x: -20, y: -20}, {x: -20 + 45, y: -20}, {x: -20, y: -20 + 45}], {label: 'triangle', isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('ball')) {
                const x = (i % cols) * cellSize + 22.5;
                const y = Math.floor(i / cols) * cellSize + 22.5;
                ballStartX = x;
                ballStartY = y;
            }

            if (btn.classList.contains('point')) {
                const x = ((i % cols) * cellSize) + 22.5;
                const y = (Math.floor(i / cols) * cellSize) + 22.5;
                finalPositions.push(`Matter.Bodies.circle(${x}, ${y}, 10, { label: 'point', isSensor: true, isStatic: true, render: { fillStyle: '#ffee00ff' }}),`);
            }

            if (btn.classList.contains("descructive")) {
                const x = ((i % cols) * cellSize) + 22.5;
                const y = (Math.floor(i / cols) * cellSize) + 22.5;
                finalPositions.push(`Matter.Bodies.rectangle(${x}, ${y}, 45, 45, { label: 'destructible', render: { fillStyle: '#7c0b0bff' }, isDestructible: true, isStatic: true}),`);
            }

            if (btn.classList.contains("hole")) {
                const x = (i % cols) * cellSize + 22.5;
                const y = Math.floor(i / cols) * cellSize + 22.5;
                finalPositions.push(`Matter.Bodies.circle(${x}, ${y}, 16, { label: 'hole', isStatic: true, render: { fillStyle: '#000000' }}),`);
            }

            if (btn.classList.contains("movingPlatform")) {
                const movingPlatformFunction = getMovingPlatformCreateCallFromCell(btn);
                if (movingPlatformFunction) {
                    finalFunctions.push(movingPlatformFunction);
                }
            }
            if (btn.classList.contains("booster-1")) {
                const x = (i % cols) * cellSize + 7;
                const y = Math.floor(i / cols) * cellSize + 14;
                finalFunctions.push(`createBoost(${x}, ${y}, 'up');`);
            }
            if (btn.classList.contains("booster-2")) {
                const x = (i % cols) * cellSize - 1;
                const y = Math.floor(i / cols) * cellSize + 7;
                finalFunctions.push(`createBoost(${x}, ${y}, 'right');`);
            }
            if (btn.classList.contains("booster-3")) {
                const x = (i % cols) * cellSize + 7;
                const y = Math.floor(i / cols) * cellSize - 1;
                finalFunctions.push(`createBoost(${x}, ${y}, 'down');`);
            }
            if (btn.classList.contains("booster-4")) {
                const x = (i % cols) * cellSize + 14;
                const y = Math.floor(i / cols) * cellSize + 7;
                finalFunctions.push(`createBoost(${x}, ${y}, 'left');`);
            }
        }

        if (finalPositions.length === 0 && finalFunctions.length === 0) {
            console.log("No level content to export.");
            return;
        }

        const formattedFunctions = finalFunctions.length
            ? finalFunctions.map((fn) => `        function () {\n            ${fn.replace(/\n/g, '\n            ')}\n        }`) 
            : [];

        const outputLines = [
            '{',
            '    name: "PLACEHOLDER",',
            `    ballStartX: ${ballStartX ?? 112.5},`,
            `    ballStartY: ${ballStartY ?? 427.5},`,
            '    Sscore: 999,',
            '    layout: [',
            ...finalPositions.map((entry) => `        ${entry}`),
            '    ],',
            '    functionsToTrigger: ['
        ];

        if (formattedFunctions.length > 0) {
            outputLines.push(...formattedFunctions);
        }

        outputLines.push('    ]');
        outputLines.push('}');

        const Output = document.getElementById("Output");
        const outText = outputLines.join("\n");

        if (Output) {
            Output.textContent = outText;
            console.log(outText);
            if (typeof Output.select === 'function') {
                Output.select();
            }
        } else {
            console.log(outText);
        }
    });
});

// copy area
document.getElementById("copyButton").addEventListener("click", () => {
    const Output = document.getElementById("Output").textContent;
    navigator.clipboard.writeText(Output)
});


// Moving platform menu
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("closeButton").addEventListener('click', ()=>{
        closeMovingPlatformMenu();
    });

    document.addEventListener('click', (event) => {
        if (!movingPlatformMenu.contains(event.target) && !event.target.closest('.movingPlatform')) {
            closeMovingPlatformMenu();
        }
    });
});

// generate platform menu grid
const movingPlatformTable = document.getElementById("moving-platform-table");
const mPT_cols = 20;
const mPT_rows = 20;
let tableHtml = "";

for (let row = 0; row < mPT_rows; row++) {
    let rowHtml = "<tr>";
    for (let col = 0; col < mPT_cols; col++) {
        rowHtml += `<td><button data-row="${row}" data-col="${col}" data-place="0"></button></td>`;
    }
    rowHtml += "</tr>";
    tableHtml += rowHtml;
}
movingPlatformTable.innerHTML = tableHtml;

//setting order in which platform goes and auto-incrementing
const setMovingPlatformButtonDisplay = (btn) => {
    const place = Number(btn.dataset.place) || 0;
    btn.dataset.place = String(place);
    btn.innerHTML = place > 0 ? String(place) : "";
};

const getActiveMovingPlatformButtons = () => {
    return Array.from(movingPlatformTable.querySelectorAll('button')).filter((btn) => {
        return Number(btn.dataset.place) > 0;
    }).sort((a, b) => Number(a.dataset.place) - Number(b.dataset.place));
};

const compactMovingPlatformPlaces = () => {
    const active = getActiveMovingPlatformButtons();
    active.forEach((btn, index) => {
        btn.dataset.place = String(index + 1);
        setMovingPlatformButtonDisplay(btn);
    });
};

const triggerMovingPlatformButton = (button) => {
    if (!button) return null;

    const currentPlace = Number(button.dataset.place) || 0;
    const activeButtons = getActiveMovingPlatformButtons();

    if (currentPlace === 1) {  // if the number is one, don't change it
        return button;
    }

    if (currentPlace > 0) {
        button.dataset.place = '0';
        setMovingPlatformButtonDisplay(button);

        activeButtons
            .filter((btn) => btn !== button && Number(btn.dataset.place) > currentPlace)
            .forEach((btn) => {
                btn.dataset.place = String(Number(btn.dataset.place) - 1);
                setMovingPlatformButtonDisplay(btn);
            });

        return button;
    }

    const nextPlace = activeButtons.length > 0
        ? Math.max(...activeButtons.map((btn) => Number(btn.dataset.place))) + 1
        : 1;

    button.dataset.place = String(nextPlace);
    setMovingPlatformButtonDisplay(button);

    if (nextPlace === 1) { // if the number is one, don't change it
        button.dataset.place = '1';
        setMovingPlatformButtonDisplay(button);
    }

    return button;
};

const getMovingPlatformButtonAt = (row, col) => {
    return movingPlatformTable.querySelector(`button[data-row="${row}"][data-col="${col}"]`);
};

const getMainGridButtonAt = (row, col) => {
    return document.querySelector(`.game button[data-row="${row}"][data-col="${col}"]`);
};

const wipeMovingPlatformMenu = () => {
    movingPlatformTable.querySelectorAll('button').forEach((btn) => {
        btn.dataset.place = '0';
        btn.innerHTML = '';
    });
};

const saveMovingPlatformDataToMainCell = () => { // saving shit
    if (!activeMovingPlatformOriginCell) return;

    const savedCoords = Array.from(movingPlatformTable.querySelectorAll('button'))
        .filter((btn) => Number(btn.dataset.place) > 0)
        .sort((a, b) => Number(a.dataset.place) - Number(b.dataset.place))
        .map((btn) => `row${Number(btn.dataset.row)},col${Number(btn.dataset.col)}`)
        .join(';');

    activeMovingPlatformOriginCell.dataset.savedMovingPlatform = savedCoords;
    activeMovingPlatformOriginCell.innerHTML = savedCoords
        ? `<span style="display:none;">${savedCoords}</span>`
        : '';
};

const parseSavedMovingPlatformCoords = (savedValue = '') => {
    const cellSize = 45;
    if (!savedValue) return [];

    return savedValue
        .split(';')
        .filter(Boolean)
        .map((entry) => {
            const match = entry.match(/row(\d+),col(\d+)/i);
            if (!match) return null;

            return {
                X: (Number(match[2]) + 1) * cellSize,
                Y: (Number(match[1]) + 1) * cellSize
            };
        })
        .filter(Boolean);
};

const getMovingPlatformCreateCallFromCell = (cell, positionOverride = null) => {
    if (!cell) return null;

    const savedValue = cell.dataset.savedMovingPlatform || '';
    const points = parseSavedMovingPlatformCoords(savedValue);
    if (points.length === 0) return null;

    const speedInput = document.getElementById('movingPlatform_inputSpeed');
    const waitInput = document.getElementById('movingPlatform_inputWait');
    const speed = Number(speedInput?.value) || 100;
    const waitMs = Number(waitInput?.value) || 500;
    const width = 90;
    const height = 16;

    return `createMoving(${JSON.stringify(points)}, ${speed}, ${waitMs}, ${width}, ${height});`;
};

const loadMovingPlatformMenuFromMainCell = (row, col) => { // loading shit
    const mainCell = getMainGridButtonAt(row, col);
    if (!mainCell) return;

    wipeMovingPlatformMenu();

    const savedCoords = mainCell.dataset.savedMovingPlatform || '';
    if (!savedCoords) {
        const originButton = getMovingPlatformButtonAt(row, col);
        if (originButton) {
            triggerMovingPlatformButton(originButton);
        }
        return;
    }

    const entries = savedCoords.split(';').filter(Boolean);
    entries.forEach((entry, index) => {
        const match = entry.match(/row(\d+),col(\d+)/i);
        if (!match) return;

        const targetRow = Number(match[1]);
        const targetCol = Number(match[2]);
        const targetButton = getMovingPlatformButtonAt(targetRow, targetCol);

        if (targetButton) {
            targetButton.dataset.place = String(index + 1);
            setMovingPlatformButtonDisplay(targetButton);
        }
    });
};

const clickMovingPlatformCell = (row, col) => {
    const mainCell = getMainGridButtonAt(row, col);
    if (mainCell && mainCell.dataset.savedMovingPlatform) {
        loadMovingPlatformMenuFromMainCell(row, col);
        return mainCell;
    }

    const button = getMovingPlatformButtonAt(row, col);
    return triggerMovingPlatformButton(button);
};

movingPlatformTable.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    triggerMovingPlatformButton(button);
});

movingPlatformTable.querySelectorAll('button').forEach((btn) => {
    setMovingPlatformButtonDisplay(btn);
});

