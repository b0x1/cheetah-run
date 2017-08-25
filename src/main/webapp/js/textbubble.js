TextBubble = function(ctx, text, posX, posY, isPermanent) {
  this.ctx = ctx;
  this.ctx.font = "30pt Arial";
  this.ctx.fillStyle = "black";
  this.posX = posX || 0;
  this.posY = posY || 0;
  this.text = text || "";
  this.isPermanent = isPermanent || false;
  this.opacity = 1;
}

TextBubble.prototype = {
  constructor: TextBubble,
  
  bubble: function() {
    this.ctx.fillStyle = "rgba(0, 0, 0, " + this.opacity + ")";
    this.ctx.fillText(this.text, this.posX, this.posY);

    this.opacity -= 0.2;
    this.posY -= 40;
  },


};