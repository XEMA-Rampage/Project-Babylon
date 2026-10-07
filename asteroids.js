function createAsteroidSystem(scene) {

    const rockMaterial =
        new BABYLON.StandardMaterial(
            "rockMaterial",
            scene
        );

    rockMaterial.diffuseColor =
        new BABYLON.Color3(
            0.35,
            0.35,
            0.42
        );

    rockMaterial.emissiveColor =
        new BABYLON.Color3(
            0.04,
            0.04,
            0.05
        );

    rockMaterial.specularColor =
        new BABYLON.Color3(
            0.05,
            0.05,
            0.05
        );

    const asteroids = [];

    function createAsteroid(
        orbitRadiusX,
        orbitRadiusZ,
        orbitSpeed,
        height,
        startAngle,
        size
    ) {

        const asteroid =
            BABYLON.MeshBuilder.CreateSphere(
                "asteroid",
                {
                    diameter: size,
                    segments: 6
                },
                scene
            );

        asteroid.material =
            rockMaterial;

        asteroid.rotation =
            new BABYLON.Vector3(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

        asteroid.scaling =
            new BABYLON.Vector3(
                0.8 + Math.random() * 0.5,
                0.8 + Math.random() * 0.5,
                0.8 + Math.random() * 0.5
            );

        asteroids.push({
            mesh: asteroid,
            radiusX: orbitRadiusX,
            radiusZ: orbitRadiusZ,
            speed: orbitSpeed,
            height: height,
            angle: startAngle
        });
    }

    // Starting asteroids
    createAsteroid(10, 14, 0.004, 2, 0, 3);
    createAsteroid(18, 12, 0.0025, -4, Math.PI / 2, 4);
    createAsteroid(25, 30, 0.0015, 6, Math.PI, 5);
    createAsteroid(14, 22, 0.0035, -7, Math.PI * 1.5, 2.5);
    createAsteroid(32, 20, 0.001, 10, Math.PI / 3, 6);

    return asteroids;
}

function updateAsteroids(asteroids) {

    asteroids.forEach(
        function (asteroid) {

            asteroid.angle +=
                asteroid.speed;

            asteroid.mesh.position.x =
                Math.cos(
                    asteroid.angle
                ) *
                asteroid.radiusX;

            asteroid.mesh.position.z =
                Math.sin(
                    asteroid.angle
                ) *
                asteroid.radiusZ;

            asteroid.mesh.position.y =
                asteroid.height;

            asteroid.mesh.rotation.x +=
                0.001;

            asteroid.mesh.rotation.y +=
                0.002;
        }
    );
}