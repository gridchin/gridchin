/**
 * Based on https://github.com/qrohlf/trianglify
 */

var pattern = Trianglify({
    height: window.innerHeight,
    width: window.innerWidth,
    variance: '1',
    x_colors: 'random',
    cell_size: 33});
document.body.appendChild(pattern.canvas());