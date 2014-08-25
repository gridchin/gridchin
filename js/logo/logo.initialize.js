/**
 * @author Hakim El Hattab - http://hakim.se/
 */

 showLogo('#logo img', 'logo', 'logo-canvas', 350, 250, 1, .38, .21);

function showLogo(logoImg, containerID, logoCanvasID,
    width, height, wordScale,
    backgroundScaleX, backgroundScaleY) {

    $(logoImg).hide();
    gridchinLogo.initialize({
        framerate: 60,
        width: width,
        height: height,

        colorSpeedFactor: 0.4,
        morphSpeedFactor: 0.4,
        morphStrengthFactor: 0.8,
        morphBaseSpeedFactor: 0.2,
        introSpeedFactor: 2,
        outroSpeedFactor: 2,
        normalOffsetFactor: 1.5,

        maxShapeRotation: 0.2,

        wordOffsetX: -10,
        wordOffsetY: 0,
        wordScale: 1.3,

        foregroundScaleX: 0.38,
        foregroundScaleY: 0.21,
        backgroundScaleX: 0.39,
        backgroundScaleY: 0.23,

        shadowAlpha: 0.1,

        shapeQuality: 9,

        wordImageURL: "http://gridchin.com/assets/logo.svg",
        containerID: containerID,
        logoCanvasID: logoCanvasID,
        shadowCanvasID: "null",
        colors: [

            [new gridchinLogo.util.Color(243, 212, 86),
                new gridchinLogo.util.Color(239, 200, 65)
            ],

            [new gridchinLogo.util.Color(129, 233, 146),
                new gridchinLogo.util.Color(104, 226, 122)
            ],

            [new gridchinLogo.util.Color(67, 244, 183),
                new gridchinLogo.util.Color(49, 241, 164)
            ],

            [new gridchinLogo.util.Color(45, 188, 217),
                new gridchinLogo.util.Color(32, 170, 206)
            ],

            [new gridchinLogo.util.Color(110, 82, 153),
                new gridchinLogo.util.Color(86, 61, 129)
            ],

            [new gridchinLogo.util.Color(229, 106, 160),
                new gridchinLogo.util.Color(221, 82, 137)
            ],

            [new gridchinLogo.util.Color(253, 95, 97),
                new gridchinLogo.util.Color(252, 72, 74)
            ],

            [new gridchinLogo.util.Color(255, 145, 82),
                new gridchinLogo.util.Color(255, 120, 61)
            ]

        ],
        inputs: [gridchinLogo.input.move, gridchinLogo.input.press]
    });
}