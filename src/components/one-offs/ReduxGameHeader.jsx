import React from 'react';

class ReduxGameHeader extends React.Component {
    render() {
        return (
            <canvas ref="gameCanvas" style={{position: 'absolute', left: 0, border: 'solid 1px black'}} className="reduxgameheader" tabIndex="0" />
        );
    }

    componentDidMount() {
        var canvas = this.refs.gameCanvas;
        var ctx = canvas.getContext('2d');

        //pause play controls (space plays and pauses)
        var paused = false;
        var lastTime = 0;
        canvas.addEventListener('keyup', function(event) {
            if(event.which === 32)
                if(!(paused = !paused))
                    window.requestAnimationFrame(function(timePassed) {
                        drawLoop(timePassed, true)  
                    });
        });

        //somehow spawn a ball every
        window.addEventListener('scroll', function(event) {
        });

        //draw loop
        //Note: resetTime is necessary because of the shitty timePassed that raf sends
        var spawnInterval = 500;
        var spawnCountdown = spawnInterval;
        var posInterval = 200;
        var posCountdown = posInterval;
        var drawLoop = function(timePassed, resetTime) {
            if(resetTime)
                lastTime = timePassed;

            var dt = timePassed - lastTime;

            if((spawnCountdown -= dt) < 0) {
    var doc = document.documentElement;
    var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
                spawnCountdown = spawnInterval;
                var darkness = rand(200);
                if(Math.random() >= 0.5)
                    circles.push({
                        pos: { x: Math.random() * ctx.canvas.width / 2, y: 0 },
                        size: 10,
                        vel: { x: 20 + rand(20), y: 40 + rand(40) }, 
                        //color: { r: rand(255), g: rand(255), b: rand(255), a: 1 },
                        color: { r: darkness, g: darkness, b: darkness, a: 1 },
                        prevPos: [],
                    });
            }

            if((posCountdown -= dt) < 0) {
                posCountdown = posInterval;

                circles.forEach(function(circle) {
                    if(circle.prevPos.length >= 5)
                        circle.prevPos.shift();
                    circle.prevPos.push({
                        x: circle.pos.x,
                        y: circle.pos.y,
                    });
                });
            }

            draw(ctx, dt);
            lastTime = timePassed;
            if(!paused)
                window.requestAnimationFrame(drawLoop);
        };
        window.requestAnimationFrame(drawLoop);
    }
};

var rand = function(max) {
    return Math.floor(Math.random() * max);
}

var circles = [];

var draw = function(ctx, dt) {
    var minHeight = 80;
    var doc = document.documentElement;
    var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    ctx.canvas.width  = window.innerWidth;
    var potentialHeight = window.innerHeight - 200 - scrollTop;
    var top;
    if(potentialHeight > minHeight) {
        ctx.canvas.height = potentialHeight;
        top = 200 + scrollTop;
    } else {
        ctx.canvas.height = minHeight
        top = window.innerHeight - minHeight;
    }
    ctx.canvas.style.top = top + 'px';

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.closePath();

    circles.forEach(function(circle) {
        updatePosition(circle, dt, ctx.canvas.height);
        fullDrawCircle(ctx, circle);
    });
    //remove circles that have passed
    circles = circles.filter(function(circle) {
        return circle.pos.x < (ctx.canvas.width + circle.size);
    });

    //write in Asteredux on bottom with effects
    var text = "ASTEREDUX";
    var size = 48;
    var font = size + "px serif";
    var x = (ctx.canvas.width / 2) - 80;
    //bottom, 
    var y = ctx.canvas.height - ((minHeight - size) / 2);
    var alpha = 1 - (ctx.canvas.height / (window.innerHeight - 200));
    ctx.textBaseline = "bottom";
    for(var i=0; i!= 4; ++i)
        drawShadowText(ctx, text, x, y, size, alpha);
    drawText(ctx, text, x, y, {r: 0, g: 0, b: 0, a: alpha}, font);
};

var drawShadowText = function(ctx, text, x, y, size, alpha) {
    var c = { r: rand(255), g: rand(255), b: rand(255), a: alpha / 4 };
    size *= 1.05;
    x += -5 - Math.random() * 5;
    y += 8 - Math.random() * 5;

    var font = size + "px serif";
    drawText(ctx, text, x, y, c, font);
};

var drawText = function(ctx, text, x, y, c, font) {
    ctx.beginPath();
    ctx.font = font;
    ctx.fillStyle = "rgba("+c.r+","+c.g+","+c.b+","+c.a+")";
    ctx.fillText(text, x, y);
    ctx.closePath();
};

var updatePosition = function(circle, dt, height) {
    let deltaX = circle.vel.x * dt / 1000;
    let deltaY = circle.vel.y * dt / 1000;
    circle.pos.x += deltaX;
    if((circle.pos.y += deltaY) > height)
        circle.pos.y -= height;
}

var fullDrawCircle = function(ctx, circle) {
    circle.prevPos.forEach(function(pos, i) {
        drawCircle(ctx, pos, circle.size, {
            r: circle.color.r,
            g: circle.color.g,
            b: circle.color.b,
            a: circle.color.a * (i + 1) / (circle.prevPos.length + 1),
        });
    });
    drawCircle(ctx, circle.pos, circle.size, circle.color);
}

var drawCircle = function(ctx, pos, size, color) {
    ctx.beginPath();

    var c = color;
    ctx.fillStyle = "rgba("+c.r+","+c.g+","+c.b+","+c.a+")";
    ctx.arc(pos.x, pos.y, size, 0, Math.PI*2);
    ctx.fill();

    ctx.closePath();
};

export default ReduxGameHeader;
