// =====================================================
// UFO EXPLOSION VFX
// =====================================================

function createUFOExplosion(
    scene,
    position
) {
    createUFODebris(
        scene,
        position
    );

    // =================================================
    // MAIN FLASH
    // =================================================

    const flash =
        BABYLON.MeshBuilder.CreateSphere(
            "ufoExplosionFlash",
            {
                diameter: 1,
                segments: 16
            },
            scene
        );

    flash.position =
        position.clone();

    flash.isPickable =
        false;


    const flashMaterial =
        new BABYLON.StandardMaterial(
            "ufoExplosionFlashMaterial",
            scene
        );

    flashMaterial.diffuseColor =
        new BABYLON.Color3(
            1,
            0.25,
            0.02
        );

    flashMaterial.emissiveColor =
        new BABYLON.Color3(
            1,
            0.15,
            0
        );

    flashMaterial.alpha =
        0.9;

    flashMaterial.disableLighting =
        true;

    flash.material =
        flashMaterial;

    // =================================================
    // EXPANDING ENERGY RING
    // =================================================

    const ring =
        BABYLON.MeshBuilder.CreateTorus(
            "ufoExplosionRing",
            {
                diameter: 2,
                thickness: 0.12,
                tessellation: 48
            },
            scene
        );

    ring.position =
        position.clone();

    ring.rotation.x =
        Math.PI / 2;

    ring.isPickable =
        false;


    const ringMaterial =
        new BABYLON.StandardMaterial(
            "ufoExplosionRingMaterial",
            scene
        );

    ringMaterial.diffuseColor =
        new BABYLON.Color3(
            1,
            0.1,
            0.02
        );

    ringMaterial.emissiveColor =
        new BABYLON.Color3(
            1,
            0.05,
            0
        );

    ringMaterial.alpha =
        0.8;

    ringMaterial.disableLighting =
        true;

    ring.material =
        ringMaterial;

    // =================================================
    // PARTICLE SYSTEM
    // =================================================

    const particles =
        new BABYLON.ParticleSystem(
            "ufoExplosionParticles",
            80,
            scene
        );

    particles.particleTexture =
        new BABYLON.Texture(
            "https://playground.babylonjs.com/textures/flare.png",
            scene
        );

    particles.emitter =
        position.clone();

    particles.minEmitBox =
        new BABYLON.Vector3(
            -0.2,
            -0.2,
            -0.2
        );

    particles.maxEmitBox =
        new BABYLON.Vector3(
            0.2,
            0.2,
            0.2
        );

    particles.color1 =
        new BABYLON.Color4(
            1,
            0.3,
            0.02,
            1
        );

    particles.color2 =
        new BABYLON.Color4(
            1,
            0.8,
            0.1,
            1
        );

    particles.colorDead =
        new BABYLON.Color4(
            0.2,
            0.02,
            0,
            0
        );

    particles.minSize =
        0.15;
    particles.maxSize =
        0.5;
    particles.minLifeTime =
        0.15;
    particles.maxLifeTime =
        0.5;
    particles.emitRate =
        500;
    particles.blendMode =
        BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    particles.direction1 =
        new BABYLON.Vector3(
            -4,
            -4,
            -4
        );

    particles.direction2 =
        new BABYLON.Vector3(
            4,
            4,
            4
        );

    particles.minEmitPower =
        2;
    particles.maxEmitPower =
        6;
    particles.updateSpeed =
        0.015;
    particles.start();

    // =================================================
    // ANIMATION
    // =================================================

    let life =
        0;

    const observer =
        scene.onBeforeRenderObservable.add(
            function () {

                const delta =
                    scene.getEngine().getDeltaTime();

                life +=
                    delta;

                // Expand flash
                const flashScale =
                    1 +
                    life / 100;

                flash.scaling =
                    new BABYLON.Vector3(
                        flashScale,
                        flashScale,
                        flashScale
                    );

                flashMaterial.alpha =
                    Math.max(
                        0,
                        0.9 -
                        life / 250
                    );

                // Expand ring
                const ringScale =
                    1 +
                    life / 80;

                ring.scaling =
                    new BABYLON.Vector3(
                        ringScale,
                        ringScale,
                        ringScale
                    );

                ringMaterial.alpha =
                    Math.max(
                        0,
                        0.8 -
                        life / 300
                    );

                // Stop after short burst
                if (life >= 350) {

                    particles.stop();

                    scene.onBeforeRenderObservable.remove(
                        observer
                    );

                    flash.dispose();
                    ring.dispose();

                    flashMaterial.dispose();
                    ringMaterial.dispose();

                    setTimeout(
                        function () {

                            particles.dispose();

                        },
                        500
                    );
                }
            }
        );
}
// =====================================================
// UFO HIT IMPACT VFX
// =====================================================

function createUFOHitEffect(
    scene,
    position
) {

    // =================================================
    // IMPACT FLASH
    // =================================================

    const flash =
        BABYLON.MeshBuilder.CreateSphere(
            "ufoHitFlash",
            {
                diameter: 0.35,
                segments: 10
            },
            scene
        );

    flash.position =
        position.clone();

    flash.isPickable =
        false;


    const flashMaterial =
        new BABYLON.StandardMaterial(
            "ufoHitFlashMaterial",
            scene
        );

    flashMaterial.diffuseColor =
        new BABYLON.Color3(
            1,
            0.15,
            0.02
        );

    flashMaterial.emissiveColor =
        new BABYLON.Color3(
            1,
            0.05,
            0.01
        );

    flashMaterial.disableLighting =
        true;

    flashMaterial.alpha =
        1;
    flash.material =
        flashMaterial;

    // =================================================
    // SPARK PARTICLES
    // =================================================

    const sparks =
        new BABYLON.ParticleSystem(
            "ufoHitSparks",
            30,
            scene
        );

    sparks.particleTexture =
        new BABYLON.Texture(
            "https://playground.babylonjs.com/textures/flare.png",
            scene
        );

    sparks.emitter =
        position.clone();

    sparks.color1 =
        new BABYLON.Color4(
            1,
            0.2,
            0.02,
            1
        );

    sparks.color2 =
        new BABYLON.Color4(
            1,
            0.8,
            0.1,
            1
        );

    sparks.colorDead =
        new BABYLON.Color4(
            0.2,
            0.02,
            0,
            0
        );

    sparks.minSize =
        0.05;
    sparks.maxSize =
        0.16;
    sparks.minLifeTime =
        0.08;
    sparks.maxLifeTime =
        0.22;
    sparks.emitRate =
        300;
    sparks.direction1 =
        new BABYLON.Vector3(
            -2,
            -2,
            -2
        );

    sparks.direction2 =
        new BABYLON.Vector3(
            2,
            2,
            2
        );

    sparks.minEmitPower =
        1;
    sparks.maxEmitPower =
        3;
    sparks.blendMode =
        BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    sparks.updateSpeed =
        0.01;
    sparks.start();


    // =================================================
    // QUICK FLASH ANIMATION
    // =================================================

    let life = 0;

    const observer =
        scene.onBeforeRenderObservable.add(
            function () {

                life +=
                    scene
                        .getEngine()
                        .getDeltaTime();

                const scale =
                    1 +
                    life / 80;

                flash.scaling =
                    new BABYLON.Vector3(
                        scale,
                        scale,
                        scale
                    );

                flashMaterial.alpha =
                    Math.max(
                        0,
                        1 -
                        life / 120
                    );

                if (life >= 120) {

                    sparks.stop();

                    scene
                        .onBeforeRenderObservable
                        .remove(
                            observer
                        );

                    flash.dispose();
                    flashMaterial.dispose();

                    setTimeout(
                        function () {

                            sparks.dispose();

                        },
                        250
                    );
                }
            }
        );
}
// =====================================================
// UFO DEBRIS FRAGMENTS
// =====================================================

function createUFODebris(
    scene,
    position
) {

    const debrisMaterial =
        new BABYLON.StandardMaterial(
            "ufoDebrisMaterial",
            scene
        );

    debrisMaterial.diffuseColor =
        new BABYLON.Color3(
            0.18,
            0.18,
            0.22
        );

    debrisMaterial.emissiveColor =
        new BABYLON.Color3(
            0.08,
            0.02,
            0.02
        );

    const fragments = [];

    // Create several chunks
    for (let i = 0; i < 10; i++) {

        const fragment =
            BABYLON.MeshBuilder.CreateBox(
                "ufoDebris",
                {
                    size:
                        0.18 +
                        Math.random() * 0.25
                },
                scene
            );

        fragment.position =
            position.clone();

        fragment.material =
            debrisMaterial;

        fragment.isPickable =
            false;

        // Give each fragment a random shape
        fragment.scaling =
            new BABYLON.Vector3(
                0.5 + Math.random(),
                0.3 + Math.random(),
                0.5 + Math.random()
            );

        // Random outward movement direction
        const direction =
            new BABYLON.Vector3(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            );

        direction.normalize();

        // Random debris speed
        const speed =
            0.015 +
            Math.random() * 0.025;

        fragments.push({
            mesh: fragment,
            velocity:
                direction.scale(
                    speed
                ),

            rotationSpeed:
                new BABYLON.Vector3(
                    Math.random() * 0.08,
                    Math.random() * 0.08,
                    Math.random() * 0.08
                )
        });
    }

    // =================================================
    // ANIMATE DEBRIS
    // =================================================

    let life = 0;

    const observer =
        scene.onBeforeRenderObservable.add(
            function () {

                const deltaTime =
                    scene
                        .getEngine()
                        .getDeltaTime();

                life +=
                    deltaTime;

                fragments.forEach(
                    function (fragment) {

                        fragment.mesh.position.addInPlace(
                            fragment.velocity.scale(
                                deltaTime
                            )
                        );

                        fragment.mesh.rotation.addInPlace(
                            fragment.rotationSpeed
                        );
                    }
                );

                // Remove after about 1.5 seconds
                if (life >= 3000) {

                    scene
                        .onBeforeRenderObservable
                        .remove(
                            observer
                        );

                    fragments.forEach(
                        function (fragment) {

                            if (
                                !fragment.mesh.isDisposed()
                            ) {
                                fragment.mesh.dispose();
                            }
                        }
                    );
                    debrisMaterial.dispose();
                }
            }
        );
}
// =====================================================
// UFO CHARGE CORE VFX
// =====================================================


// =====================================================
// START CHARGE EFFECT
// =====================================================

function startUFOChargeEffect(
    enemyData
) {

    if (
        !enemyData ||
        !enemyData.chargeCore ||
        !enemyData.chargeMaterial
    ) {
        return;
    }

    const scene =
        enemyData.chargeCore.getScene();

    // Prevent duplicate charge effects
    if (
        enemyData.chargeVFX
    ) {
        return;
    }

    // =================================================
    // SPARK PARTICLES
    // =================================================

    const sparks =
        new BABYLON.ParticleSystem(
            "ufoChargeSparks",
            40,
            scene
        );

    sparks.particleTexture =
        new BABYLON.Texture(
            "https://playground.babylonjs.com/textures/flare.png",
            scene
        );

    // Attach particle emitter directly to the core
    sparks.emitter =
        enemyData.chargeCore;

    sparks.minEmitBox =
        new BABYLON.Vector3(
            -0.15,
            -0.15,
            -0.15
        );

    sparks.maxEmitBox =
        new BABYLON.Vector3(
            0.15,
            0.15,
            0.15
        );

    sparks.color1 =
        new BABYLON.Color4(
            1,
            0.2,
            0.02,
            1
        );

    sparks.color2 =
        new BABYLON.Color4(
            1,
            0.8,
            0.1,
            1
        );

    sparks.colorDead =
        new BABYLON.Color4(
            0.4,
            0,
            0,
            0
        );

    sparks.minSize =
        0.04;

    sparks.maxSize =
        0.12;

    sparks.minLifeTime =
        0.08;

    sparks.maxLifeTime =
        0.22;

    sparks.emitRate =
        0;

    sparks.direction1 =
        new BABYLON.Vector3(
            -1,
            -1,
            -1
        );

    sparks.direction2 =
        new BABYLON.Vector3(
            1,
            1,
            1
        );

    sparks.minEmitPower =
        0.5;

    sparks.maxEmitPower =
        1.5;

    sparks.blendMode =
        BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    sparks.updateSpeed =
        0.01;

    sparks.start();

    // =================================================
    // STORE VFX DATA
    // =================================================

    enemyData.chargeVFX = {

        sparks: sparks,

        originalScale:
            enemyData
                .chargeCore
                .scaling
                .clone(),

        sparksActive: false

    };
}

// =====================================================
// UPDATE CHARGE EFFECT
// chargePercent should be between 0 and 1
// =====================================================

function updateUFOChargeEffect(
    enemyData,
    chargePercent
) {

    if (
        !enemyData ||
        !enemyData.chargeCore ||
        !enemyData.chargeMaterial
    ) {
        return;
    }

    // Start automatically if needed
    if (
        !enemyData.chargeVFX
    ) {

        startUFOChargeEffect(
            enemyData
        );
    }

    const vfx =
        enemyData.chargeVFX;

    // Keep charge between 0 and 1
    chargePercent =
        Math.max(
            0,
            Math.min(
                1,
                chargePercent
            )
        );

    // =================================================
    // COLOR PROGRESSION
    // =================================================

    let chargeColor;

    // CYAN -> YELLOW
    if (
        chargePercent < 0.4
    ) {

        const amount =
            chargePercent / 0.4;

        chargeColor =
            BABYLON.Color3.Lerp(

                new BABYLON.Color3(
                    0,
                    0.8,
                    1
                ),

                new BABYLON.Color3(
                    1,
                    1,
                    0
                ),

                amount
            );
    }

    // YELLOW -> ORANGE
    else if (
        chargePercent < 0.7
    ) {

        const amount =
            (
                chargePercent -
                0.4
            ) / 0.3;

        chargeColor =
            BABYLON.Color3.Lerp(

                new BABYLON.Color3(
                    1,
                    1,
                    0
                ),

                new BABYLON.Color3(
                    1,
                    0.35,
                    0
                ),

                amount
            );
    }

    // ORANGE -> RED
    else {

        const amount =
            (
                chargePercent -
                0.7
            ) / 0.3;

        chargeColor =
            BABYLON.Color3.Lerp(

                new BABYLON.Color3(
                    1,
                    0.35,
                    0
                ),

                new BABYLON.Color3(
                    1,
                    0.02,
                    0.01
                ),

                amount
            );
    }

    // =================================================
    // INCREASE GLOW INTENSITY
    // =================================================

    const glowStrength =
        0.7 +
        chargePercent * 0.8;

    enemyData
        .chargeMaterial
        .emissiveColor =
        chargeColor.scale(
            glowStrength
        );

    enemyData
        .chargeMaterial
        .diffuseColor =
        chargeColor.scale(
            0.5
        );

    // =================================================
    // PULSING
    // =====================================================

    // Pulse gets faster as the charge increases
    const pulseSpeed =
        3 +
        chargePercent * 10;

    // Pulse gets slightly larger too
    const pulseAmount =
        0.04 +
        chargePercent * 0.12;

    const pulse =
        1 +
        Math.sin(
            performance.now() *
            0.001 *
            pulseSpeed
        ) *
        pulseAmount;

    const baseSize =
        1 +
        chargePercent * 0.12;

    const finalScale =
        baseSize *
        pulse;

    enemyData
        .chargeCore
        .scaling =
        vfx.originalScale.scale(
            finalScale
        );

    // =================================================
    // SPARKS DURING FINAL CHARGE
    // =====================================================

    if (
        chargePercent >= 0.75
    ) {

        vfx.sparks.emitRate =
            20 +
            chargePercent * 80;

        vfx.sparksActive =
            true;
    }

    else {

        vfx.sparks.emitRate =
            0;

        vfx.sparksActive =
            false;
    }
}

// =====================================================
// FINAL PRE-FIRE FLASH
// =====================================================

function createUFOChargeFireFlash(
    enemyData
) {

    if (
        !enemyData ||
        !enemyData.chargeCore
    ) {
        return;
    }

    const scene =
        enemyData.chargeCore.getScene();

    const position =
        enemyData
            .chargeCore
            .getAbsolutePosition()
            .clone();

    // =================================================
    // BRIGHT FLASH
    // =====================================================

    const flash =
        BABYLON.MeshBuilder.CreateSphere(
            "ufoChargeFireFlash",
            {
                diameter: 0.8,
                segments: 12
            },
            scene
        );

    flash.position =
        position;

    flash.isPickable =
        false;

    const flashMaterial =
        new BABYLON.StandardMaterial(
            "ufoChargeFireFlashMaterial",
            scene
        );

    flashMaterial.diffuseColor =
        new BABYLON.Color3(
            1,
            0.15,
            0.05
        );

    flashMaterial.emissiveColor =
        new BABYLON.Color3(
            1,
            0.05,
            0.02
        );

    flashMaterial.disableLighting =
        true;

    flashMaterial.alpha =
        1;

    flash.material =
        flashMaterial;

    // =================================================
    // QUICK EXPANSION
    // =====================================================

    let life = 0;

    const observer =
        scene.onBeforeRenderObservable.add(
            function () {

                life +=
                    scene
                        .getEngine()
                        .getDeltaTime();

                const scale =
                    1 +
                    life / 35;

                flash.scaling =
                    new BABYLON.Vector3(
                        scale,
                        scale,
                        scale
                    );

                flashMaterial.alpha =
                    Math.max(
                        0,
                        1 -
                        life / 120
                    );

                if (
                    life >= 120
                ) {

                    scene
                        .onBeforeRenderObservable
                        .remove(
                            observer
                        );

                    flash.dispose();

                    flashMaterial.dispose();
                }
            }
        );
}

// =====================================================
// STOP / RESET CHARGE EFFECT
// =====================================================

function stopUFOChargeEffect(
    enemyData
) {

    if (
        !enemyData ||
        !enemyData.chargeVFX
    ) {
        return;
    }

    const vfx =
        enemyData.chargeVFX;

    // Stop sparks
    if (
        vfx.sparks
    ) {

        vfx.sparks.stop();

        vfx.sparks.dispose();
    }

    // Reset core size
    if (
        enemyData.chargeCore
    ) {

        enemyData
            .chargeCore
            .scaling =
            vfx.originalScale.clone();
    }

    // Reset back to cyan
    if (
        enemyData.chargeMaterial
    ) {

        enemyData
            .chargeMaterial
            .diffuseColor =
            new BABYLON.Color3(
                0,
                0.5,
                0.7
            );

        enemyData
            .chargeMaterial
            .emissiveColor =
            new BABYLON.Color3(
                0,
                0.8,
                1
            );
    }
    enemyData.chargeVFX =
        null;
}
// =====================================================
// UFO SPAWN TELEPORT EFFECT
// =====================================================

function createUFOSpawnEffect(
    scene,
    position,
    enemyData
) {

    if (
        !scene ||
        !position ||
        !enemyData ||
        !enemyData.root
    ) {
        return;
    }


    // =================================================
    // HIDE UFO TEMPORARILY
    // =================================================

    const ufoMeshes =
        enemyData.root.getChildMeshes();


    ufoMeshes.forEach(
        function (mesh) {

            mesh.visibility =
                0;
        }
    );


    // =================================================
    // PORTAL ROOT
    // =================================================

    const portalRoot =
        new BABYLON.TransformNode(
            "ufoSpawnPortalRoot",
            scene
        );


    portalRoot.position =
        position.clone();


    // =================================================
    // PORTAL MATERIALS
    // =================================================

    const cyanMaterial =
        new BABYLON.StandardMaterial(
            "ufoSpawnCyanMaterial",
            scene
        );


    cyanMaterial.diffuseColor =
        new BABYLON.Color3(
            0.05,
            0.7,
            1
        );


    cyanMaterial.emissiveColor =
        new BABYLON.Color3(
            0.1,
            1,
            1
        );


    cyanMaterial.disableLighting =
        true;


    cyanMaterial.alpha =
        0.9;


    const purpleMaterial =
        new BABYLON.StandardMaterial(
            "ufoSpawnPurpleMaterial",
            scene
        );


    purpleMaterial.diffuseColor =
        new BABYLON.Color3(
            0.5,
            0.15,
            1
        );


    purpleMaterial.emissiveColor =
        new BABYLON.Color3(
            0.7,
            0.2,
            1
        );


    purpleMaterial.disableLighting =
        true;


    purpleMaterial.alpha =
        0.8;


    // =================================================
    // CREATE SPIRAL RINGS
    // =================================================

    const rings = [];


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const ring =
            BABYLON.MeshBuilder.CreateTorus(
                "ufoSpawnRing" + i,
                {
                    diameter:
                        5.5 +
                        i * 0.7,

                    thickness:
                        0.08 +
                        i * 0.015,

                    tessellation:
                        64
                },
                scene
            );


        ring.parent =
            portalRoot;


        ring.isPickable =
            false;


        ring.material =
            (
                i % 2 === 0
            )
                ? cyanMaterial
                : purpleMaterial;


        // Give every ring a slightly
        // different 3D orientation.

        ring.rotation.x =
            Math.PI / 2 +
            i * 0.18;


        ring.rotation.y =
            i * 0.35;


        ring.rotation.z =
            i * 0.45;


        rings.push(
            ring
        );
    }


    // =================================================
    // CENTRAL TELEPORT FLASH
    // =================================================

    const flash =
        BABYLON.MeshBuilder.CreateSphere(
            "ufoSpawnFlash",
            {
                diameter: 1,
                segments: 16
            },
            scene
        );


    flash.position =
        position.clone();


    flash.isPickable =
        false;


    const flashMaterial =
        new BABYLON.StandardMaterial(
            "ufoSpawnFlashMaterial",
            scene
        );


    flashMaterial.diffuseColor =
        new BABYLON.Color3(
            0.5,
            0.9,
            1
        );


    flashMaterial.emissiveColor =
        new BABYLON.Color3(
            0.7,
            1,
            1
        );


    flashMaterial.disableLighting =
        true;


    flashMaterial.alpha =
        0.85;


    flash.material =
        flashMaterial;


    flash.scaling =
        new BABYLON.Vector3(
            0.3,
            0.3,
            0.3
        );


    // =================================================
    // FALLING ENERGY PARTICLES
    // =================================================

    const particles =
        new BABYLON.ParticleSystem(
            "ufoSpawnParticles",
            120,
            scene
        );


    particles.particleTexture =
        new BABYLON.Texture(
            "https://playground.babylonjs.com/textures/flare.png",
            scene
        );


    // Start particles above the UFO.

    particles.emitter =
        new BABYLON.Vector3(
            position.x,
            position.y + 4,
            position.z
        );


    particles.minEmitBox =
        new BABYLON.Vector3(
            -2.5,
            0,
            -2.5
        );


    particles.maxEmitBox =
        new BABYLON.Vector3(
            2.5,
            0,
            2.5
        );


    particles.color1 =
        new BABYLON.Color4(
            0.1,
            0.8,
            1,
            1
        );


    particles.color2 =
        new BABYLON.Color4(
            0.7,
            0.2,
            1,
            1
        );


    particles.colorDead =
        new BABYLON.Color4(
            0,
            0.1,
            0.2,
            0
        );


    particles.minSize =
        0.08;


    particles.maxSize =
        0.22;


    particles.minLifeTime =
        0.25;


    particles.maxLifeTime =
        0.55;


    particles.emitRate =
        180;


    particles.direction1 =
        new BABYLON.Vector3(
            -0.4,
            -8,
            -0.4
        );


    particles.direction2 =
        new BABYLON.Vector3(
            0.4,
            -12,
            0.4
        );


    particles.minEmitPower =
        0.8;


    particles.maxEmitPower =
        1.4;


    particles.blendMode =
        BABYLON.ParticleSystem
            .BLENDMODE_ONEONE;


    particles.updateSpeed =
        0.012;


    particles.start();


    // =================================================
    // ANIMATION STATE
    // =================================================

    let life =
        0;


    let ufoRevealed =
        false;


    const EFFECT_DURATION =
        900;


    const UFO_REVEAL_TIME =
        420;


    // =================================================
    // ANIMATE TELEPORT
    // =================================================

    const observer =
        scene.onBeforeRenderObservable.add(
            function () {

                const deltaTime =
                    scene
                        .getEngine()
                        .getDeltaTime();


                life +=
                    deltaTime;


                const progress =
                    Math.min(
                        life /
                        EFFECT_DURATION,
                        1
                    );


                // =====================================
                // SPIN + SHRINK PORTAL
                // =====================================

                rings.forEach(
                    function (
                        ring,
                        index
                    ) {

                        const direction =
                            index % 2 === 0
                                ? 1
                                : -1;


                        ring.rotation.y +=
                            0.05 *
                            direction;


                        ring.rotation.z +=
                            0.08 *
                            direction;


                        const scale =
                            Math.max(
                                0.05,
                                1.4 -
                                progress *
                                1.35
                            );


                        ring.scaling =
                            new BABYLON.Vector3(
                                scale,
                                scale,
                                scale
                            );
                    }
                );


                // =====================================
                // FLASH GROWS TOWARD REVEAL
                // =====================================

                if (
                    life <
                    UFO_REVEAL_TIME
                ) {

                    const flashScale =
                        0.3 +
                        (
                            life /
                            UFO_REVEAL_TIME
                        ) *
                        2.2;


                    flash.scaling =
                        new BABYLON.Vector3(
                            flashScale,
                            flashScale,
                            flashScale
                        );
                }


                // =====================================
                // REVEAL UFO
                // =====================================

                if (
                    !ufoRevealed &&
                    life >=
                    UFO_REVEAL_TIME
                ) {

                    ufoRevealed =
                        true;


                    ufoMeshes.forEach(
                        function (mesh) {

                            mesh.visibility =
                                1;
                        }
                    );


                    // Bright snap at the
                    // materialization moment.

                    flash.scaling =
                        new BABYLON.Vector3(
                            2.5,
                            2.5,
                            2.5
                        );
                }


                // =====================================
                // FADE EVERYTHING AFTER REVEAL
                // =====================================

                if (
                    life >=
                    UFO_REVEAL_TIME
                ) {

                    const fadeProgress =
                        (
                            life -
                            UFO_REVEAL_TIME
                        ) /
                        (
                            EFFECT_DURATION -
                            UFO_REVEAL_TIME
                        );


                    const alpha =
                        Math.max(
                            0,
                            1 -
                            fadeProgress
                        );


                    cyanMaterial.alpha =
                        0.9 *
                        alpha;


                    purpleMaterial.alpha =
                        0.8 *
                        alpha;


                    flashMaterial.alpha =
                        0.85 *
                        alpha;


                    const collapseScale =
                        Math.max(
                            0.05,
                            2.5 -
                            fadeProgress *
                            2.45
                        );


                    flash.scaling =
                        new BABYLON.Vector3(
                            collapseScale,
                            collapseScale,
                            collapseScale
                        );
                }


                // =====================================
                // END EFFECT
                // =====================================

                if (
                    life >=
                    EFFECT_DURATION
                ) {

                    particles.stop();


                    scene
                        .onBeforeRenderObservable
                        .remove(
                            observer
                        );


                    rings.forEach(
                        function (ring) {

                            if (
                                !ring.isDisposed()
                            ) {

                                ring.dispose();
                            }
                        }
                    );


                    if (
                        !flash.isDisposed()
                    ) {

                        flash.dispose();
                    }


                    portalRoot.dispose();


                    cyanMaterial.dispose();

                    purpleMaterial.dispose();

                    flashMaterial.dispose();


                    setTimeout(
                        function () {

                            particles.dispose();

                        },
                        600
                    );
                }
            }
        );
}
// =====================================================
// CAMERA SHAKE
// =====================================================

function shakeCamera(
    scene,
    intensity = 0.08,
    duration = 250
) {

    const camera =
        scene.activeCamera;


    if (!camera) {
        return;
    }


    // =================================================
    // CREATE SHAKE RIG ON FIRST USE
    // =================================================

    if (!camera.shakeRig) {

        const shakeRig =
            new BABYLON.TransformNode(
                "cameraShakeRig",
                scene
            );


        shakeRig.position =
            BABYLON.Vector3.Zero();


        shakeRig.rotation =
            BABYLON.Vector3.Zero();


        camera.parent =
            shakeRig;


        camera.shakeRig =
            shakeRig;
    }


    const shakeRig =
        camera.shakeRig;


    // =================================================
    // STOP OLD SHAKE IF ONE IS STILL RUNNING
    // =================================================

    if (
        camera.shakeObserver
    ) {

        scene
            .onBeforeRenderObservable
            .remove(
                camera.shakeObserver
            );


        camera.shakeObserver =
            null;
    }


    // Reset rig before new shake.
    shakeRig.position.set(
        0,
        0,
        0
    );


    shakeRig.rotation.set(
        0,
        0,
        0
    );


    // =================================================
    // SHAKE STATE
    // =================================================

    let life =
        0;


    camera.shakeObserver =
        scene
            .onBeforeRenderObservable
            .add(
                function () {

                    const deltaTime =
                        scene
                            .getEngine()
                            .getDeltaTime();


                    life +=
                        deltaTime;


                    const progress =
                        Math.min(
                            life /
                            duration,
                            1
                        );


                    // Strong at the beginning,
                    // gradually fades to zero.
                    const strength =
                        intensity *
                        (1 - progress);


                    // =================================
                    // POSITION SHAKE
                    // =================================

                    shakeRig.position.x =
                        (
                            Math.random() *
                            2 -
                            1
                        ) *
                        strength;


                    shakeRig.position.y =
                        (
                            Math.random() *
                            2 -
                            1
                        ) *
                        strength;


                    // =================================
                    // ROTATION SHAKE
                    // =================================

                    shakeRig.rotation.x =
                        (
                            Math.random() *
                            2 -
                            1
                        ) *
                        strength *
                        0.4;


                    shakeRig.rotation.y =
                        (
                            Math.random() *
                            2 -
                            1
                        ) *
                        strength *
                        0.4;


                    shakeRig.rotation.z =
                        (
                            Math.random() *
                            2 -
                            1
                        ) *
                        strength *
                        0.15;


                    // =================================
                    // END SHAKE
                    // =================================

                    if (
                        life >=
                        duration
                    ) {

                        shakeRig.position.set(
                            0,
                            0,
                            0
                        );


                        shakeRig.rotation.set(
                            0,
                            0,
                            0
                        );


                        scene
                            .onBeforeRenderObservable
                            .remove(
                                camera.shakeObserver
                            );


                        camera.shakeObserver =
                            null;
                    }
                }
            );
}