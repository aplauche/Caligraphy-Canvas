const canvas = document.getElementById('draw')

const ctx = canvas.getContext('2d')

const canvasColors = document.querySelectorAll('.bg-color')
const penColors = document.querySelectorAll('.pen-color')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.strokeStyle = '#222'
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 50
// ctx.globalCompositeOperation = 'multiply'

let isDrawing = false;
let lastX = 0
let lastY = 0
let hue = 0
let width = 10
let direction = true

let compareX;
let compareY;

function draw(e) {
    if(!isDrawing) return;
    console.log(e)
    // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
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
            width+=2
        }     
    } else if (lastY < compareY) {
        if (width > 10){
            width-=2
        }
    }
    compareX = lastX
    compareY = lastY

}

function changeCanvasColor(e) {
    canvas.style.backgroundColor = e.target.getAttribute('data-bg')
    console.log(e.target)
}

function changePenColor(e) {
    ctx.strokeStyle = e.target.getAttribute('data-pen')
    penColors.forEach(color => {
        color.style.height = '50px'
    })
    e.target.style.height = '60px'

    console.log(e.target)
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

canvasColors.forEach(color => {
    color.style.backgroundColor = color.getAttribute('data-bg')
    color.addEventListener('click', changeCanvasColor)
})

penColors.forEach(color => {
    color.style.backgroundColor = color.getAttribute('data-pen')
    color.addEventListener('click', changePenColor)
})