// ...existing code...
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
        'hole'
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

        btn.addEventListener('mousedown', function (e) {
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

    // Export: find all buttons with class "squere" and log their numbers (1-based)
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