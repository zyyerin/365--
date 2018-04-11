function Box(x, y, w, h) {
    var options = {
        friction: 1,
        restitution: .2
    }
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(engine.world, this.body);
    
    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;
        
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        noFill();
        stroke(255);
        rect(0, 0, this.w*1.4, this.h*1.4);
        pop();
    }
}