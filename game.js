// =====================================================
// GAME CANVAS
// =====================================================

const canvas =
    document.getElementById(
        "gameCanvas"
    );


// =====================================================
// BABYLON ENGINE
// =====================================================

const engine =
    new BABYLON.Engine(
        canvas,
        true
    );


// =====================================================
// CREATE SCENE
// =====================================================

function createScene() {

    const scene =
        new BABYLON.Scene(
            engine
        );
// =====================================================
// GLOW LAYER
// =====================================================

const glowLayer =
    new BABYLON.GlowLayer(
        "gameGlow",
        scene
    );

glowLayer.intensity =
    0.42;

// Store reference so other files can access it.
scene.glowLayer =
    glowLayer;

    scene.clearColor =
        new BABYLON.Color3(
            0.01,
            0.01,
            0.03
        );

    // =================================================
    // LIGHT
    // =================================================

    const light =
        new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(
                0,
                1,
                0
            ),
            scene
        );

    light.intensity =
        1;


    // =================================================
    // PLAYER
    // =================================================

    const camera =
        createPlayer(
            scene,
            canvas
        );
// =====================================================
// BLOOM
// =====================================================

const pipeline =
    new BABYLON.DefaultRenderingPipeline(
        "defaultPipeline",
        true,
        scene,
        [camera]
    );

pipeline.bloomEnabled =
    true;

pipeline.bloomThreshold =
    1.35;

pipeline.bloomWeight =
    0.02;

pipeline.bloomKernel =
    24;

pipeline.bloomScale =
    1;

    // =================================================
    // HUD
    // =================================================

    const hud =
        createHUD(
            scene
        );


    // =================================================
    // ASTEROIDS
    // =================================================

    const asteroids =
        createAsteroidSystem(
            scene
        );


    // =================================================
    // SPACE BACKGROUND
    // =================================================

    createSpaceBackground(
        scene,
        camera
    );


    // =================================================
    // UFO SYSTEM
    // =================================================

    const ufos =
        createUFOSystem(
            scene
        );


    // =================================================
    // GIANT MOTHERSHIP
    // =================================================

    const mothership =
        createMothership(
            scene
        );


    // =================================================
    // ENEMY MANAGER
    // =================================================

    const enemyManager =
        createEnemyManager(
            scene,
            ufos
        );


    // =================================================
    // PLAYER SHOOTING
    // =================================================

    // Each cannon keeps track of its own cooldown.
    const cannonCooldowns = {
        left: 0,
        right: 0
    };


    // 500 milliseconds = 0.5 seconds
    const CANNON_COOLDOWN_TIME =
        500;


    scene.onPointerDown =
        function (event) {

            // =========================================
            // DO NOT SHOOT BEFORE START OR AFTER END
            // =========================================

            if (
                scene.hud &&
                (
                    !scene.hud.gameStarted ||
                    scene.hud.gameOver
                )
            ) {
                return;
            }


            // =========================================
            // CHOOSE WEAPON SIDE
            // =========================================

            let weaponSide;


            // Left mouse button
            if (
                event.button === 0
            ) {

                weaponSide =
                    "left";
            }


            // Right mouse button
            else if (
                event.button === 2
            ) {

                weaponSide =
                    "right";
            }


            // Ignore other mouse buttons
            else {

                return;
            }


            // =========================================
            // POINTER LOCK CHECK
            // =========================================

            if (
                document.pointerLockElement !==
                canvas
            ) {
                return;
            }


            // =========================================
            // CANNON COOLDOWN CHECK
            // =========================================

            const currentTime =
                performance.now();


            if (
                currentTime <
                cannonCooldowns[
                    weaponSide
                ]
            ) {

                return;
            }


            // =========================================
            // ENERGY CHECK
            // =========================================

            if (
                !scene.hud.tryUseEnergy(
                    13
                )
            ) {

                scene.hud.showEnergyWarning();

                playEnergyDepletedSound();


                console.log(
                    "NOT ENOUGH ENERGY"
                );

                return;
            }


            // =========================================
            // START THIS CANNON'S COOLDOWN
            // =========================================

            cannonCooldowns[
                weaponSide
            ] =
                currentTime +
                CANNON_COOLDOWN_TIME;


            // =========================================
            // FIRE RAY FROM CROSSHAIR
            // =========================================

            const ray =
                camera.getForwardRay(
                    100
                );


            const hit =
                scene.pickWithRay(
                    ray
                );


            // =========================================
            // DETERMINE LASER TARGET
            // =========================================

            let targetPoint;


            if (
                hit.hit &&
                hit.pickedPoint
            ) {

                targetPoint =
                    hit
                        .pickedPoint
                        .clone();
            }

            else {

                targetPoint =
                    ray.origin.add(
                        ray.direction.scale(
                            100
                        )
                    );
            }

            // =========================================
            // PLAYER LASER VISUAL
            // =========================================

            firePlayerWeapon(
                scene,
                camera,
                targetPoint,
                weaponSide
            );

            playPlayerLaserSound();

            recoilPlayerCannon(
                scene,
                camera,
                weaponSide
            );

            // =========================================
            // UFO HIT / DAMAGE
            // =========================================

            if (
                hit.hit &&
                hit.pickedMesh &&
                hit.pickedMesh.metadata &&
                hit.pickedMesh.metadata.enemy
            ) {

                createUFOHitEffect(
                    scene,
                    hit.pickedPoint
                );

                setTimeout(
                    function () {

                        playUFOHitSound();

                    },
                    40
                );

                damageUFO(
                    hit.pickedMesh.metadata,
                    1
                );
            }
        };

    // =================================================
    // CLEANUP WHEN THIS ROUND IS DISPOSED
    // =================================================

    scene.onDisposeObservable.add(
        function () {

            // Stop any UFO charge sounds that may still
            // be playing when the round is restarted.

            if (
                Array.isArray(
                    ufos
                )
            ) {

                for (
                    let i = 0;
                    i < ufos.length;
                    i++
                ) {

                    const enemy =
                        ufos[i];


                    if (
                        enemy &&
                        enemy.chargeSound
                    ) {

                        enemy.chargeSound.stop();

                        enemy.chargeSound =
                            null;
                    }
                }
            }
        }
    );

    // =================================================
    // UPDATE LOOP
    // =================================================

    scene.onBeforeRenderObservable.add(
        function () {

            const deltaTime =
                engine.getDeltaTime();

            // =========================================
            // ASTEROIDS
            // =========================================

            updateAsteroids(
                asteroids
            );

            // =========================================
            // UFO MOVEMENT
            // =========================================

            updateUFOs(
                ufos
            );

            // =========================================
            // GIANT MOTHERSHIP
            // =========================================

            updateMothership(
                mothership,
                deltaTime
            );

            // =========================================
            // ENEMY AI
            // =========================================

            updateEnemyAI(
                ufos,
                deltaTime
            );

            // =========================================
            // UFO SPAWNING
            // =========================================

            enemyManager.update(
                deltaTime
            );
        }
    );

    return scene;
}

// =====================================================
// CURRENT GAME SCENE
// =====================================================

// IMPORTANT:
// This is now "let" instead of "const"
// because we are going to replace the scene
// whenever the player restarts.

let scene =
    createScene();

// =====================================================
// RESTART GAME WITHOUT RELOADING PAGE
// =====================================================

function restartGame() {

    console.log(
        "RESTARTING GAME"
    );

    // =================================================
    // DISPOSE OLD GAME ROUND
    // =================================================

    if (
        scene
    ) {

        scene.dispose();
    }

    // =================================================
    // CREATE BRAND NEW GAME ROUND
    // =================================================

    scene =
        createScene();


    console.log(
        "GAME RESET COMPLETE"
    );
}

// =====================================================
// RENDER LOOP
// =====================================================

engine.runRenderLoop(
    function () {

        if (
            scene
        ) {

            scene.render();
        }
    }
);

// =====================================================
// WINDOW RESIZE
// =====================================================

window.addEventListener(
    "resize",
    function () {

        engine.resize();
    }
);