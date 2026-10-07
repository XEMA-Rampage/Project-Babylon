// =====================================================
// SPACE BACKGROUND
// =====================================================

function createSpaceBackground(scene, camera) {

    const starMaterial =
        new BABYLON.StandardMaterial(
            "starMaterial",
            scene
        );

    starMaterial.diffuseColor =
        new BABYLON.Color3(
            1,
            1,
            1
        );

    starMaterial.emissiveColor =
        new BABYLON.Color3(
            1,
            1,
            1
        );

    starMaterial.disableLighting =
        true;

    camera.maxZ =
        1000;


    // =================================================
    // CREATE DISTANT STARS
    // =================================================

    const twinkleStars = [];
    for (let i = 0; i < 200; i++) {

        const star =
            BABYLON.MeshBuilder.CreateSphere(
                "star" + i,
                {
                    diameter: 0.6,
                    segments: 6
                },
                scene
            );

        const theta =
            Math.random() *
            Math.PI *
            2;

        const phi =
            Math.acos(
                2 * Math.random() - 1
            );

        const distance =
            100 +
            Math.random() * 150;

        star.position =
            new BABYLON.Vector3(

                distance *
                Math.sin(phi) *
                Math.cos(theta),

                distance *
                Math.cos(phi),

                distance *
                Math.sin(phi) *
                Math.sin(theta)

            );

        star.material =
            starMaterial;

        star.isPickable =
            false;
    if (
    Math.random() < 0.28
    ) {

    twinkleStars.push(
        {
            mesh: star,

            speed:
                0.001 +
                Math.random() *
                0.0025,

            phase:
                Math.random() *
                Math.PI *
                2
        }
    );
        }    
    }
    scene.onBeforeRenderObservable.add(
    function () {

        const time =
            performance.now();

        twinkleStars.forEach(
            function (starData) {

                const pulse =
                    0.55 +
                    Math.sin(
                        time *
                        starData.speed +
                        starData.phase
                    ) *
                    0.45;

                starData.mesh.scaling.set(
                    pulse,
                    pulse,
                    pulse
                );
            }
        );
    }
);
        createSpaceDust(
        scene
        );
}
// =====================================================
// DRIFTING SPACE DUST
// =====================================================

function createSpaceDust(scene) {

    const dust =
        new BABYLON.ParticleSystem(
            "spaceDust",
            400,
            scene
        );


    // =================================================
    // PARTICLE TEXTURE
    // =================================================

    dust.particleTexture =
        new BABYLON.Texture(
            "https://playground.babylonjs.com/textures/flare.png",
            scene
        );


    // =================================================
    // DUST AREA
    // =================================================

    dust.emitter =
        BABYLON.Vector3.Zero();


    dust.minEmitBox =
        new BABYLON.Vector3(
            -45,
            -30,
            -45
        );


    dust.maxEmitBox =
        new BABYLON.Vector3(
            45,
            30,
            45
        );


    // =================================================
    // APPEARANCE
    // =================================================

    dust.color1 =
        new BABYLON.Color4(
            0.55,
            0.7,
            0.9,
            0.20
        );


    dust.color2 =
        new BABYLON.Color4(
            0.75,
            0.8,
            1,
            0.12
        );


    dust.colorDead =
        new BABYLON.Color4(
            0.3,
            0.4,
            0.6,
            0
        );


    dust.minSize =
        0.04;


    dust.maxSize =
        0.13;


    // =================================================
    // LIFETIME
    // =================================================

    dust.minLifeTime =
        8;


    dust.maxLifeTime =
        14;


    // =================================================
    // SLOW DRIFT
    // =================================================
dust.direction1 =
    new BABYLON.Vector3(
        -0.6,
        -0.15,
        -0.8
    );

dust.direction2 =
    new BABYLON.Vector3(
        0.6,
        0.15,
        -1.4
    );

dust.minEmitPower =
    0.4;

dust.maxEmitPower =
    1.0;
    // =================================================
    // PARTICLE SETTINGS
    // =================================================

    dust.emitRate =
        70;


    dust.blendMode =
        BABYLON.ParticleSystem
            .BLENDMODE_ONEONE;


    dust.updateSpeed =
        0.008;


    dust.start();


    return dust;
}

// =====================================================
// CREATE GIANT MOTHERSHIP
// =====================================================

function createMothership(scene) {

    // =================================================
    // MOTHERSHIP ROOT
    // =================================================

    const root =
        new BABYLON.TransformNode(
            "mothershipRoot",
            scene
        );

    root.position =
        new BABYLON.Vector3(
            0,
            20,
            0
        );

    // =================================================
    // MAIN DARK HULL MATERIAL
    // =================================================

    const darkHullMaterial =
        new BABYLON.StandardMaterial(
            "mothershipDarkHullMaterial",
            scene
        );

    darkHullMaterial.diffuseColor =
        new BABYLON.Color3(
            0.10,
            0.10,
            0.12
        );

    darkHullMaterial.emissiveColor =
        new BABYLON.Color3(
            0.025,
            0.025,
            0.03
        );

    darkHullMaterial.specularColor =
        new BABYLON.Color3(
            0.15,
            0.15,
            0.18
        );

    // =================================================
    // MEDIUM GRAY HULL MATERIAL
    // =================================================

    const mediumHullMaterial =
        new BABYLON.StandardMaterial(
            "mothershipMediumHullMaterial",
            scene
        );

    mediumHullMaterial.diffuseColor =
        new BABYLON.Color3(
            0.18,
            0.18,
            0.21
        );

    mediumHullMaterial.emissiveColor =
        new BABYLON.Color3(
            0.03,
            0.03,
            0.035
        );

    mediumHullMaterial.specularColor =
        new BABYLON.Color3(
            0.18,
            0.18,
            0.20
        );


    // =================================================
    // BLACK PANEL LINE MATERIAL
    // =================================================

    const panelLineMaterial =
        new BABYLON.StandardMaterial(
            "mothershipPanelLineMaterial",
            scene
        );

    panelLineMaterial.diffuseColor =
        new BABYLON.Color3(
            0.01,
            0.01,
            0.015
        );

    panelLineMaterial.emissiveColor =
        new BABYLON.Color3(
            0.003,
            0.003,
            0.003
        );


    // =================================================
    // MAIN DARK SAUCER BODY
    // =================================================

    const body =
        BABYLON.MeshBuilder.CreateSphere(
            "mothershipBody",
            {
                diameter: 10,
                segments: 32
            },
            scene
        );

    body.parent =
        root;

    body.scaling =
        new BABYLON.Vector3(
            2.8,
            0.32,
            2.8
        );

    body.material =
        darkHullMaterial;

    body.isPickable =
        false;


    // =================================================
    // LIGHTER UPPER HULL
    // =================================================

    const upperHull =
        BABYLON.MeshBuilder.CreateSphere(
            "mothershipUpperHull",
            {
                diameter: 8,
                segments: 32
            },
            scene
        );

    upperHull.parent =
        root;

    upperHull.position =
        new BABYLON.Vector3(
            0,
            0.55,
            0
        );

    upperHull.scaling =
        new BABYLON.Vector3(
            2.2,
            0.24,
            2.2
        );

    upperHull.material =
        mediumHullMaterial;

    upperHull.isPickable =
        false;


    // =================================================
    // TOP DOME
    // =================================================

    const dome =
        BABYLON.MeshBuilder.CreateSphere(
            "mothershipDome",
            {
                diameter: 4.5,
                segments: 24
            },
            scene
        );

    dome.parent =
        root;

    dome.position =
        new BABYLON.Vector3(
            0,
            1.55,
            0
        );

    dome.scaling =
        new BABYLON.Vector3(
            1,
            0.45,
            1
        );

    dome.isPickable =
        false;


    const domeMaterial =
        new BABYLON.StandardMaterial(
            "mothershipDomeMaterial",
            scene
        );

    domeMaterial.diffuseColor =
        new BABYLON.Color3(
            0.14,
            0.14,
            0.17
        );

    domeMaterial.emissiveColor =
        new BABYLON.Color3(
            0.025,
            0.015,
            0.02
        );

    domeMaterial.alpha =
        0.95;

    dome.material =
        domeMaterial;


    // =================================================
    // UNDERSIDE SEAM RINGS
    // =================================================

    const seamRing1 =
        BABYLON.MeshBuilder.CreateTorus(
            "mothershipSeamRing1",
            {
                diameter: 10,
                thickness: 0.10,
                tessellation: 64
            },
            scene
        );

    seamRing1.parent =
        root;

    seamRing1.position.y =
        -1.05;

    seamRing1.material =
        panelLineMaterial;

    seamRing1.isPickable =
        false;


    const seamRing2 =
        BABYLON.MeshBuilder.CreateTorus(
            "mothershipSeamRing2",
            {
                diameter: 16,
                thickness: 0.10,
                tessellation: 64
            },
            scene
        );

    seamRing2.parent =
        root;

    seamRing2.position.y =
        -1.02;

    seamRing2.material =
        panelLineMaterial;

    seamRing2.isPickable =
        false;


    const seamRing3 =
        BABYLON.MeshBuilder.CreateTorus(
            "mothershipSeamRing3",
            {
                diameter: 22,
                thickness: 0.10,
                tessellation: 64
            },
            scene
        );

    seamRing3.parent =
        root;

    seamRing3.position.y =
        -0.95;

    seamRing3.material =
        panelLineMaterial;

    seamRing3.isPickable =
        false;


    // =================================================
    // UNDERSIDE RADIAL BLACK PANEL LINES
    // =================================================

    for (let i = 0; i < 16; i++) {

        const angle =
            (Math.PI * 2 / 16) * i;

        const panelLine =
            BABYLON.MeshBuilder.CreateBox(
                "mothershipPanelLine" + i,
                {
                    width: 0.12,
                    height: 0.08,
                    depth: 10
                },
                scene
            );

        panelLine.parent =
            root;

        panelLine.position =
            new BABYLON.Vector3(
                Math.sin(angle) * 5,
                -1.10,
                Math.cos(angle) * 5
            );

        panelLine.rotation.y =
            angle;

        panelLine.material =
            panelLineMaterial;

        panelLine.isPickable =
            false;
    }

    // =================================================
    // UNDERSIDE METAL PANEL DECORATIONS
    // =================================================

    const panelData = [

        {
            x: -5.5,
            z: -2.0,
            width: 3.2,
            depth: 1.5,
            rotation: 0.25
        },

        {
            x: 5.2,
            z: 2.0,
            width: 3.0,
            depth: 1.6,
            rotation: -0.35
        },

        {
            x: -2.0,
            z: 5.2,
            width: 2.8,
            depth: 1.5,
            rotation: 0.60
        },

        {
            x: 2.5,
            z: -5.0,
            width: 3.1,
            depth: 1.5,
            rotation: -0.55
        },

        {
            x: 7.0,
            z: -2.0,
            width: 2.5,
            depth: 1.3,
            rotation: 0.35
        },

        {
            x: -7.0,
            z: 2.2,
            width: 2.6,
            depth: 1.4,
            rotation: -0.40
        }
    ];

    panelData.forEach(
        function (data, index) {

            const plate =
                BABYLON.MeshBuilder.CreateBox(
                    "mothershipMetalPlate" + index,
                    {
                        width: data.width,
                        height: 0.10,
                        depth: data.depth
                    },
                    scene
                );

            plate.parent =
                root;

            plate.position =
                new BABYLON.Vector3(
                    data.x,
                    -1.08,
                    data.z
                );

            plate.rotation.y =
                data.rotation;

            plate.material =
                mediumHullMaterial;

            plate.isPickable =
                false;
        }
    );

    // =================================================
    // RED UNDERSIDE RING
    // =================================================

    const undersideRing =
        BABYLON.MeshBuilder.CreateTorus(
            "mothershipUndersideRing",
            {
                diameter: 9,
                thickness: 0.28,
                tessellation: 48
            },
            scene
        );

    undersideRing.parent =
        root;

    undersideRing.position =
        new BABYLON.Vector3(
            0,
            -1.18,
            0
        );

    undersideRing.isPickable =
        false;

    const ringMaterial =
        new BABYLON.StandardMaterial(
            "mothershipRingMaterial",
            scene
        );

    ringMaterial.diffuseColor =
        new BABYLON.Color3(
            0.25,
            0.01,
            0.01
        );

    ringMaterial.emissiveColor =
        new BABYLON.Color3(
            0.5,
            0.015,
            0.015
        );

    ringMaterial.disableLighting =
        true;

    undersideRing.material =
        ringMaterial;

    // =================================================
    // YELLOW HULL LIGHT MATERIAL
    // =================================================

    const hullLightMaterial =
        new BABYLON.StandardMaterial(
            "mothershipHullLightMaterial",
            scene
        );

    hullLightMaterial.diffuseColor =
        new BABYLON.Color3(
            1,
            0.75,
            0.08
        );

    hullLightMaterial.emissiveColor =
        new BABYLON.Color3(
            1,
            0.65,
            0.04
        );

    hullLightMaterial.disableLighting =
        true;

    // =================================================
    // RANDOM TWINKLING YELLOW UNDERSIDE LIGHTS
    // =================================================

    const hullLights = [];

    for (let i = 0; i < 28; i++) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const radius =
            3.5 +
            Math.random() *
            8;

        const light =
            BABYLON.MeshBuilder.CreateSphere(
                "mothershipHullLight" + i,
                {
                    diameter:
                        0.18 +
                        Math.random() *
                        0.14,

                    segments: 8
                },
                scene
            );

        light.parent =
            root;

        light.position =
            new BABYLON.Vector3(

                Math.cos(angle) *
                radius,

                -1.18,

                Math.sin(angle) *
                radius

            );

        light.material =
            hullLightMaterial;

        light.isPickable =
            false;

        light.isVisible =
            Math.random() < 0.7;

        hullLights.push(
            {
                mesh: light,

                timer:
                    200 +
                    Math.random() *
                    1400
            }
        );
    }

    // =================================================
    // ABDUCTION BEAM MATERIAL
    // =================================================

    const beamMaterial =
        new BABYLON.StandardMaterial(
            "mothershipBeamMaterial",
            scene
        );

    beamMaterial.diffuseColor =
        new BABYLON.Color3(
            0.5,
            0.01,
            0.01
        );

    beamMaterial.emissiveColor =
        new BABYLON.Color3(
            0.55,
            0.01,
            0.01
        );

    beamMaterial.alpha =
        0.18;

    beamMaterial.backFaceCulling =
        false;

    beamMaterial.disableLighting =
        true;

    // =================================================
    // CREATE ONE ABDUCTION BEAM
    // =================================================

    function createAbductionBeam(
        name,
        x,
        z,
        height,
        width
    ) {

        const beam =
            BABYLON.MeshBuilder.CreateCylinder(
                name,
                {
                    height: height,

                    diameterTop:
                        0.4,

                    diameterBottom:
                        width,

                    tessellation:
                        32
                },
                scene
            );

        beam.parent =
            root;

        beam.position =
            new BABYLON.Vector3(
                x,
                -(height / 2) - 1.2,
                z
            );

        beam.material =
            beamMaterial;

        beam.isPickable =
            false;
        if (
            scene.glowLayer
        ) {
            scene.glowLayer.addExcludedMesh(
                beam
                );
            }

        beam.isVisible =
            Math.random() < 0.5;

        return {

            mesh:
                beam,

            timer:
                700 +
                Math.random() *
                1800
        };
    }

    // =================================================
    // CREATE MULTIPLE RANDOM BEAMS
    // =================================================

    const spotlights = [

        createAbductionBeam(
            "abductionBeam1",
            -3,
            -1.5,
            18,
            5
        ),

        createAbductionBeam(
            "abductionBeam2",
            3,
            -1,
            16,
            4.5
        ),

        createAbductionBeam(
            "abductionBeam3",
            0,
            3,
            20,
            6
        ),

        createAbductionBeam(
            "abductionBeam4",
            -4,
            2.5,
            17,
            4
        )
    ];

    // =================================================
    // RETURN MOTHERSHIP DATA
    // =================================================

    return {

        root:
            root,

        body:
            body,

        upperHull:
            upperHull,

        dome:
            dome,

        ring:
            undersideRing,

        hullLights:
            hullLights,

        spotlights:
            spotlights,

        baseHeight:
            20,

        hoverOffset:
            Math.random() *
            Math.PI *
            2
    };
}

// =====================================================
// UPDATE MOTHERSHIP
// =====================================================

function updateMothership(
    mothership,
    deltaTime
) {

    if (!mothership) {
        return;
    }

    const time =
        performance.now();

    // =================================================
    // SLOW OMINOUS ROTATION
    // =================================================

    mothership.root.rotation.y +=
        0.00015 *
        deltaTime;

    // =================================================
    // VERY SLOW FLOATING MOVEMENT
    // =================================================

    mothership.root.position.y =
        mothership.baseHeight +
        Math.sin(
            time *
            0.00035 +
            mothership.hoverOffset
        ) *
        0.5;

    // =================================================
    // RANDOM YELLOW LIGHT TWINKLING
    // =================================================

    mothership.hullLights.forEach(
        function (light) {

            light.timer -=
                deltaTime;

            if (light.timer <= 0) {

                light.mesh.isVisible =
                    !light.mesh.isVisible;

                light.timer =
                    200 +
                    Math.random() *
                    1400;
            }
        }
    );

    // =================================================
    // RANDOM RED ABDUCTION BEAMS
    // =================================================

    mothership.spotlights.forEach(
        function (spotlight) {

            spotlight.timer -=
                deltaTime;

            if (spotlight.timer <= 0) {

                spotlight.mesh.isVisible =
                    !spotlight.mesh.isVisible;

                spotlight.timer =
                    600 +
                    Math.random() *
                    2200;
            }
        }
    );
}