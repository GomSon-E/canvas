const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode')
const save = document.getElementById('jsSave')

canvas.width = 1000;
canvas.height = 500;

// 투명 이미지가 되지 않도록 하얀 배경 설정
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// 디폴트값 설정
ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove (event) {
    // client : 윈도우 전체의 범위 내에서의 마우스 위치값을 나타냄
    // offset : 캔버스 범위 내에서의 마우스 위치값을 나타냄
    const x = event.offsetX
    const y = event.offsetY
    console.log(x, y)
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange (event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "fill"
    } else {
        filling = true;
        mode.innerText = "paint";
        ctx.fillStyle = ctx.strokeStyle
    }
}

function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

// 마우스 우클릭 방지
function handleCM(event) {
    event.preventDefault()
}

function handleSaveClick() {
    const img = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = img;
    link.download = 'DOWNLOAD PAINT';
    link.click()
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))

if (range){
    range.addEventListener('input', handleRangeChange);
}

if(mode) {
    mode.addEventListener('click', handleModeClick)
}

if(save) {
    save.addEventListener('click', handleSaveClick)
}