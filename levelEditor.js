const gameField = document.getElementById('game');
const movingPlatformMenu = document.getElementById("moving-platform-menu")

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

function openMovingPlatformMenu() {
    movingPlatformMenu.classList.add('visible');
}
function closeMovingPlatformMenu() {
    movingPlatformMenu.classList.remove('visible');
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
        'triangle-2', 
        'triangle-3', 
        'triangle-4', 
        'point', 
        'ball', 
        'descructive', 
        'hole',
        'movingPlatform'
    ];

    function getButtonSprite(btn) {
        for (let i = 0; i < sprites.length; i++) {
            if (btn.classList.contains(sprites[i])) return sprites[i];
        }
        return 'empty';
    }

    function setButtonSprite(btn, state) {
        for (let i = 0; i < sprites.length; i++) {
            btn.classList.remove(sprites[i]);
        }
        btn.classList.add(state);
    }

    tableButtons.forEach((btn, index) => {
        btn.dataset.num = index + 1;
        if (!btn.dataset.prev) btn.dataset.prev = getButtonSprite(btn);

        btn.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            if (!btn.classList.contains('movingPlatform')) return;

            openMovingPlatformMenu();
        });

        btn.addEventListener('mousedown', function (e) {
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
            const current = getButtonSprite(btn);
            const idx = sprites.indexOf(current);
            const nextIdx = (idx + 1) % sprites.length;
            setButtonSprite(btn, sprites[nextIdx]);
        });
    });

    // Export: find all buttons with a class in the sprites array, and log their numbers (1-based)
    exportButton.addEventListener('click', function () {
        const pressed = [];
        const finalPositions = [];

        const cols = 20;
        const cellSize = 45;
        
        for (let i = 0; i < tableButtons.length; i++) {
            const btn = tableButtons[i];
            if (btn.classList.contains('squere')) {
                pressed.push(i + 1);
                const x = (i % cols) * cellSize + 22.5;
                const y = Math.floor(i / cols) * cellSize + 22.5;
                finalPositions.push(`Matter.Bodies.rectangle(${x}, ${y}, ${cellSize + 0.5}, ${cellSize + 0.5}, { isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('triangle-1')) {
                pressed.push(i + 1);
                const x = ((i % cols) * cellSize) + 31;
                const y = (Math.floor(i / cols) * cellSize) + 15;
                finalPositions.push(`Matter.Bodies.fromVertices(${x}, ${y}, [{ x: -20 + 45, y: -20 }, { x: -20, y: -20 }, { x: -20 + 45, y: -20 + 45 }], {label: 'triangle', isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('triangle-2')) {
                pressed.push(i + 1);
                const x = ((i % cols) * cellSize) + 31;
                const y = (Math.floor(i / cols) * cellSize) + 31;
                finalPositions.push(`Matter.Bodies.fromVertices(${x}, ${y}, [{x: -20 + 45, y: -20 + 45}, {x: -20, y: -20 + 45}, {x: -20 + 45, y: -20}], {label: 'triangle', isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('triangle-3')) {
                pressed.push(i + 1);
                const x = ((i % cols) * cellSize) + 15;
                const y = (Math.floor(i / cols) * cellSize) + 31;
                finalPositions.push(`Matter.Bodies.fromVertices(${x}, ${y}, [{x: -20, y: -20 + 45}, {x: -20 + 45, y: -20 + 45}, {x: -20, y: -20}], {label: 'triangle', isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('triangle-4')) {
                pressed.push(i + 1);
                const x = ((i % cols) * cellSize) + 15;
                const y = (Math.floor(i / cols) * cellSize) + 15;
                finalPositions.push(`Matter.Bodies.fromVertices(${x}, ${y}, [{x: -20, y: -20}, {x: -20 + 45, y: -20}, {x: -20, y: -20 + 45}], {label: 'triangle', isStatic: true, render: { fillStyle: '#131313' }}),`);
            }

            if (btn.classList.contains('ball')) {
                pressed.push(i + 1);
                const x = (i % cols) * cellSize + 22.5;
                const y = Math.floor(i / cols) * cellSize + 22.5;
                const OutputBall = document.getElementById("OutputBall");
                OutputBall.innerHTML = ` ballStartX: ${x}, <br> ballStartY: ${y},`
            }

            if (btn.classList.contains('point')) {
                pressed.push(i + 1);
                const x = ((i % cols) * cellSize) + 22.5;
                const y = (Math.floor(i / cols) * cellSize) + 22.5;
                finalPositions.push(`Matter.Bodies.circle(${x}, ${y}, 10, { label: 'point', isSensor: true, isStatic: true, render: { fillStyle: '#ffee00ff' }}),`);
            }

            if (btn.classList.contains("descructive")) {
                pressed.push(i + 1);
                const x = ((i % cols) * cellSize) + 22.5;
                const y = (Math.floor(i / cols) * cellSize) + 22.5;
                finalPositions.push(`Matter.Bodies.rectangle(${x}, ${y}, 45, 45, { label: 'destructible', render: { fillStyle: '#7c0b0bff' }, isDestructible: true, isStatic: true}),`);
            }

            if (btn.classList.contains("hole")) {
                pressed.push(i + 1);
                const x = (i % cols) * cellSize + 22.5;
                const y = Math.floor(i / cols) * cellSize + 22.5;
                finalPositions.push(`Matter.Bodies.circle(${x}, ${y}, 16, { label: 'hole', isStatic: true, render: { fillStyle: '#000000' }}),`);
            }
        }
        
        if (pressed.length === 0) {
            console.log("No buttons pressed.");
            return;
        }

        const Output = document.getElementById("Output");
        const outText = finalPositions.join("\n");
        if (Output) {
            if ('value' in Output) {
                Output.value = outText;
            } else {
                Output.textContent = outText;
            }
            if (typeof Output.select === 'function') {
                Output.select();
            }
        } else {
            console.log(outText);
        }
    });
});

//ease of use things!
document.getElementById("copyButtonBall").addEventListener("click", () => {
    const OutputBall = document.getElementById("OutputBall").textContent;
    navigator.clipboard.writeText(OutputBall)
});

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

    return button;
};

const getMovingPlatformButtonAt = (row, col) => {
    return movingPlatformTable.querySelector(`button[data-row="${row}"][data-col="${col}"]`);
};

const clickMovingPlatformCell = (row, col) => {
    const button = getMovingPlatformButtonAt(row, col);
    return triggerMovingPlatformButton(button);
};

movingPlatformTable.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    triggerMovingPlatformButton(button);
});

if (gameField) { // console logging the clicked tile
    gameField.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;

        const row = Number(button.dataset.row);
        const col = Number(button.dataset.col);

        if (Number.isNaN(row) || Number.isNaN(col)) return;

        console.log(`Game field button clicked at row ${row}, col ${col}`);
    });
}

movingPlatformTable.querySelectorAll('button').forEach((btn) => {
    setMovingPlatformButtonDisplay(btn);
});

