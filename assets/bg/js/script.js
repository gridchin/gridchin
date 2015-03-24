/**
 * Based on http://qrohlf.com/trianglify/
 */

var t = new Trianglify();
var prevheight = height();

var bg = function() {
    recolor();
    redraw();
    return false;
}

window.onresize = function() {
    redraw();
};

function heightChange() {
    if (height() != prevheight) {
        prevheight = height();
        redraw();
    }
}

redraw();

function redraw() {
    var pattern = t.generate(document.body.clientWidth, height());
    document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);
}

function recolor() {
    t.options.x_gradient = Trianglify.randomColor();
    t.options.y_gradient = t.options.x_gradient.map(function(c){return d3.rgb(c).brighter(0.5);});
}

function height() {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
}

function toggleClass(el, className) {
    if (el.classList) {
      return el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
      return existingIndex >= 0;
    }
}