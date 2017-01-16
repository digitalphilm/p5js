// noprotect
var scl = 100;
var rows = 600 / scl;
var cols = 600 / scl;
var cars = [];
var oldX;
var oldY;

function setup() {
  createCanvas(600, 600);

  cars[0] = new Car(0, 2, true, 1, 2);
  cars[1] = new Car(1, 3, false, 0, 0);
  cars[2] = new Car(2, 2, true, 1, 0);
  cars[3] = new Car(3, 3, false, 3, 1);
  cars[4] = new Car(4, 2, false, 0, 3);
  cars[5] = new Car(5, 2, true, 1, 4);
  cars[6] = new Car(6, 3, true, 2, 5);
  cars[7] = new Car(7, 3, false, 5, 3);
}

function mousePressed() {
	for (var i = 0; i < cars.length; i++) {
  	cars[i].clicked(mouseX,mouseY);  
  }
}

function mouseReleased() {
	for (var i = 0; i < cars.length; i++) {
  	cars[i].stopDragging();  
  }
}

function draw() {
  background(0);
	for (var i = 0; i < cars.length; i++) {
  	cars[i].mouseover(mouseX,mouseY);
  	cars[i].drag(mouseX,mouseY);
    cars[i].touching();
  	cars[i].display();
  }
}

function Car(index, l_, dir_, x_, y_) {
  this.l = l_;
  this.horiz = dir_;
  this.x = x_*scl;
  this.y = y_*scl;
  var x1;
  var y1;
  var top;
  var blockedTop;
  var right;
  var blockedRight;
  var bottom;
  var blockedBottom;
  var left;
  var blockedLeft;
  this.index = index;
  this.offsetX = 0;
  this.offsetY = 0; 
  this.dragging = false; //are we dragging?
  this.hover = false; //are we hovering over this object?
  
  // Is a point inside the rectangle (for rollover)
  this.mouseover = function(mx, my) {
    if (this.horiz) {
    	if (mx > this.x && mx < this.x + (this.l * scl) && my > this.y && my < this.y + scl) {
	      this.hover = true;
	    } else {
	      this.hover = false;
	    }
    } else {
      if (mx > this.x && mx < this.x + scl && my > this.y && my < this.y + (this.l * scl)) {
	      this.hover = true;
	    } else {
	      this.hover = false;
	    }
    }
  }
  
  // Is a point inside the rectangle (for click)?
  this.clicked = function(mx, my) {
    if (mx > this.left && mx < this.right && my > this.top && my < this.bottom) {
    	this.dragging = true
	    if (this.horiz) {
	      oldX = mx;
     		this.offsetX = this.x-mx;
	    } else {
	      oldY = my;
        this.offsetY = this.y-my;
	    }
    }
  }

  // Stop dragging
  this.stopDragging = function() {
    this.dragging = false;
  }
  
  // Drag the rectangle
  this.drag = function(mx, my) {
    if (this.dragging) {
      if (this.horiz) {
      	if (oldX < mx && !this.blockedRight) this.x = ceil((mx + this.offsetX)/100)*100;
      	if (oldX > mx && !this.blockedLeft) this.x = ceil((mx + this.offsetX)/100)*100;
      	oldX = mx;
      } else {
      	if (oldY < my && !this.blockedBottom) this.y = ceil((my + this.offsetY)/100)*100;
      	if (oldY > my && !this.blockedTop) this.y = ceil((my + this.offsetY)/100)*100;
        oldY = my;
      }
    }
  }
  
  // Method to display
  this.display = function() {
    stroke(255);
    //set the colour
    if (index === 0) {
      if (this.dragging) c = color(155, 0, 0);
      if (this.hover) c = color(205, 0, 0);
      if (!this.dragging && !this.hover) c = color(255, 0, 0);
    } else {
      if (this.dragging) c = color(100, 100, 100);
      if (this.hover) c = color(150, 150, 150);
      if (!this.dragging && !this.hover) c = color(200, 200, 200);
    }
    fill(c);
    
		// d = 0 horizontal; 1 = vertical
    if (this.horiz) {
      rect(this.x, this.y, this.l * scl, scl);
    } else {
      rect(this.x, this.y, scl, this.l * scl);
    }
    
    stroke(0);
  	fill(255);
    //text(this.index+"x="+this.x/scl+",y="+this.y/scl+"\nx1="+this.x1/scl+",y1="+this.y1/scl+"\ntop="+this.top+",bot="+this.bottom+"\nright="+this.right+",left="+this.left+"\nbt="+this.blockedTop+",br="+this.blockedRight+"\nbb="+this.blockedBottom+",bl="+this.blockedLeft, this.x+5, this.y+15)
    
    if (this.horiz) {
	    this.x1 = this.x + (this.l*scl);
	    this.y1 = this.y + scl;
	  } else {
	    this.x1 = this.x + scl;
	    this.y1 = this.y + (this.l*scl);
  	}
  
  	this.top = min(this.y, this.y1);
  	this.bottom = max(this.y, this.y1);
  	this.left = min(this.x, this.x1);
  	this.right = max(this.x, this.x1);
    
    
	  if (this.index === 0 && this.right >= width) {
	    background(0,255,0);
			noLoop();
	  }
  }
  
	this.touching = function() {
    this.blockedTop = this.blockedRight = this.blockedBottom = this.blockedLeft = false;
  	for (var i = 0; i < cars.length; i++) {
	    if (i === this.index) continue;
	    if (this.horiz) {
        var sameX = this.bottom > cars[i].top && this.top < cars[i].bottom;
	      if ((sameX && this.right >= cars[i].left && this.left < cars[i].left) || this.right >= width) this.blockedRight = true;        
        if ((sameX && this.left <= cars[i].right && this.right > cars[i].right) || this.left <= 0) this.blockedLeft = true;
	    } else {
        var sameY = this.right > cars[i].left && this.left < cars[i].right;
	      if ((sameY && this.bottom >= cars[i].top && this.top < cars[i].top) || this.bottom >= height) this.blockedBottom = true;        
        if ((sameY && this.top <= cars[i].bottom && this.bottom > cars[i].bottom) || this.top <= 0) this.blockedTop = true;
      }
	  }
	}
}//end Car();
