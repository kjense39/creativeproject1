var frame, move, player, obstacle, loop;

frame = document.querySelector("canvas").getContext("2d");

frame.canvas.height = 200;
frame.canvas.width = 320;

player = {
    height:30,
    width:30,
    jump:true,
    x:144,
    x_speed:0,
    y:0,
    y_speed:0,
};

obstacle = {
    height: 30,
    width: 20,
    x: 300,
    x_speed:0,
    y:0,
    y_speed:0,
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
    if (move.up && player.jump == false) {
        player.y_speed -= 20;
        player.jump = true;
    }
    
    if (move.left) {
        player.x_speed -=0.5;
    }
    
    if (move.right) {
        player.x_speed += 0.5;
    }
    
    player.y_speed += 1;
    player.x += player.x_speed;
    player.y += player.y_speed;
    player.x_speed *= .9;
    player.y_speed *= .9;
    
    if (player.y > 150) {
        player.jump = false;
        player.y = 150;
        player.y_speed = 0;
    }
    
    if (player.x < -30) { //teleports from side to side
        player.x = 320;
    }
    else if (player.x > 320) {
        player.x = -30;
    }
    
    frame.fillStyle = "#d6d6d6";
    frame.fillRect(0,0,320,200);
    frame.fillStyle = "red";
    frame.beginPath();
    frame.rect(player.x, player.y, player.width, player.height);
    frame.fill();
    
    window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", move.keyPress)
window.addEventListener("keyup", move.keyPress);
window.requestAnimationFrame(loop);