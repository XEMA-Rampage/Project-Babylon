// =====================================================
// PLAYER WEAPON FIRING
// =====================================================

function firePlayerWeapon(
    scene,
    camera,
    targetPoint,
    side
) {

    if (!camera.playerWeapons) {
        return;
    }

    const weapons =
        camera.playerWeapons;

    let muzzle;

    // =================================================
    // CHOOSE WHICH CANNON FIRES
    // =================================================

    if (side === "left") {

        muzzle =
            weapons.leftMuzzle;

    } else if (side === "right") {

        muzzle =
            weapons.rightMuzzle;

    } else {

        return;

    }

    // =================================================
    // GET MUZZLE WORLD POSITION
    // =================================================

    muzzle.computeWorldMatrix(
        true
    );

    const startPoint =
        muzzle
            .getAbsolutePosition()
            .clone();

    // =================================================
    // LASER MATERIAL
    // =================================================

    const laserMaterial =
        new BABYLON.StandardMaterial(
            "playerLaserMaterial",
            scene
        );

    laserMaterial.diffuseColor =
        new BABYLON.Color3(
            0.45,
            0.01,
            0.01
        );

    laserMaterial.emissiveColor =
        new BABYLON.Color3(
            1.0,
            0.03,
            0.03
        );

    laserMaterial.disableLighting =
        true;

    // =================================================
    // CREATE LASER
    // =================================================

    const laser =
        BABYLON.MeshBuilder.CreateTube(
            "playerLaser",
            {
                path: [
                    startPoint,
                    targetPoint
                ],

                radius: 0.06,

                tessellation: 8,

                cap:
                    BABYLON.Mesh.CAP_ALL
            },
            scene
        );

    laser.material =
        laserMaterial;

    laser.isPickable =
        false;

    // =================================================
    // MUZZLE FLASH
    // =================================================

    createPlayerMuzzleFlash(
        scene,
        startPoint
    );

    // =================================================
    // REMOVE LASER
    // =================================================

    setTimeout(
        function () {

            if (
                !laser.isDisposed()
            ) {
                laser.dispose();
            }

            laserMaterial.dispose();

        },
        150
    );
}


// =====================================================
// IMPROVED PLAYER MUZZLE FLASH
// =====================================================

function createPlayerMuzzleFlash(
    scene,
    position
) {

    // =================================================
    // CENTRAL FLASH
    // =================================================

    const flash =
        BABYLON.MeshBuilder.CreateSphere(
            "playerMuzzleFlash",
            {
                diameter: 0.28,
                segments: 12
            },
            scene
        );

    flash.position =
        position.clone();

    flash.isPickable =
        false;


    const flashMaterial =
        new BABYLON.StandardMaterial(
            "playerMuzzleFlashMaterial",
            scene
        );

    flashMaterial.diffuseColor =
        new BABYLON.Color3(
            0.5,
            0.01,
            0.01
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
    // OUTER GLOW
    // =================================================

    const glow =
        BABYLON.MeshBuilder.CreateSphere(
            "playerMuzzleGlow",
            {
                diameter: 0.5,
                segments: 12
            },
            scene
        );

    glow.position =
        position.clone();

    glow.isPickable =
        false;


    const glowMaterial =
        new BABYLON.StandardMaterial(
            "playerMuzzleGlowMaterial",
            scene
        );

    glowMaterial.diffuseColor =
        new BABYLON.Color3(
            0.2,
            0,
            0
        );

    glowMaterial.emissiveColor =
        new BABYLON.Color3(
            0.8,
            0.02,
            0.01
        );

    glowMaterial.alpha =
        0.45;

    glowMaterial.disableLighting =
        true;

    glow.material =
        glowMaterial;

    // =================================================
    // SHORT FORWARD BURST
    // =================================================

    const burst =
        BABYLON.MeshBuilder.CreateCylinder(
            "playerMuzzleBurst",
            {
                height: 0.55,
                diameterTop: 0.04,
                diameterBottom: 0.22,
                tessellation: 12
            },
            scene
        );

    burst.position =
        position.clone();

    burst.rotation.x =
        Math.PI / 2;

    burst.isPickable =
        false;


    const burstMaterial =
        new BABYLON.StandardMaterial(
            "playerMuzzleBurstMaterial",
            scene
        );

    burstMaterial.diffuseColor =
        new BABYLON.Color3(
            0.6,
            0.01,
            0.01
        );

    burstMaterial.emissiveColor =
        new BABYLON.Color3(
            1,
            0.08,
            0.02
        );

    burstMaterial.alpha =
        0.9;

    burstMaterial.disableLighting =
        true;

    burst.material =
        burstMaterial;

    // =================================================
    // ANIMATE MUZZLE FLASH
    // =================================================

    let life = 0;

    const observer =
        scene.onBeforeRenderObservable.add(
            function () {

                life +=
                    scene
                        .getEngine()
                        .getDeltaTime();

                // Expand central flash
                const flashScale =
                    1 +
                    life / 45;

                flash.scaling =
                    new BABYLON.Vector3(
                        flashScale,
                        flashScale,
                        flashScale
                    );

                // Expand outer glow
                const glowScale =
                    1 +
                    life / 30;

                glow.scaling =
                    new BABYLON.Vector3(
                        glowScale,
                        glowScale,
                        glowScale
                    );

                // Fade central flash
                flashMaterial.alpha =
                    Math.max(
                        0,
                        1 -
                        life / 90
                    );

                // Fade outer glow
                glowMaterial.alpha =
                    Math.max(
                        0,
                        0.45 -
                        life / 120
                    );

                // Fade directional burst
                burstMaterial.alpha =
                    Math.max(
                        0,
                        0.9 -
                        life / 80
                    );

                // Remove effect
                if (life >= 100) {

                    scene
                        .onBeforeRenderObservable
                        .remove(
                            observer
                        );

                    flash.dispose();
                    glow.dispose();
                    burst.dispose();

                    flashMaterial.dispose();
                    glowMaterial.dispose();
                    burstMaterial.dispose();
                }
            }
        );
}
// =====================================================
// PLAYER CANNON RECOIL
// =====================================================

function recoilPlayerCannon(
    scene,
    camera,
    weaponSide
) {

    if (
        !camera ||
        !camera.playerWeapons
    ) {
        return;
    }


    // =================================================
    // CHOOSE CANNON ASSEMBLY
    // =================================================

    let parts;


    if (
        weaponSide === "left"
    ) {

        parts = [
            camera.playerWeapons.leftCannon,
            camera.playerWeapons.leftCannonTip,
            camera.playerWeapons.leftMuzzle
        ];
    }

    else {

        parts = [
            camera.playerWeapons.rightCannon,
            camera.playerWeapons.rightCannonTip,
            camera.playerWeapons.rightMuzzle
        ];
    }


    // =================================================
    // SAFETY CHECK
    // =================================================

    if (
        parts.some(
            function (part) {
                return !part;
            }
        )
    ) {
        return;
    }


    // Use the main cannon to store recoil state.
    const mainCannon =
        parts[0];


    // =================================================
    // STORE ORIGINAL POSITIONS
    // =================================================

    if (
        !mainCannon.recoilOriginalPositions
    ) {

        mainCannon.recoilOriginalPositions =
            parts.map(
                function (part) {

                    return part.position.clone();
                }
            );
    }


    const originalPositions =
        mainCannon.recoilOriginalPositions;


    // =================================================
    // STOP PREVIOUS RECOIL
    // =================================================

    if (
        mainCannon.recoilObserver
    ) {

        scene
            .onBeforeRenderObservable
            .remove(
                mainCannon.recoilObserver
            );


        mainCannon.recoilObserver =
            null;
    }


    // Reset all pieces before new recoil.
    parts.forEach(
        function (part, index) {

            part.position.copyFrom(
                originalPositions[index]
            );
        }
    );


    // =================================================
    // RECOIL SETTINGS
    // =================================================

    const recoilDistance =
        0.28;


    const recoilBackTime =
        55;


    const recoilReturnTime =
        125;


    const totalTime =
        recoilBackTime +
        recoilReturnTime;


    let life =
        0;


    // =================================================
    // ANIMATE
    // =================================================

    mainCannon.recoilObserver =
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


                    let recoilAmount;


                    // =================================
                    // FAST KICK BACK
                    // =================================

                    if (
                        life <=
                        recoilBackTime
                    ) {

                        const progress =
                            life /
                            recoilBackTime;


                        recoilAmount =
                            recoilDistance *
                            progress;
                    }


                    // =================================
                    // RETURN FORWARD
                    // =================================

                    else {

                        const progress =
                            Math.min(
                                (
                                    life -
                                    recoilBackTime
                                ) /
                                recoilReturnTime,
                                1
                            );


                        recoilAmount =
                            recoilDistance *
                            (
                                1 -
                                progress
                            );
                    }


                    // =================================
                    // MOVE ENTIRE CANNON ASSEMBLY
                    // =================================

                    parts.forEach(
                        function (
                            part,
                            index
                        ) {

                            part.position.z =
                                originalPositions[
                                    index
                                ].z -
                                recoilAmount;
                        }
                    );


                    // =================================
                    // END
                    // =================================

                    if (
                        life >=
                        totalTime
                    ) {

                        parts.forEach(
                            function (
                                part,
                                index
                            ) {

                                part.position.copyFrom(
                                    originalPositions[
                                        index
                                    ]
                                );
                            }
                        );


                        scene
                            .onBeforeRenderObservable
                            .remove(
                                mainCannon.recoilObserver
                            );


                        mainCannon.recoilObserver =
                            null;
                    }
                }
            );
}