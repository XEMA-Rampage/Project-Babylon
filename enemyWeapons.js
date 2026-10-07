// =====================================================
// ENEMY WEAPONS
// =====================================================

function fireEnemyWeapon(
    scene,
    enemyData,
    playerPosition
) {

    console.log(
        "ENEMY WEAPON FIRED"
    );
    playEnemyLaserSound();

    if (
        !enemyData ||
        !enemyData.alive
    ) {
        return;
    }


    // =================================================
    // CHOOSE CANNON
    // =================================================

    const cannon =
        Math.random() < 0.5
            ? enemyData.cannonLeft
            : enemyData.cannonRight;


    cannon.computeWorldMatrix(
        true
    );


    const startPoint =
        cannon
            .getAbsolutePosition()
            .clone();


    // =================================================
    // CREATE LASER BOLT
    // =================================================

    const laser =
        BABYLON.MeshBuilder.CreateSphere(
            "enemyLaser",
            {
                diameter: 0.45,
                segments: 12
            },
            scene
        );


    laser.position =
        startPoint.clone();


    laser.isPickable =
        false;


    // =================================================
    // LASER MATERIAL
    // =================================================

    const laserMaterial =
        new BABYLON.StandardMaterial(
            "enemyLaserMaterial",
            scene
        );


    laserMaterial.diffuseColor =
        new BABYLON.Color3(
            0.05,
            0.5,
            1
        );


    laserMaterial.emissiveColor =
        new BABYLON.Color3(
            0.1,
            0.8,
            1
        );


    laserMaterial.disableLighting =
        true;


    laser.material =
        laserMaterial;


    // =================================================
    // CALCULATE MOVEMENT
    // =================================================

    const direction =
        playerPosition
            .subtract(
                startPoint
            )
            .normalize();


    const speed =
        0.025;


    // =================================================
    // MOVE LASER TOWARD PLAYER
    // =================================================

    const observer =
        scene.onBeforeRenderObservable.add(
            function () {

                const deltaTime =
                    scene
                        .getEngine()
                        .getDeltaTime();


                laser.position.addInPlace(

                    direction.scale(
                        speed *
                        deltaTime
                    )

                );


                // =====================================
                // CHECK DISTANCE TO PLAYER
                // =====================================

                const distance =
                    BABYLON.Vector3.Distance(
                        laser.position,
                        playerPosition
                    );


                if (
                    distance <= 0.6
                ) {

                    scene
                        .onBeforeRenderObservable
                        .remove(
                            observer
                        );


                    laser.dispose();

                    laserMaterial.dispose();


                console.log(
                    "PLAYER HIT"
                );

                    if (
                    scene.hud
                    ) {

                    scene.hud.damagePlayer(
                    20
                    );
                }
                }
            }
        );
}