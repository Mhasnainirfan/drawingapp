const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight-60



let Context = canvas.getContext("2d");
let start_background_color = "white"
Context.fillStyle = start_background_color;
Context.fillRect(0, 0, canvas.width, canvas.height);


let draw_color = "black";
let draw_width = "2"
let is_drawing = false;

let restore_array =[];
let index = -1;

function change_color(element) {
    draw_color = element.style.background;
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function start(event) {
    is_drawing = true;
    Context.beginPath();
    Context.moveTo(event.clientX - canvas.offsetLeft,
         event.clientY - canvas.offsetTop);
    
    event.preventDefault();  
    
   
}



function draw(event) {
    if(is_drawing) {
      Context.lineTo(event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop);
      Context.strokeStyle = draw_color;
      Context.lineWidth = draw_width;
      Context.lineCap = "round";
      Context.linejoin = "round";
      Context.stroke()
    }
    event.preventDefault();
}
function stop(event) {
    if(is_drawing){
        Context.stroke();
        Context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
    if(event.type !="mouseout"){
    restore_array.push(Context.getImageData(0, 0, canvas.width, canvas.height ));
    index += 1}
    console.log(restore_array)
}
function clear_canvas(){
    Context.fillStyle = start_background_color;
    Context.clearRect(0, 0, canvas.width, canvas.height);
    Context.fillRect(0, 0, canvas.width, canvas.height);

    let restore_array =[];
let index = -1;
}
function undo_last (){
    if(index <=0 ){
        clear_canvas()
    }
    else{
        index -= 1;
        restore_array.pop();
        Context.putImageData(restore_array[index], 0, 0);
    }
}



  
  
  

s