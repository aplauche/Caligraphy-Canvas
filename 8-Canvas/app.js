const canvas = document.getElementById('draw')

const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.strokeStyle = '#BADA55'
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 50
// ctx.globalCompositeOperation = 'multiply'

let isDrawing = false;
let lastX = 0
let lastY = 0
let hue = 0
let width = 5
let direction = true

let compareX;
let compareY;

function draw(e) {
    if(!isDrawing) return;
    console.log(e)
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.lineWidth = width
    ctx.beginPath();
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    lastX = e.offsetX
    lastY = e.offsetY
    hue++
    if(lastY > compareY){
        if(width < 25){
            width++
        }     
    } else if (lastY < compareY) {
        if (width > 5){
            width--
        }
    }
    compareX = lastX
    compareY = lastY

}



// EVENT LISTENERS
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mousedown', (e)=> {
    isDrawing = true
    lastX = e.offsetX
    lastY = e.offsetY
})
canvas.addEventListener('mouseup', ()=> isDrawing = false)
canvas.addEventListener('mouseout', ()=> isDrawing = false)