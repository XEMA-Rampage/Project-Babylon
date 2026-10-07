function createPlayer(scene, canvas) {

    // =====================================================
    // CAMERA
    // =====================================================

    const camera =
        new BABYLON.UniversalCamera(
            "camera",
            new BABYLON.Vector3(
                0,
                0,
                0
            ),
            scene
        );

    camera.setTarget(
        new BABYLON.Vector3(
            0,
            0,
            1
        )
    );

    camera.attachControl(
        canvas,
        true
    );

    // Stationary player
    camera.angularSensibility = 3000;

    // Allow camera to render objects very close to it
    camera.minZ = 0.05;

    camera.maxZ = 1000;


    // =====================================================
    // POINTER LOCK
    // =====================================================

    canvas.addEventListener(
        "click",
        function () {

            if (
                document.pointerLockElement !== canvas
            ) {
                canvas.requestPointerLock();
            }
        }
    );

    canvas.addEventListener(
        "contextmenu",
        function (event) {

            event.preventDefault();
        }
    );


    // =====================================================
    // RETICLE
    // =====================================================

    const gui =
        BABYLON.GUI
            .AdvancedDynamicTexture
            .CreateFullscreenUI(
                "UI"
            );

    const crosshair =
        new BABYLON.GUI.TextBlock();

    crosshair.text = "+";
    crosshair.color = "white";
    crosshair.fontSize = 32;

    gui.addControl(
        crosshair
    );


    // =====================================================
    // MAIN CANNON MATERIAL
    // =====================================================

    const cannonMaterial =
        new BABYLON.StandardMaterial(
            "playerCannonMaterial",
            scene
        );

    cannonMaterial.diffuseColor =
        new BABYLON.Color3(
            0.12,
            0.12,
            0.16
        );

    cannonMaterial.emissiveColor =
        new BABYLON.Color3(
            0.04,
            0.08,
            0.12
        );

    cannonMaterial.specularColor =
        new BABYLON.Color3(
            0.3,
            0.3,
            0.35
        );


    // =====================================================
    // NEON TIP MATERIAL
    // =====================================================

    const neonTipMaterial =
        new BABYLON.StandardMaterial(
            "playerNeonTipMaterial",
            scene
        );

    neonTipMaterial.diffuseColor =
        new BABYLON.Color3(
            0.35,
            0.02,
            0.02
        );

    neonTipMaterial.emissiveColor =
        new BABYLON.Color3(
            0.7,
            0.05,
            0.05
        );

    neonTipMaterial.specularColor =
        new BABYLON.Color3(
            0.4,
            0.1,
            0.1
        );


    // =====================================================
    // MUZZLE MATERIAL
    // =====================================================

    const muzzleMaterial =
        new BABYLON.StandardMaterial(
            "playerMuzzleMaterial",
            scene
        );

    muzzleMaterial.diffuseColor =
        new BABYLON.Color3(
            0.4,
            0.01,
            0.01
        );

    muzzleMaterial.emissiveColor =
        new BABYLON.Color3(
            0.9,
            0.03,
            0.03
        );

    muzzleMaterial.disableLighting =
        true;


    // =====================================================
    // LEFT MAIN CANNON
    // =====================================================

    const leftCannon =
        BABYLON.MeshBuilder.CreateCylinder(
            "playerLeftCannon",
            {
                height: 1.2,
                diameter: 0.32
            },
            scene
        );

    leftCannon.parent =
        camera;

    leftCannon.rotation.x =
        Math.PI / 2;

    leftCannon.position =
        new BABYLON.Vector3(
            -0.72,
            -0.48,
            1.15
        );

    leftCannon.material =
        cannonMaterial;


    // =====================================================
    // LEFT NEON TIP
    // =====================================================

    const leftCannonTip =
        BABYLON.MeshBuilder.CreateCylinder(
            "playerLeftCannonTip",
            {
                height: 0.4,
                diameter: 0.32
            },
            scene
        );

    leftCannonTip.parent =
        camera;

    leftCannonTip.rotation.x =
        Math.PI / 2;

    leftCannonTip.position =
        new BABYLON.Vector3(
            -0.72,
            -0.48,
            1.95
        );

    leftCannonTip.material =
        neonTipMaterial;


    // =====================================================
    // LEFT MUZZLE
    // =====================================================

    const leftMuzzle =
        BABYLON.MeshBuilder.CreateSphere(
            "leftMuzzle",
            {
                diameter: 0.18,
                segments: 12
            },
            scene
        );

    leftMuzzle.parent =
        camera;

    leftMuzzle.position =
        new BABYLON.Vector3(
            -0.72,
            -0.48,
            2.2
        );

    leftMuzzle.material =
        muzzleMaterial;


    // =====================================================
    // RIGHT MAIN CANNON
    // =====================================================

    const rightCannon =
        BABYLON.MeshBuilder.CreateCylinder(
            "playerRightCannon",
            {
                height: 1.2,
                diameter: 0.32
            },
            scene
        );

    rightCannon.parent =
        camera;

    rightCannon.rotation.x =
        Math.PI / 2;

    rightCannon.position =
        new BABYLON.Vector3(
            0.72,
            -0.48,
            1.15
        );

    rightCannon.material =
        cannonMaterial;


    // =====================================================
    // RIGHT NEON TIP
    // =====================================================

    const rightCannonTip =
        BABYLON.MeshBuilder.CreateCylinder(
            "playerRightCannonTip",
            {
                height: 0.4,
                diameter: 0.32
            },
            scene
        );

    rightCannonTip.parent =
        camera;

    rightCannonTip.rotation.x =
        Math.PI / 2;

    rightCannonTip.position =
        new BABYLON.Vector3(
            0.72,
            -0.48,
            1.95
        );

    rightCannonTip.material =
        neonTipMaterial;


    // =====================================================
    // RIGHT MUZZLE
    // =====================================================

    const rightMuzzle =
        BABYLON.MeshBuilder.CreateSphere(
            "rightMuzzle",
            {
                diameter: 0.18,
                segments: 12
            },
            scene
        );

    rightMuzzle.parent =
        camera;

    rightMuzzle.position =
        new BABYLON.Vector3(
            0.72,
            -0.48,
            2.2
        );

    rightMuzzle.material =
        muzzleMaterial;


    // =====================================================
    // PLAYER WEAPON MESHES MUST NOT BLOCK SHOOTING RAY
    // =====================================================

    leftCannon.isPickable = false;
    rightCannon.isPickable = false;

    leftCannonTip.isPickable = false;
    rightCannonTip.isPickable = false;

    leftMuzzle.isPickable = false;
    rightMuzzle.isPickable = false;


    // =====================================================
    // STORE PLAYER WEAPON REFERENCES
    // =====================================================

    camera.playerWeapons = {

        leftCannon:
            leftCannon,

        rightCannon:
            rightCannon,

        leftCannonTip:
            leftCannonTip,

        rightCannonTip:
            rightCannonTip,

        leftMuzzle:
            leftMuzzle,

        rightMuzzle:
            rightMuzzle
    };


    return camera;
}