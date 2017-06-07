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
  var start = scroll(options);

  // setup tween
  var tween = Tween(start)
    .ease(options.ease || 'out-circ')
    .to({ top: y, left: x })
    .duration(options.duration || 1000);

  var updateScroll = options.container
    ? function (o) {
      options.container.scrollTop = o.top | 0;
      options.container.scrollLeft = o.left | 0;
    }
    : function (o) {
      window.scrollTo(o.left | 0, o.top | 0);
    }

  // scroll
  tween.update(updateScroll);

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

function scroll(options) {
  var y = options.container
          ? options.container.scrollTop
          : window.pageYOffset || document.documentElement.scrollTop;
  var x = options.container
          ? options.container.scrollLeft
          : window.pageXOffset || document.documentElement.scrollLeft;
  return { top: y, left: x };
}
