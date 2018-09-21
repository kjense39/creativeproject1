var frame, move, player, block, loop;

frame = document.querySelector("canvas").getContext("2d");

frame.canvas.height = 200;
frame.canvas.width = 320;

player = {
    height:30,
    width:30,
    jump:true,
    x:80,
    y:150,
    y_speed:0,
};

block = {
    height: 20,
    width: 20,
    x: 280,
    x_speed: -3,
    y:160,
};

move = {
    
    left:false,
    right:false,
    up:false,
    keyPress:function(event) {
        var key_press = (event.type == "keydown")? true : false;
        switch(event.keyCode) {
            case 37:
                move.left = key_press;
                break;
            case 38:
                move.up = key_press;
                break;
            case 39:
                move.right = key_press;
                break;
        }
    }
};

loop = function() {
    
    block.x += block.x_speed;
    
    if (block.x < -20) {
        block.x = 320
    }
    
    if (move.up && player.jump == false) {
        player.y_speed -= 20;
        player.jump = true;
    }
    
    player.y_speed += .9;
    player.y += player.y_speed;
    player.y_speed *= .9;
    
    if (player.y > 150) {
        player.jump = false;
        player.y = 150;
        player.y_speed = 0;
    }
    
    
    frame.fillStyle = "#d6d6d6";
    frame.fillRect(0,0,320,200);
    frame.fillStyle = "red";
    frame.beginPath();
    frame.rect(player.x, player.y, player.width, player.height);
    frame.fill();
    frame.fillStyle = "blue";
    frame.beginPath();
    frame.rect(block.x, block.y, block.width, block.height);
    frame.fill();
    
    if (!(player.x < block.x + block.width &&
        player.x + player.width > block.x &&
        player.y < block.y + block.height &&
        player.y + player.height > block.y)) {
            window.requestAnimationFrame(loop);
        }
    
};

window.addEventListener("keydown", move.keyPress)
window.addEventListener("keyup", move.keyPress);
window.requestAnimationFrame(loop);