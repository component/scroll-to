/**
 * Module dependencies.
 */

var Tween = require('tween');
var raf = require('raf');

/**
 * Expose `scrollTo`.
 */

module.exports = scrollTo;

/**
 * Scroll to `(x, y)`.
 *
 * @param {Number} x
 * @param {Number} y
 * @api public
 */

function scrollTo(x, y, options) {
  options = options || {};

  // start position
  var start = scroll(options.box);
  
  if (options.box) {
    y += options.box.scrollTop || 0;
    x += options.box.scrollLeft || 0;
  }
  
  // setup tween
  var tween = Tween(start)
    .ease(options.ease || 'out-circ')
    .to({ top: y, left: x })
    .duration(options.duration || 1000);

  // scroll
  tween.update(function(o){
    if (options.box) {
      options.box.scrollTop = o.top;
      options.box.scrollLeft = o.left;
    }
    else window.scrollTo(o.left | 0, o.top | 0);
  });

  // handle end
  tween.on('end', function(){
    animate = function(){};
  });

  // animate
  function animate() {
    raf(animate);
    tween.update();
  }

  animate();
  
  return tween;
}

/**
 * Return scroll position.
 *
 * @return {Object}
 * @api private
 */

function scroll(box) {
  var y = (box && box.scrollTop) || this.pageYOffset || document.documentElement.scrollTop;
  var x = (box && box.scrollLeft) || this.pageXOffset || document.documentElement.scrollLeft;
  return { top: y, left: x };
}