/**
 * @author Hakim El Hattab - http://hakim.se/
 */

 var gridchinLogo = (function (window) {
    var INTRO_STATE = 0;
    var MORPH_STATE = 1;
    var OUTRO_STATE = 2;
    var ORIGINAL_WIDTH = 160;
    var ORIGINAL_HEIGHT = 254;
    var ORIGINAL_FRAMERATE = 60;
    var SHADOW_SCALE_Y = 0.5;
    var ORIGINAL_WORD_WIDTH = 75;
    var ORIGINAL_WORD_HEIGHT = 118;
    var MORPH_RANGE = 20;
    var MORPH_RANGE2 = MORPH_RANGE * 2;
    var TURBO_DECAY = 0.01;
    var FRICTION = 0.95;
    var SHAPE_OFFSET = 10;
    var PARALLAX_AMOUNT = 10;
    var IS_TOUCH_DEVICE = !! navigator.userAgent.match(/Android/i) || !! navigator.userAgent.match(/iPhone/i) || !! navigator.userAgent.match(/iPad/i) || !! navigator.userAgent.match(/iPod/i);
    var API = {
        util: {},
        input: {}
    };
    var document = window.document;
    var initialized = false;
    var options = {
        containerID: "logo",
        logoCanvasID: "logo-canvas",
        shadowCanvasID: null,
        wordOffsetX: -25,
        wordOffsetY: 0,
        wordScale: 1.3,
        framerate: IS_TOUCH_DEVICE ? 30 : ORIGINAL_FRAMERATE,
        debug: true,
        width: 254,
        height: 160,
        foregroundScaleX: 0.39,
        foregroundScaleY: 0.23,
        backgroundScaleX: 0.39,
        backgroundScaleY: 0.23,
        maxShapeRotation: 0.2,
        colorSpeedFactor: 1,
        introSpeedFactor: 3,
        outroSpeedFactor: 3,
        morphSpeedFactor: 1,
        morphBaseSpeedFactor: 0.2,
        morphStrengthFactor: 0.8,
        normalOffsetFactor: 1.5,
        shadowAlpha: 0.1,
        shapeQuality: 9,
        colors: [],
        inputs: [],
        fallbackImages: []
    };
    var container = null,
        logoCanvas = null,
        logoContext = null,
        shadowCanvas = null,
        shadowContext = null;
    var wordImage = null;
    var updateInterval = -1;
    var scale = 1;
    var alpha = 0;
    var turboMorphStrengthFactor = 1;
    var turboMorphSpeedFactor = 1;
    var turboColorSpeedFactor = 1;
    var visible = true;
    var tilt = {
        current: 0,
        target: 0
    };
    var shapeForeground = null,
        shapeBackground = null,
        shapeForegroundColor = null,
        shapeBackgroundColor = null;
    var shapeBounds = {
        left: 0,
        right: 0
    };
    var colorQueue = [];
    var colorTween = 0;
    var performance = {
        fps: options.framerate,
        lastSecond: new Date().getTime(),
        frameCount: 0,
        factor: 1
    };
    API.initialize = function (overrideOptions) {
        clearInterval(updateInterval);
        gridchinLogo.util.extendObject(options, overrideOptions);
        container = $("#" + options.containerID);
        logoCanvas = $("#" + options.logoCanvasID).get(0);
        shadowCanvas = $("#" + options.shadowCanvasID).get(0);
        if (logoCanvas && logoCanvas.getContext) {
            startLogoCanvas();
            if (shadowCanvas && shadowCanvas.getContext) {
                startShadowCanvas()
            }
        } else {
            startFallback()
        } if (options.debug) {
            enableDebugging()
        }
        if (initialized) {
            API.configure(overrideOptions)
        }
        initialized = true
    };
    API.configure = function (overrideOptions) {
        gridchinLogo.util.extendObject(options, overrideOptions);
        resize();
        if (logoContext) {
            createColorQueue();
            shapeForegroundColor = colorQueue[0][0].clone();
            shapeBackgroundColor = colorQueue[0][1].clone();
            shapeForeground = createShape(ORIGINAL_WIDTH * options.foregroundScaleX, ORIGINAL_HEIGHT * options.foregroundScaleY, 0.2);
            shapeBackground = createShape(ORIGINAL_WIDTH * options.backgroundScaleX, ORIGINAL_HEIGHT * options.backgroundScaleY, 3.3);
            alpha = 0;
            API.show()
        }
    };
    API.getOptions = function () {
        return options
    };
    API.getScale = function () {
        return scale
    };
    API.applyImpulse = function (x, y, strength, radius) {
        function applyForceToShape(shape) {
            var center = centerOfShape(shape);
            var target = {
                x: x - center.x,
                y: y - center.y
            };
            for (var i = 0, len = shape.points.length; i < len; i++) {
                var p = shape.points[i];
                var distance = gridchinLogo.util.distanceBetween(target, p);
                if (distance < radius) {
                    var factor = 1 - (distance / radius);
                    p.velocity.x += ((p.x - target.x) / options.width) * strength * factor;
                    p.velocity.y += ((p.y - target.y) / options.height) * strength * factor
                }
            }
        }
        applyForceToShape(shapeForeground);
        applyForceToShape(shapeBackground)
    };
    API.applyForce = function (x, y, fx, fy, radius) {
        function applyForceToShape(shape) {
            var center = centerOfShape(shape);
            var target = {
                x: x - center.x,
                y: y - center.y
            };
            for (var i = 0, len = shape.points.length; i < len; i++) {
                var p = shape.points[i];
                var distance = gridchinLogo.util.distanceBetween(target, p);
                if (distance < radius) {
                    var factor = 1 - (distance / radius);
                    p.velocity.x += fx * factor * scale;
                    p.velocity.y += fy * factor * scale
                }
            }
        }
        applyForceToShape(shapeForeground);
        applyForceToShape(shapeBackground)
    };
    API.applyParallax = function (fx, fy, bx, by) {
        shapeForeground.offset.tx = Math.cos(shapeForeground.offset.angle) * PARALLAX_AMOUNT + fx;
        shapeForeground.offset.ty = Math.sin(shapeForeground.offset.angle) * PARALLAX_AMOUNT + fy;
        shapeBackground.offset.tx = Math.cos(shapeBackground.offset.angle) * PARALLAX_AMOUNT + bx;
        shapeBackground.offset.ty = Math.sin(shapeBackground.offset.angle) * PARALLAX_AMOUNT + by
    };
    API.applyTilt = function (t) {
        tilt.target = t
    };
    API.applyTurbo = function (morphStrength, morphSpeed, colorSpeed) {
        turboMorphStrengthFactor = morphStrength;
        turboMorphSpeedFactor = morphSpeed;
        turboColorSpeedFactor = colorSpeed
    };
    API.changeColor = function () {
        colorQueue.shift();
        if (!colorQueue[0]) {
            createColorQueue()
        }
    };
    API.show = function () {
        visible = true;
        var points = shapeForeground.points.concat(shapeBackground.points);
        points.map(function (p) {
            p.state = INTRO_STATE;
            p.target.x = p.normal.x;
            p.target.y = p.normal.y
        })
    };
    API.hide = function () {
        visible = false;
        var points = shapeForeground.points.concat(shapeBackground.points);
        points.map(function (p) {
            p.state = OUTRO_STATE;
            p.target.x = 0;
            p.target.y = 0
        })
    };

    function startLogoCanvas() {
        logoContext = logoCanvas.getContext("2d");
        resize();
        createColorQueue();
        shapeForegroundColor = colorQueue[0][0].clone();
        shapeBackgroundColor = colorQueue[0][1].clone();
        shapeForeground = createShape(ORIGINAL_WIDTH * options.foregroundScaleX, ORIGINAL_HEIGHT * options.foregroundScaleY, 0.2);
        shapeBackground = createShape(ORIGINAL_WIDTH * options.backgroundScaleX, ORIGINAL_HEIGHT * options.backgroundScaleY, 3.3);
        $(logoCanvas).show();
        wordImage = $("<img>").load(function () {
            updateInterval = setInterval(loop, 1000 / options.framerate)
        });
        wordImage.attr("src", options.wordImageURL);
        options.inputs.map(function (input) {
            input.initialize()
        })
    }

    function startShadowCanvas() {
        shadowContext = shadowCanvas.getContext("2d");
        $(shadowCanvas).css("display", "block");
        resize()
    }

    function startFallback() {
        $("img", container).show().mouseover(function (event) {
            var shiftee = options.fallbackImages.shift();
            $(this).attr("src", shiftee);
            options.fallbackImages.push(shiftee)
        })
    }

    function enableDebugging() {
        options.debug = true;

        function createDebugProperty(property, wrap) {
            return "\t " + property + ": " + (wrap || "") + options[property] + (wrap || "") + ",\n"
        }
        var configureScript = "gridchinLogo.initialize({\n";
        configureScript += createDebugProperty("framerate");
        configureScript += "\t\n";
        configureScript += createDebugProperty("width");
        configureScript += createDebugProperty("height");
        configureScript += "\t\n";
        configureScript += createDebugProperty("colorSpeedFactor");
        configureScript += createDebugProperty("morphSpeedFactor");
        configureScript += createDebugProperty("morphStrengthFactor");
        configureScript += createDebugProperty("morphBaseSpeedFactor");
        configureScript += createDebugProperty("introSpeedFactor");
        configureScript += createDebugProperty("outroSpeedFactor");
        configureScript += createDebugProperty("normalOffsetFactor");
        configureScript += "\t\n";
        configureScript += createDebugProperty("maxShapeRotation");
        configureScript += "\t\n";
        configureScript += createDebugProperty("wordOffsetX");
        configureScript += createDebugProperty("wordOffsetY");
        configureScript += createDebugProperty("wordScale");
        configureScript += "\t\n";
        configureScript += createDebugProperty("foregroundScaleX");
        configureScript += createDebugProperty("foregroundScaleY");
        configureScript += createDebugProperty("backgroundScaleX");
        configureScript += createDebugProperty("backgroundScaleY");
        configureScript += "\t\n";
        configureScript += createDebugProperty("shadowAlpha");
        configureScript += "\t\n";
        configureScript += createDebugProperty("shapeQuality");
        configureScript += "\t\n";
        configureScript += createDebugProperty("containerID", '"');
        configureScript += createDebugProperty("logoCanvasID", '"');
        configureScript += createDebugProperty("shadowCanvasID", '"');
        configureScript += "\t\n";
        configureScript += "\t	colors: [\n";
        configureScript += "\t\t\t // Foreground: \t\t\t\t\t\t\t Background: \n";
        for (var i = 0; i < options.colors.length; i++) {
            var ca = options.colors[i][0];
            var cb = options.colors[i][0];
            configureScript += "\t\t\t [ new gridchinLogo.util.Color( " + ca.r + ", " + ca.g + ", " + ca.r + " ), \t new gridchinLogo.util.Color( " + ca.r + ", " + ca.g + ", " + ca.r + " ) ],\n"
        }
        configureScript += "\t\t ]\n";
        configureScript += "});";
        $("#debug-panel textarea").text(configureScript);
        $("#debug-panel .run").click(function (event) {
            event.preventDefault();
            eval($("#debug-panel textarea").val())
        });
        $("#debug-panel .save").click(function (event) {
            event.preventDefault();
            window.open(logoCanvas.toDataURL("image/png"))
        })
    }

    function createColorQueue() {
        function random_sort(item) {
            return 0.5 - Math.random()
        }
        colorQueue = options.colors.concat();
        colorQueue.sort(random_sort)
    }

    function createShape(radiusx, radiusy, offsetAngle) {
        var shape = {
            offset: {
                x: 0,
                y: 0,
                tx: Math.cos(offsetAngle) * SHAPE_OFFSET,
                ty: Math.sin(offsetAngle) * SHAPE_OFFSET,
                angle: offsetAngle
            },
            radiusx: radiusx,
            radiusy: radiusy,
            rotation: (-(options.maxShapeRotation * 0.5) + Math.random() * options.maxShapeRotation),
            points: []
        };
        var count = options.shapeQuality;
        while (--count) {
            var point = {
                normal: createShapeNormal(shape, count, options.shapeQuality),
                normalTarget: {
                    x: 0,
                    y: 0
                },
                offset: {
                    x: (-MORPH_RANGE + Math.random() * MORPH_RANGE2) * scale,
                    y: (-MORPH_RANGE + Math.random() * MORPH_RANGE2) * scale
                },
                target: {
                    x: 0,
                    y: 0
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                speed: 0.01 + Math.random() * 0.015,
                state: INTRO_STATE,
                x: 0,
                y: 0
            };
            point.target.x = point.normal.x;
            point.target.y = point.normal.y;
            point.normalTarget.x = point.normal.x;
            point.normalTarget.y = point.normal.y;
            shape.points.push(point)
        }
        return shape
    }
    var shapeTemplate = 1 + Math.floor(Math.random() * 3);

    function createShapeNormal(shape, index, total) {
        var scaleOffsetX = 1;
        var scaleOffsetY = 1;
        var scaleOffsetXRange = 0.1 * options.normalOffsetFactor;
        var scaleOffsetYRange = 0.2 * options.normalOffsetFactor;
        if (Math.random() > 0.3) {
            scaleOffsetX -= scaleOffsetXRange + Math.random() * scaleOffsetXRange;
            if (shapeTemplate == 1) {
                if (index % 2 == 0) {
                    scaleOffsetY += scaleOffsetYRange + Math.random() * scaleOffsetYRange
                } else {
                    scaleOffsetY -= scaleOffsetYRange + Math.random() * scaleOffsetYRange
                }
            } else {
                if (shapeTemplate == 2) {
                    if (index % 2 == 0) {
                        scaleOffsetY -= scaleOffsetYRange + Math.random() * scaleOffsetYRange
                    } else {
                        scaleOffsetY += scaleOffsetYRange + Math.random() * scaleOffsetYRange
                    }
                } else {
                    if (Math.random() > 0.5) {
                        scaleOffsetY -= scaleOffsetYRange + Math.random() * scaleOffsetYRange
                    } else {
                        scaleOffsetY += scaleOffsetYRange + Math.random() * scaleOffsetYRange
                    }
                }
            }
        }
        var angle = (index / total) * Math.PI * 2;
        return {
            x: (Math.cos(angle) * (shape.radiusx * scaleOffsetX)) * scale,
            y: (Math.sin(angle) * (shape.radiusy * scaleOffsetY)) * scale
        }
    }

    function centerOfShape(shape) {
        return {
            x: (options.width * 0.5) + (shape.offset.x * scale),
            y: (options.height * 0.5) + (shape.offset.y * scale)
        }
    }

    function resize(width, height) {
        options.width = width || options.width;
        options.height = height || options.height;
        scale = Math.min(options.width / ORIGINAL_WIDTH, options.height / ORIGINAL_HEIGHT);
        if (logoCanvas) {
            logoCanvas.width = options.width;
            logoCanvas.height = options.height
        }
        if (shadowCanvas) {
            shadowCanvas.width = options.width;
            shadowCanvas.height = options.height * SHADOW_SCALE_Y
        }
    }

    function loop() {
        tilt.current += (tilt.target - tilt.current) * 0.2;
        turboColorSpeedFactor += (1 - turboColorSpeedFactor) * TURBO_DECAY;
        turboMorphSpeedFactor += (1 - turboMorphSpeedFactor) * TURBO_DECAY;
        turboMorphStrengthFactor += (1 - turboMorphStrengthFactor) * TURBO_DECAY;
        updateColor();
        updatePerformance();
        updateShape(shapeForeground);
        updateShape(shapeBackground);
        renderLogo();
        renderWord();
        renderShadow()
    }

    function updatePerformance() {
        var frameTime = new Date().getTime();
        performance.frameCount++;
        if (frameTime > performance.lastSecond + 1000) {
            performance.fps = Math.max(Math.min(Math.round((performance.frameCount * 1000) / (frameTime - performance.lastSecond)), options.framerate), 1);
            performance.factor = Math.min(ORIGINAL_FRAMERATE / options.framerate, 1) + (1 - performance.fps / ORIGINAL_FRAMERATE);
            performance.lastSecond = frameTime;
            performance.frameCount = 0
        }
    }

    function updateColor() {
        var shapeForegroundColorTarget = colorQueue[0][0];
        var shapeBackgroundColorTarget = colorQueue[0][1];
        shapeForegroundColor.approach(shapeForegroundColorTarget, 0.015 * options.colorSpeedFactor * performance.factor * turboColorSpeedFactor);
        shapeBackgroundColor.approach(shapeBackgroundColorTarget, 0.015 * options.colorSpeedFactor * performance.factor * turboColorSpeedFactor);
        var foregroundDone = shapeForegroundColor.isWithinRangeOf(0.1 * options.colorSpeedFactor * turboColorSpeedFactor, shapeForegroundColorTarget);
        var backgroundDone = shapeBackgroundColor.isWithinRangeOf(0.1 * options.colorSpeedFactor * turboColorSpeedFactor, shapeBackgroundColorTarget);
        if (foregroundDone && backgroundDone) {
            colorQueue.shift();
            if (!colorQueue[0]) {
                createColorQueue()
            }
        }
        if (visible) {
            alpha = Math.min(alpha + 0.01 * options.introSpeedFactor, 1)
        } else {
            alpha = Math.max(alpha - 0.01 * options.outroSpeedFactor, 0)
        }
    }

    function updateShape(shape) {
        shape.offset.x += (shape.offset.tx - shape.offset.x) * 0.1;
        shape.offset.y += (shape.offset.ty - shape.offset.y) * 0.1;
        for (var i = 0, len = shape.points.length; i < len; i++) {
            p1 = gridchinLogo.util.getLoopedArrayElement(shape.points, i);
            shapeBounds.left = Math.min(shapeBounds.left, p1.x);
            shapeBounds.right = Math.max(shapeBounds.right, p1.x);
            var speedFactor = options.morphSpeedFactor;
            switch (p1.state) {
            case INTRO_STATE:
                speedFactor = options.introSpeedFactor;
                break;
            case OUTRO_STATE:
                speedFactor = options.outroSpeedFactor;
                break
            }
            p1.normal.x += (p1.normalTarget.x - p1.normal.x) * 0.01;
            p1.normal.y += (p1.normalTarget.y - p1.normal.y) * 0.01;
            p1.x += (p1.target.x - p1.x) * p1.speed * speedFactor * performance.factor * turboMorphSpeedFactor;
            p1.y += (p1.target.y - p1.y) * p1.speed * speedFactor * performance.factor * turboMorphSpeedFactor;
            p1.x += p1.velocity.x;
            p1.y += p1.velocity.y;
            p1.velocity.x *= FRICTION;
            p1.velocity.y *= FRICTION;
            if (gridchinLogo.util.distanceBetween(p1, p1.normal) > MORPH_RANGE2) {
                p1.velocity.x *= Math.pow(FRICTION, 16);
                p1.velocity.y *= Math.pow(FRICTION, 16)
            }
            if (Math.abs(p1.x - p1.target.x) < 1) {
                if (p1.state !== OUTRO_STATE) {
                    p1.target.x = p1.normal.x;
                    p1.target.x += (-MORPH_RANGE + Math.random() * MORPH_RANGE2) * options.morphStrengthFactor * turboMorphStrengthFactor * scale;
                    p1.state = MORPH_STATE
                }
            }
            if (Math.abs(p1.y - p1.target.y) < 1) {
                if (p1.state !== OUTRO_STATE) {
                    p1.target.y = p1.normal.y;
                    p1.target.y += (-MORPH_RANGE + Math.random() * MORPH_RANGE2) * options.morphStrengthFactor * turboMorphStrengthFactor * scale;
                    p1.state = MORPH_STATE
                }
            }
            if (Math.abs(p1.normal.x - p1.normalTarget.x) < 1 && Math.abs(p1.normal.y - p1.normalTarget.y) < 1) {
                p1.normalTarget = createShapeNormal(shape, shape.points.length - i, options.shapeQuality)
            }
        }
    }

    function renderShadow() {
        if (shadowCanvas && shadowContext) {
            var width = shadowCanvas.width;
            var height = shadowCanvas.height;
            var scaleX = 1 + Math.abs(shapeBounds.right - shapeBounds.left) / options.width;
            var scaleY = 0.2;
            var offsetX = (Math.abs(shapeBounds.left) - Math.abs(shapeBounds.right)) / 2;
            shadowContext.clearRect(0, 0, width, height);
            shadowContext.save();
            shadowContext.globalAlpha = alpha;
            shadowContext.translate(-(width * (scaleX - 1) / 2) - offsetX, -(height * (scaleY - 1) / 2));
            shadowContext.scale(scaleX, scaleY);
            var shadowGradient = shadowContext.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, height / 2);
            shadowGradient.addColorStop(0.3, "rgba(0, 0, 0, " + options.shadowAlpha + ")");
            shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
            shadowContext.fillStyle = shadowGradient;
            shadowContext.fillRect(0, 0, width, height);
            shadowContext.restore()
        }
    }

    function renderLogo() {
        shapeBounds.left = options.width;
        shapeBounds.right = 0;
        logoContext.clearRect(0, 0, options.width, options.height);
        logoContext.save();
        logoContext.globalAlpha = alpha;
        logoContext.save();
        if (tilt.current !== 0 || tilt.target !== tilt.current) {
            logoContext.translate(Math.round(options.width * 0.5), Math.round(options.height * 0.5));
            logoContext.rotate(tilt.current);
            logoContext.translate(-Math.round(options.width * 0.5), -Math.round(options.height * 0.5))
        }
        renderShape(shapeForeground, shapeForegroundColor);
        logoContext.save();
        logoContext.globalCompositeOperation = "source-atop";
        renderShape(shapeBackground, new gridchinLogo.util.Color(0, 0, 0, 0.5));
        logoContext.globalCompositeOperation = "destination-over";
        renderShape(shapeBackground, shapeBackgroundColor);
        logoContext.restore();
        logoContext.restore();
        logoContext.restore()
    }

    function renderWord() {
        logoContext.save();
        logoContext.globalAlpha = alpha;
        var sw = ORIGINAL_WORD_WIDTH * scale * options.wordScale;
        var sh = ORIGINAL_WORD_HEIGHT * scale * options.wordScale;
        var ox = Math.round((options.width - sw) * 0.5) + (options.wordOffsetX * scale);
        var oy = Math.round((options.height - sh) * 0.5) + (options.wordOffsetY * scale);
        logoContext.drawImage(wordImage.get(0), ox, oy, sw, sh);
        logoContext.restore()
    }

    function renderShape(shape, color) {
        var shapeCenter = centerOfShape(shape);
        logoContext.save();
        logoContext.translate(shapeCenter.x, shapeCenter.y);
        logoContext.rotate(shape.rotation);
        logoContext.beginPath();
        var p1 = gridchinLogo.util.getLoopedArrayElement(shape.points, -1);
        var p2 = gridchinLogo.util.getLoopedArrayElement(shape.points, 0);
        logoContext.moveTo(p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2);
        for (var i = 0, len = shape.points.length; i <= len; i++) {
            p1 = gridchinLogo.util.getLoopedArrayElement(shape.points, i);
            p2 = gridchinLogo.util.getLoopedArrayElement(shape.points, i + 1);
            logoContext.quadraticCurveTo(p1.x, p1.y, p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2)
        }
        logoContext.fillStyle = color.toRGBAString();
        logoContext.fill();
        logoContext.restore()
    }
    return API
}(window));