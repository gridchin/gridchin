/**
 * @author http://letters-inc.jp/
 */
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    subheadH = $(window).height();
    winW = $(window).width();
    var d = 100,
        j = 50,
        i = 50;
    var a, f;
    var k, e, l;
    var o, h, g = 0;
    n();
    c();

    function n() {
        k = new THREE.PerspectiveCamera(75, winW / subheadH, 1, 10000);
        k.position.z = 1000;
        k.position.y = 0;
        e = new THREE.Scene();
        o = new Array();
        var t = Math.PI * 2;
        var s = new THREE.SpriteCanvasMaterial({
            color: 16777215,
            program: function(u) {
                u.beginPath();
                u.strokeStyle = "rgba(0, 0, 0, 0.4)";
                u.lineTo(0, 0);
                u.lineTo(10, 0);
                u.stroke()
            }
        });
        var r = 0;
        for (var q = 0; q < j; q++) {
            for (var p = 0; p < i; p++) {
                h = o[r++] = new THREE.Sprite(s);
                h.position.x = q * d - ((j * d) / 2);
                h.position.z = p * d - ((i * d) / 2);
                e.add(h)
            }
        }
        l = new THREE.CanvasRenderer();
        l.setSize(winW, subheadH);
        $("#canvas").html(l.domElement);
        window.addEventListener("resize", m, false)
    }

    function m() {
        windowHalfX = winW / 2;
        windowHalfY = subheadH / 2;
        k.aspect = winW / subheadH;
        k.updateProjectionMatrix();
        l.setSize(winW, subheadH)
    }

    function c() {
        requestAnimationFrame(c);
        b()
    }

    var myReq = requestAnimationFrame(c);
    function stop() { 
    	window.cancelAnimationFrame(myReq);
    }

    function b() {
        k.lookAt(e.position);
        var r = 0;
        for (var q = 0; q < j; q++) {
            for (var p = 0; p < i; p++) {
                h = o[r++];
                h.position.y = (Math.sin((q + g) * 0.4) * 100)
            }
        }
        l.render(e, k);
        g += 0.1
    }

    setTimeout(function() {
        $('body').addClass('loaded');
    }, 0);
