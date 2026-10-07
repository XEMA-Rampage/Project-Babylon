function createEnemyManager(scene, ufos) {

    const manager = {
        spawnTimer: 0,

        // 4 seconds
        spawnDelay: 4000,

        // Maximum living enemies
        maxUFOs: 3
    };

    // =====================================================
    // COUNT LIVING UFOs
    // =====================================================

    function getLivingUFOCount() {

        let count = 0;

        ufos.forEach(function (enemy) {

            if (enemy.alive) {
                count++;
            }

        });

        return count;
    }

    // =====================================================
    // RANDOM SPAWN POSITION
    // =====================================================

    function getRandomSpawnPosition() {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            18 +
            Math.random() *
            15;

        const height =
            -8 +
            Math.random() *
            16;

        const x =
            Math.cos(angle) *
            distance;

        const z =
            Math.sin(angle) *
            distance;

        return new BABYLON.Vector3(
            x,
            height,
            z
        );
    }

    // =====================================================
    // UPDATE
    // =====================================================

    manager.update = function (deltaTime) {
        if (
    scene.hud &&
    (
        !scene.hud.gameStarted ||
        scene.hud.gameOver
    )
        ) {
    return;
    }
        manager.spawnTimer += deltaTime;

        const livingUFOs =
            getLivingUFOCount();

        // Only spawn if we're below the maximum
        if (
            livingUFOs < manager.maxUFOs &&
            manager.spawnTimer >= manager.spawnDelay
        ) {

            const spawnPosition =
                getRandomSpawnPosition();

            const enemy =
    createUFO(
        scene,
        ufos,
        spawnPosition
    );


    createUFOSpawnEffect(
        scene,
        spawnPosition,
        enemy
    );
            playEnemySpawnSound();

            console.log(
                "UFO spawned. Living UFOs:",
                livingUFOs + 1
            );

            manager.spawnTimer = 0;
        }
    };

    return manager;
}