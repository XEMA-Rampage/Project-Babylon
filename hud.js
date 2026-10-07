function createHUD(scene) {

    // =====================================================
    // FULLSCREEN GUI
    // =====================================================

    const gui =
        BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
            "HUD"
        );


    // =====================================================
    // PLAYER HUD STATE
    // =====================================================

    const hud = {

        health: 100,
        maxHealth: 100,

        energy: 100,
        maxEnergy: 100,

        gameStarted: false,

        gameOver: false,

        kills: 0,
        killsToWin: 20

    };


    // =====================================================
    // HEALTH LABEL
    // =====================================================

    const healthLabel =
        new BABYLON.GUI.TextBlock();

    healthLabel.text =
        "HP";

    healthLabel.color =
        "white";

    healthLabel.fontSize =
        20;

    healthLabel.width =
        "60px";

    healthLabel.height =
        "30px";

    healthLabel.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    healthLabel.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    healthLabel.left =
        "30px";

    healthLabel.top =
        "-65px";

    gui.addControl(
        healthLabel
    );


    // =====================================================
    // HEALTH BAR BACKGROUND
    // =====================================================

    const healthBackground =
        new BABYLON.GUI.Rectangle();

    healthBackground.width =
        "260px";

    healthBackground.height =
        "26px";

    healthBackground.cornerRadius =
        5;

    healthBackground.color =
        "white";

    healthBackground.thickness =
        2;

    healthBackground.background =
        "#222222";

    healthBackground.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    healthBackground.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    healthBackground.left =
        "80px";

    healthBackground.top =
        "-65px";

    gui.addControl(
        healthBackground
    );


    // =====================================================
    // HEALTH BAR FILL
    // =====================================================

    const healthFill =
        new BABYLON.GUI.Rectangle();

    healthFill.width =
        "256px";

    healthFill.height =
        "22px";

    healthFill.cornerRadius =
        3;

    healthFill.thickness =
        0;

    healthFill.background =
        "#b52b2b";

    healthFill.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    healthBackground.addControl(
        healthFill
    );


    // =====================================================
    // ENERGY LABEL
    // =====================================================

    const energyLabel =
        new BABYLON.GUI.TextBlock();

    energyLabel.text =
        "ENERGY";

    energyLabel.color =
        "white";

    energyLabel.fontSize =
        20;

    energyLabel.width =
        "90px";

    energyLabel.height =
        "30px";

    energyLabel.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    energyLabel.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    energyLabel.left =
        "-300px";

    energyLabel.top =
        "-65px";

    gui.addControl(
        energyLabel
    );


    // =====================================================
    // ENERGY BAR BACKGROUND
    // =====================================================

    const energyBackground =
        new BABYLON.GUI.Rectangle();

    energyBackground.width =
        "260px";

    energyBackground.height =
        "26px";

    energyBackground.cornerRadius =
        5;

    energyBackground.color =
        "white";

    energyBackground.thickness =
        2;

    energyBackground.background =
        "#222222";

    energyBackground.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    energyBackground.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    energyBackground.left =
        "-30px";

    energyBackground.top =
        "-65px";

    gui.addControl(
        energyBackground
    );


    // =====================================================
    // ENERGY BAR FILL
    // =====================================================

    const energyFill =
        new BABYLON.GUI.Rectangle();

    energyFill.width =
        "256px";

    energyFill.height =
        "22px";

    energyFill.cornerRadius =
        3;

    energyFill.thickness =
        0;

    energyFill.background =
        "#1d78a8";

    energyFill.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    energyBackground.addControl(
        energyFill
    );


    // =====================================================
    // ENERGY DEPLETED WARNING
    // =====================================================

    const energyWarning =
        new BABYLON.GUI.TextBlock();

    energyWarning.text =
        "!ENERGY DEPLETED!";

    energyWarning.color =
        "#ff4444";

    energyWarning.fontSize =
        20;

    energyWarning.fontWeight =
        "bold";

    energyWarning.width =
        "260px";

    energyWarning.height =
        "35px";

    energyWarning.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    energyWarning.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    energyWarning.left =
        "-30px";

    energyWarning.top =
        "-105px";

    energyWarning.isVisible =
        false;

    gui.addControl(
        energyWarning
    );


    // =====================================================
    // UFO KILL COUNTER
    // =====================================================

    const killText =
        new BABYLON.GUI.TextBlock();

    killText.text =
        "UFOs: 0 / " +
        hud.killsToWin;

    killText.color =
        "white";

    killText.fontSize =
        24;

    killText.width =
        "250px";

    killText.height =
        "40px";

    killText.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    killText.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    killText.left =
        "30px";

    killText.top =
        "20px";

    gui.addControl(
        killText
    );


    // =====================================================
    // LOCK-ON WARNING
    // =====================================================

    const lockWarning =
        new BABYLON.GUI.TextBlock();

    lockWarning.text =
        "WARNING: ENEMY LOCK";

    lockWarning.color =
        "#ff3333";

    lockWarning.fontSize =
        28;

    lockWarning.fontWeight =
        "bold";

    lockWarning.width =
        "400px";

    lockWarning.height =
        "50px";

    lockWarning.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    lockWarning.top =
        "75px";

    lockWarning.isVisible =
        false;

    gui.addControl(
        lockWarning
    );


    // =====================================================
    // START SCREEN OVERLAY
    // =====================================================

    const startOverlay =
        new BABYLON.GUI.Rectangle();

    startOverlay.width =
        "100%";

    startOverlay.height =
        "100%";

    startOverlay.thickness =
        0;

    startOverlay.background =
        "black";

    startOverlay.alpha =
        0.7;

    startOverlay.isVisible =
        true;

    startOverlay.isHitTestVisible =
        false;

    gui.addControl(
        startOverlay
    );


    // =====================================================
    // START SCREEN PANEL
    // =====================================================

    const startPanel =
        new BABYLON.GUI.Rectangle();

    startPanel.width =
        "650px";

    startPanel.height =
        "380px";

    startPanel.cornerRadius =
        18;

    startPanel.thickness =
        3;

    startPanel.color =
        "#66ffcc";

    startPanel.background =
        "#081018";

    startPanel.alpha =
        0.96;

    startPanel.isVisible =
        true;

    startPanel.isHitTestVisible =
        false;

    gui.addControl(
        startPanel
    );


    // =====================================================
    // START SCREEN INNER BORDER
    // =====================================================

    const startInnerBorder =
        new BABYLON.GUI.Rectangle();

    startInnerBorder.width =
        "94%";

    startInnerBorder.height =
        "90%";

    startInnerBorder.cornerRadius =
        12;

    startInnerBorder.thickness =
        1;

    startInnerBorder.color =
        "#1fffff";

    startInnerBorder.background =
        "transparent";

    startPanel.addControl(
        startInnerBorder
    );


    // =====================================================
    // START SCREEN TITLE
    // =====================================================

    const startTitle =
        new BABYLON.GUI.TextBlock();

    startTitle.text =
        "UFO INVASION INBOUND";

    startTitle.color =
        "#66ffcc";

    startTitle.fontSize =
        38;

    startTitle.fontWeight =
        "bold";

    startTitle.width =
        "95%";

    startTitle.height =
        "60px";

    startTitle.top =
        "-125px";

    startPanel.addControl(
        startTitle
    );


    // =====================================================
    // START SCREEN OBJECTIVE
    // =====================================================

    const startDescription =
        new BABYLON.GUI.TextBlock();

    startDescription.text =
        "Destroy " +
        hud.killsToWin +
        " UFOs before your HP reaches 0";

    startDescription.color =
        "white";

    startDescription.fontSize =
        22;

    startDescription.fontWeight =
        "bold";

    startDescription.width =
        "90%";

    startDescription.height =
        "45px";

    startDescription.top =
        "-55px";

    startPanel.addControl(
        startDescription
    );


    // =====================================================
    // START SCREEN CONTROLS
    // =====================================================

    const startControls =
        new BABYLON.GUI.TextBlock();

    startControls.text =
        "LEFT CLICK  -  LEFT CANNON\n" +
        "RIGHT CLICK  -  RIGHT CANNON";

    startControls.color =
        "#cfefff";

    startControls.fontSize =
        17;

    startControls.fontWeight =
        "bold";

    startControls.lineSpacing =
        "8px";

    startControls.width =
        "90%";

    startControls.height =
        "80px";

    startControls.top =
        "25px";

    startPanel.addControl(
        startControls
    );


    // =====================================================
    // START SCREEN BEGIN PROMPT
    // =====================================================

    const startBegin =
        new BABYLON.GUI.TextBlock();

    startBegin.text =
        "PRESS SPACE TO BEGIN";

    startBegin.color =
        "#aaffee";

    startBegin.fontSize =
        24;

    startBegin.fontWeight =
        "bold";

    startBegin.width =
        "90%";

    startBegin.height =
        "45px";

    startBegin.top =
        "125px";

    startPanel.addControl(
        startBegin
    );


// =====================================================
// START GAME WITH SPACE
// =====================================================

function handleStartGameKey(event) {

    if (
        !hud.gameStarted &&
        !hud.gameOver &&
        event.code === "Space"
    ) {

        hud.gameStarted =
            true;

        startBackgroundMusic();

        startOverlay.isVisible =
            false;

        startPanel.isVisible =
            false;

        console.log(
            "GAME STARTED"
        );
    }
}
window.addEventListener(
    "keydown",
    handleStartGameKey
);
    // =====================================================
    // DAMAGE SCREEN EDGE EFFECT
    // =====================================================

    const damageTop =
        new BABYLON.GUI.Rectangle();

    damageTop.width =
        "100%";

    damageTop.height =
        "70px";

    damageTop.thickness =
        0;

    damageTop.background =
        "#ff0000";

    damageTop.alpha =
        0;

    damageTop.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    damageTop.isHitTestVisible =
        false;

    gui.addControl(
        damageTop
    );


    const damageBottom =
        new BABYLON.GUI.Rectangle();

    damageBottom.width =
        "100%";

    damageBottom.height =
        "70px";

    damageBottom.thickness =
        0;

    damageBottom.background =
        "#ff0000";

    damageBottom.alpha =
        0;

    damageBottom.verticalAlignment =
        BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    damageBottom.isHitTestVisible =
        false;

    gui.addControl(
        damageBottom
    );


    const damageLeft =
        new BABYLON.GUI.Rectangle();

    damageLeft.width =
        "70px";

    damageLeft.height =
        "100%";

    damageLeft.thickness =
        0;

    damageLeft.background =
        "#ff0000";

    damageLeft.alpha =
        0;

    damageLeft.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    damageLeft.isHitTestVisible =
        false;

    gui.addControl(
        damageLeft
    );


    const damageRight =
        new BABYLON.GUI.Rectangle();

    damageRight.width =
        "70px";

    damageRight.height =
        "100%";

    damageRight.thickness =
        0;

    damageRight.background =
        "#ff0000";

    damageRight.alpha =
        0;

    damageRight.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    damageRight.isHitTestVisible =
        false;

    gui.addControl(
        damageRight
    );


    // =====================================================
    // GAME END DARK OVERLAY
    // =====================================================

    const gameEndOverlay =
        new BABYLON.GUI.Rectangle();

    gameEndOverlay.width =
        "100%";

    gameEndOverlay.height =
        "100%";

    gameEndOverlay.thickness =
        0;

    gameEndOverlay.background =
        "black";

    gameEndOverlay.alpha =
        0.65;

    gameEndOverlay.isVisible =
        false;

    gameEndOverlay.isHitTestVisible =
        false;

    gui.addControl(
        gameEndOverlay
    );


    // =====================================================
    // FUTURISTIC GAME END PANEL
    // =====================================================

    const gameEndPanel =
        new BABYLON.GUI.Rectangle();

    gameEndPanel.width =
        "520px";

    gameEndPanel.height =
        "180px";

    gameEndPanel.cornerRadius =
        18;

    gameEndPanel.thickness =
        3;

    gameEndPanel.color =
        "#66ffcc";

    gameEndPanel.background =
        "#081018";

    gameEndPanel.alpha =
        0.96;

    gameEndPanel.isVisible =
        false;

    gameEndPanel.isHitTestVisible =
        false;

    gui.addControl(
        gameEndPanel
    );


    // =====================================================
    // GAME END INNER BORDER
    // =====================================================

    const gameEndInnerBorder =
        new BABYLON.GUI.Rectangle();

    gameEndInnerBorder.width =
        "94%";

    gameEndInnerBorder.height =
        "82%";

    gameEndInnerBorder.cornerRadius =
        12;

    gameEndInnerBorder.thickness =
        1;

    gameEndInnerBorder.color =
        "#1fffff";

    gameEndInnerBorder.background =
        "transparent";

    gameEndPanel.addControl(
        gameEndInnerBorder
    );


    // =====================================================
    // GAME END TEXT
    // =====================================================

    const gameEndText =
        new BABYLON.GUI.TextBlock();

    gameEndText.text =
        "";

    gameEndText.color =
        "white";

    gameEndText.fontSize =
        52;

    gameEndText.fontWeight =
        "bold";

    gameEndText.width =
        "100%";

    gameEndText.height =
        "100%";

    gameEndText.top =
        "-25px";

    gameEndPanel.addControl(
        gameEndText
    );


    // =====================================================
    // RESTART INSTRUCTION
    // =====================================================

    const restartText =
        new BABYLON.GUI.TextBlock();

    restartText.text =
        "PRESS R TO PLAY AGAIN";

    restartText.color =
        "#aaffee";

    restartText.fontSize =
        20;

    restartText.fontWeight =
        "bold";

    restartText.width =
        "100%";

    restartText.height =
        "40px";

    restartText.top =
        "55px";

    gameEndPanel.addControl(
        restartText
    );


    // =====================================================
    // DAMAGE FLASH STATE
    // =====================================================

    let damageFlashObserver =
        null;

    let damageFlashLife =
        0;


    // =====================================================
    // SET HEALTH
    // =====================================================

    hud.setHealth =
        function (value) {

            hud.health =
                Math.max(
                    0,
                    Math.min(
                        value,
                        hud.maxHealth
                    )
                );

            const percentage =
                hud.health /
                hud.maxHealth;

            healthFill.width =
                (256 * percentage) +
                "px";
        };


    // =====================================================
    // SET ENERGY
    // =====================================================

    hud.setEnergy =
        function (value) {

            hud.energy =
                Math.max(
                    0,
                    Math.min(
                        value,
                        hud.maxEnergy
                    )
                );

            const percentage =
                hud.energy /
                hud.maxEnergy;

            energyFill.width =
                (256 * percentage) +
                "px";
        };


    // =====================================================
    // USE WEAPON ENERGY
    // =====================================================

    hud.tryUseEnergy =
        function (amount) {

            if (
                hud.energy < amount
            ) {
                return false;
            }

            hud.setEnergy(
                hud.energy -
                amount
            );

            return true;
        };


// =====================================================
// ENERGY REGENERATION
// =====================================================

const energyRegenInterval =
    setInterval(
        function () {

            if (
                !hud.gameStarted ||
                hud.gameOver
            ) {
                return;
            }

            if (
                hud.energy <
                hud.maxEnergy
            ) {

                hud.setEnergy(
                    hud.energy + 20
                );
            }
        },
        2000
    );
    // =====================================================
    // ENERGY DEPLETED WARNING
    // =====================================================

    hud.showEnergyWarning =
        function () {

            energyWarning.isVisible =
                true;

            setTimeout(
                function () {

                    energyWarning.isVisible =
                        false;

                },
                500
            );
        };


    // =====================================================
    // LOCK WARNING
    // =====================================================

    hud.setLockWarning =
        function (active) {

            lockWarning.isVisible =
                active;
        };


    // =====================================================
    // SHOW END SCREEN
    // =====================================================

    hud.showEndScreen =
        function (
            message,
            color
        ) {

            gameEndText.text =
                message;

            gameEndText.color =
                color;

            gameEndOverlay.isVisible =
                true;

            gameEndPanel.isVisible =
                true;
        };


    // =====================================================
    // ADD UFO KILL
    // =====================================================

    hud.addKill =
        function () {

            if (
                hud.gameOver
            ) {
                return;
            }

            hud.kills +=
                1;

            killText.text =
                "UFOs: " +
                hud.kills +
                " / " +
                hud.killsToWin;


            if (
                hud.kills >=
                hud.killsToWin
            ) {

                hud.gameOver =
                    true;
                playWinSound();

                console.log(
                    "PLAYER WON"
                );

                hud.showEndScreen(
                    "YOU WIN",
                    "#66ff99"
                );
            }
        };


    // =====================================================
    // DAMAGE EDGE FLASH
    // =====================================================

    hud.flashDamage =
        function () {

            damageFlashLife =
                0;

            damageTop.alpha =
                0.65;

            damageBottom.alpha =
                0.65;

            damageLeft.alpha =
                0.65;

            damageRight.alpha =
                0.65;


            if (
                damageFlashObserver
            ) {

                scene
                    .onBeforeRenderObservable
                    .remove(
                        damageFlashObserver
                    );
            }


            damageFlashObserver =
                scene.onBeforeRenderObservable.add(
                    function () {

                        damageFlashLife +=
                            scene
                                .getEngine()
                                .getDeltaTime();


                        const fade =
                            Math.max(
                                0,
                                0.65 -
                                damageFlashLife /
                                450
                            );


                        damageTop.alpha =
                            fade;

                        damageBottom.alpha =
                            fade;

                        damageLeft.alpha =
                            fade;

                        damageRight.alpha =
                            fade;


                        if (
                            damageFlashLife >=
                            300
                        ) {

                            damageTop.alpha =
                                0;

                            damageBottom.alpha =
                                0;

                            damageLeft.alpha =
                                0;

                            damageRight.alpha =
                                0;


                            scene
                                .onBeforeRenderObservable
                                .remove(
                                    damageFlashObserver
                                );


                            damageFlashObserver =
                                null;
                        }
                    }
                );
        };


    // =====================================================
    // DAMAGE PLAYER
    // =====================================================

    hud.damagePlayer =
        function (amount) {
            playPlayerDamageSound();

            if (
                hud.health <= 0 ||
                hud.gameOver
            ) {
                return;
            }
            shakeCamera(
                scene,
                0.10,
                280
            );

            hud.setHealth(
                hud.health -
                amount
            );


            hud.flashDamage();


            console.log(
                "PLAYER HP:",
                hud.health,
                "/",
                hud.maxHealth
            );


            if (
                hud.health <= 0
            ) {

                hud.gameOver =
                    true;
                playLoseSound();

                console.log(
                    "PLAYER DEFEATED"
                );

                hud.showEndScreen(
                    "YOU LOSE",
                    "#ff5555"
                );
            }
        };


    // =====================================================
    // MAKE HUD ACCESSIBLE TO OTHER SYSTEMS
    // =====================================================

    scene.hud =
        hud;


// =====================================================
// RESTART AFTER WIN / LOSS
// =====================================================

function handleRestartKey(event) {

    if (
        hud.gameOver &&
        event.key.toLowerCase() === "r"
    ) {

        restartGame();
    }
}


window.addEventListener(
    "keydown",
    handleRestartKey
);


// =====================================================
// CLEAN UP HUD WHEN ROUND IS DISPOSED
// =====================================================

scene.onDisposeObservable.add(
    function () {

        window.removeEventListener(
            "keydown",
            handleStartGameKey
        );

        window.removeEventListener(
            "keydown",
            handleRestartKey
        );

        clearInterval(
            energyRegenInterval
        );
    }
);
    return hud;
}