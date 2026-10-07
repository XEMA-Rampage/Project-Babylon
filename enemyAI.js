// =====================================================
// ENEMY AI
// =====================================================

function updateEnemyAI(
    ufos,
    deltaTime
) {
    if (
    ufos.length > 0
) {

    const scene =
        ufos[0].body.getScene();

    if (
        scene.hud &&
        (
        !scene.hud.gameStarted ||
        scene.hud.gameOver
        )
    ) {
    return;
}
    if (
        scene.hud &&
        scene.hud.gameOver
    ) {
        return;
    }
}

    ufos.forEach(
        function (enemy) {

            if (
                !enemy.alive
            ) {
                return;
            }


            // =========================================
            // WAITING STATE
            // =========================================

            if (
                enemy.aiState === "waiting"
            ) {

                enemy.aiTimer +=
                    deltaTime;

                if (
                    enemy.aiTimer >=
                    enemy.waitDuration
                ) {

                    enemy.aiState =
                        "charging";

                    enemy.aiTimer =
                        0;

                    startUFOChargeEffect(
                        enemy
                    );
                    enemy.chargeSound =
                        playUFOChargeSound();
                }
            }


            // =========================================
            // CHARGING STATE
            // =========================================

            else if (
                enemy.aiState === "charging"
            ) {

                enemy.aiTimer +=
                    deltaTime;

                const chargePercent =
                    enemy.aiTimer /
                    enemy.chargeDuration;


                updateUFOChargeEffect(
                    enemy,
                    chargePercent
                );


                if (
                    enemy.aiTimer >=
                    enemy.chargeDuration
                ) {

                    createUFOChargeFireFlash(
                        enemy
                    );

                    fireEnemyWeapon(
                        enemy.body.getScene(),
                        enemy,
                        BABYLON.Vector3.Zero()
                    );

                    stopUFOChargeEffect(
                        enemy
                    );

                    enemy.aiState =
                        "waiting";

                    enemy.aiTimer =
                        0;
                }
            }
        }
    );
}