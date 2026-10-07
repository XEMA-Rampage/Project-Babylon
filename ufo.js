// =====================================================
// CREATE ONE UFO
// =====================================================

function createUFO(
    scene,
    ufos,
    position
) {

    // =================================================
    // MAIN UFO ROOT
    // =================================================

    const root =
        new BABYLON.TransformNode(
            "ufoRoot",
            scene
        );

    root.position =
        position.clone();


    // =================================================
    // VISUAL ROOT
    // =================================================

    const visualRoot =
        new BABYLON.TransformNode(
            "ufoVisualRoot",
            scene
        );

    visualRoot.parent =
        root;


    // =================================================
    // UFO BODY
    // =================================================

    const ufo =
        BABYLON.MeshBuilder.CreateSphere(
            "ufoBody",
            {
                diameter: 2,
                segments: 32
            },
            scene
        );

    ufo.parent =
        visualRoot;

    ufo.position =
        new BABYLON.Vector3(
            0,
            0,
            0
        );

    ufo.scaling =
        new BABYLON.Vector3(
            2,
            0.35,
            2
        );


    const ufoMaterial =
        new BABYLON.StandardMaterial(
            "ufoMaterial",
            scene
        );

    ufoMaterial.diffuseColor =
        new BABYLON.Color3(
            0.4,
            0.8,
            0.9
        );

    ufoMaterial.emissiveColor =
        new BABYLON.Color3(
            0.05,
            0.2,
            0.25
        );

    ufo.material =
        ufoMaterial;


    // =================================================
    // UFO DOME
    // =================================================

    const dome =
        BABYLON.MeshBuilder.CreateSphere(
            "ufoDome",
            {
                diameter: 1.4,
                segments: 32
            },
            scene
        );

    dome.parent =
        visualRoot;

    dome.position =
        new BABYLON.Vector3(
            0,
            0.45,
            0
        );

    dome.scaling =
        new BABYLON.Vector3(
            1,
            0.5,
            1
        );


    const domeMaterial =
        new BABYLON.StandardMaterial(
            "domeMaterial",
            scene
        );

    domeMaterial.diffuseColor =
        new BABYLON.Color3(
            0.3,
            0.9,
            1
        );

    domeMaterial.emissiveColor =
        new BABYLON.Color3(
            0.05,
            0.2,
            0.3
        );

    domeMaterial.alpha =
        0.7;

    dome.material =
        domeMaterial;


    // =================================================
    // CANNON MATERIAL
    // =================================================

    const cannonMaterial =
        new BABYLON.StandardMaterial(
            "cannonMaterial",
            scene
        );

    cannonMaterial.diffuseColor =
        new BABYLON.Color3(
            0.18,
            0.18,
            0.22
        );

    cannonMaterial.emissiveColor =
        new BABYLON.Color3(
            0.08,
            0.08,
            0.1
        );


    // =================================================
    // LEFT CANNON
    // =================================================

    const cannonLeft =
        BABYLON.MeshBuilder.CreateCylinder(
            "cannonLeft",
            {
                height: 2,
                diameter: 0.35
            },
            scene
        );

    cannonLeft.parent =
        root;

    cannonLeft.rotation.x =
        Math.PI / 2;

    cannonLeft.position =
        new BABYLON.Vector3(
            -1.25,
            -0.25,
            -0.8
        );

    cannonLeft.material =
        cannonMaterial;


    // =================================================
    // RIGHT CANNON
    // =================================================

    const cannonRight =
        BABYLON.MeshBuilder.CreateCylinder(
            "cannonRight",
            {
                height: 2,
                diameter: 0.35
            },
            scene
        );

    cannonRight.parent =
        root;

    cannonRight.rotation.x =
        Math.PI / 2;

    cannonRight.position =
        new BABYLON.Vector3(
            1.25,
            -0.25,
            -0.8
        );

    cannonRight.material =
        cannonMaterial;


    // =================================================
    // CHARGE CORE
    // =================================================

    const chargeCore =
        BABYLON.MeshBuilder.CreateSphere(
            "chargeCore",
            {
                diameter: 0.55,
                segments: 16
            },
            scene
        );

    chargeCore.parent =
        root;

    chargeCore.position =
        new BABYLON.Vector3(
            0,
            -0.5,
            0
        );


    const chargeMaterial =
        new BABYLON.StandardMaterial(
            "chargeMaterial",
            scene
        );

    chargeMaterial.diffuseColor =
        new BABYLON.Color3(
            0,
            0.5,
            0.7
        );

    chargeMaterial.emissiveColor =
        new BABYLON.Color3(
            0,
            0.8,
            1
        );

    chargeCore.material =
        chargeMaterial;


    // =================================================
    // ENEMY DATA
    // =================================================

    const enemyData = {

        enemy: true,

        alive: true,

        health: 3,
        maxHealth: 3,

        root: root,

        visualRoot: visualRoot,

        body: ufo,

        dome: dome,

        cannonLeft: cannonLeft,

        cannonRight: cannonRight,

        chargeCore: chargeCore,

        chargeMaterial: chargeMaterial,

        // =============================================
        // FLOATING MOVEMENT DATA
        // =============================================

        spawnPosition:
            position.clone(),

        moveAngle:
            Math.random() *
            Math.PI *
            2,

        moveSpeed:
            0.0004 +
            Math.random() *
            0.0004,

        moveRadius:
            1.5 +
            Math.random() *
            1.5,

        bobOffset:
            Math.random() *
            Math.PI *
            2,

        bobSpeed:
            0.001 +
            Math.random() *
            0.001,

        bobAmount:
            0.4 +
            Math.random() *
            0.4,
        aiState:
            "waiting",
        aiTimer:
            0,
        waitDuration:
            2000,
        chargeDuration:
            3000
    };

    // =================================================
    // MAKE EVERY UFO PART SHOOTABLE
    // =================================================

    ufo.metadata =
        enemyData;

    dome.metadata =
        enemyData;

    cannonLeft.metadata =
        enemyData;

    cannonRight.metadata =
        enemyData;

    chargeCore.metadata =
        enemyData;


    // Add UFO to enemy list
    ufos.push(
        enemyData
    );


    return enemyData;
}


// =====================================================
// CREATE UFO SYSTEM
// =====================================================

function createUFOSystem(scene) {

    const ufos = [];

    createUFO(
        scene,
        ufos,
        new BABYLON.Vector3(
            0,
            0,
            15
        )
    );

    return ufos;
}


// =====================================================
// DAMAGE UFO
// =====================================================

function damageUFO(
    enemyData,
    amount
) {

    if (!enemyData.alive) {
        return;
    }

    enemyData.health -=
        amount;

    console.log(
        "UFO health:",
        enemyData.health,
        "/",
        enemyData.maxHealth
    );

    if (
        enemyData.health <= 0
    ) {

        destroyUFO(
            enemyData
        );
    }
}


// =====================================================
// DESTROY UFO
// =====================================================

function destroyUFO(
    enemyData
) {

    if (!enemyData.alive) {
        return;
    }

    enemyData.alive =
        false;
    if (
    enemyData.chargeSound
    ) {
    enemyData.chargeSound.stop();

    enemyData.chargeSound =
        null;
    }

    const scene =
        enemyData.body.getScene();

    if (
        scene.hud
    ) {
        scene.hud.addKill();
    }

    const explosionPosition =
        enemyData
            .root
            .getAbsolutePosition()
            .clone();


    createUFOExplosion(
        enemyData.body.getScene(),
        explosionPosition
    );
    playUFOExplosionSound();

    if (
        !enemyData.body.isDisposed()
    ) {
        enemyData.body.dispose();
    }


    if (
        !enemyData.dome.isDisposed()
    ) {
        enemyData.dome.dispose();
    }


    if (
        !enemyData.cannonLeft.isDisposed()
    ) {
        enemyData.cannonLeft.dispose();
    }


    if (
        !enemyData.cannonRight.isDisposed()
    ) {
        enemyData.cannonRight.dispose();
    }


    if (
        !enemyData.chargeCore.isDisposed()
    ) {
        enemyData.chargeCore.dispose();
    }


    enemyData.visualRoot.dispose();

    enemyData.root.dispose();


    console.log(
        "UFO destroyed"
    );
}


// =====================================================
// UPDATE UFOs
// =====================================================

function updateUFOs(
    ufos
) {

    const time =
        performance.now();


    ufos.forEach(
        function (enemy) {

            if (
                !enemy.alive
            ) {
                return;
            }
            enemy.root.lookAt(
                BABYLON.Vector3.Zero()
            );

// =================================================
// ROTATE SAUCER
// =================================================

            enemy
                .visualRoot
                .rotation
                .y +=
                0.01;


            // =================================================
            // LOCAL FLOATING MOVEMENT
            // =================================================

            enemy.moveAngle +=
                enemy.moveSpeed *
                16;


            const offsetX =
                Math.cos(
                    enemy.moveAngle
                ) *
                enemy.moveRadius;


            const offsetZ =
                Math.sin(
                    enemy.moveAngle
                ) *
                enemy.moveRadius;


            const bob =
                Math.sin(
                    time *
                    enemy.bobSpeed +
                    enemy.bobOffset
                ) *
                enemy.bobAmount;


            enemy.root.position.x =
                enemy.spawnPosition.x +
                offsetX;


            enemy.root.position.z =
                enemy.spawnPosition.z +
                offsetZ;


            enemy.root.position.y =
                enemy.spawnPosition.y +
                bob;
        }
    );
}