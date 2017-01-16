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
