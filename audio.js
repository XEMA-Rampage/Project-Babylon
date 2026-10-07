// =====================================================
// AUDIO SYSTEM
// =====================================================

let audioContext = null;


// =====================================================
// GET / CREATE AUDIO CONTEXT
// =====================================================

function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    return audioContext;
}


// =====================================================
// RESUME AUDIO
// =====================================================

function resumeAudio() {

    const ctx =
        getAudioContext();

    if (
        ctx.state ===
        "suspended"
    ) {

        ctx.resume();
    }
}


// =====================================================
// BASIC TONE HELPER
// =====================================================

function playTone(
    startFrequency,
    endFrequency,
    duration,
    volume,
    type = "sine"
) {

    const ctx =
        getAudioContext();


    const oscillator =
        ctx.createOscillator();


    const gain =
        ctx.createGain();


    oscillator.type =
        type;


    oscillator.frequency.setValueAtTime(
        startFrequency,
        ctx.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(
            endFrequency,
            1
        ),
        ctx.currentTime +
        duration
    );


    gain.gain.setValueAtTime(
        volume,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime +
        duration
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        ctx.destination
    );


    oscillator.start();


    oscillator.stop(
        ctx.currentTime +
        duration
    );
}


// =====================================================
// NOISE HELPER
// =====================================================

function playNoise(
    duration,
    volume
) {

    const ctx =
        getAudioContext();


    const bufferSize =
        Math.floor(
            ctx.sampleRate *
            duration
        );


    const buffer =
        ctx.createBuffer(
            1,
            bufferSize,
            ctx.sampleRate
        );


    const data =
        buffer.getChannelData(
            0
        );


    for (
        let i = 0;
        i < bufferSize;
        i++
    ) {

        data[i] =
            Math.random() *
            2 -
            1;
    }


    const noise =
        ctx.createBufferSource();


    noise.buffer =
        buffer;


    const gain =
        ctx.createGain();


    gain.gain.setValueAtTime(
        volume,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime +
        duration
    );


    noise.connect(
        gain
    );


    gain.connect(
        ctx.destination
    );


    noise.start();
}


// =====================================================
// ENEMY SPAWN SOUND
// =====================================================

function playEnemySpawnSound() {

    resumeAudio();


    playTone(
        900,
        350,
        0.35,
        0.18,
        "sine"
    );


    setTimeout(
        function () {

            playTone(
                650,
                250,
                0.25,
                0.12,
                "triangle"
            );

        },
        80
    );
}


// =====================================================
// PLAYER LASER SOUND
// =====================================================

function playPlayerLaserSound() {

    resumeAudio();


    playTone(
        1200,
        300,
        0.12,
        0.12,
        "square"
    );
}


// =====================================================
// ENEMY LASER SOUND
// =====================================================

function playEnemyLaserSound() {

    resumeAudio();


    playTone(
        500,
        140,
        0.22,
        0.18,
        "sawtooth"
    );
}


// =====================================================
// UFO CHARGE SOUND
// =====================================================

function playUFOChargeSound() {

    resumeAudio();

    const ctx =
        getAudioContext();

    let stopped =
        false;


    // =============================================
    // MAIN CHARGE TONE
    // =============================================

    const osc1 =
        ctx.createOscillator();

    const gain1 =
        ctx.createGain();


    osc1.type =
        "sine";


    osc1.frequency.setValueAtTime(
        180,
        ctx.currentTime
    );


    osc1.frequency.exponentialRampToValueAtTime(
        950,
        ctx.currentTime + 2.4
    );


    gain1.gain.setValueAtTime(
        0.08,
        ctx.currentTime
    );


    gain1.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 2.4
    );


    osc1.connect(
        gain1
    );

    gain1.connect(
        ctx.destination
    );


    // =============================================
    // SECOND CHARGE LAYER
    // =============================================

    const osc2 =
        ctx.createOscillator();

    const gain2 =
        ctx.createGain();


    osc2.type =
        "triangle";


    osc2.frequency.setValueAtTime(
        120,
        ctx.currentTime
    );


    osc2.frequency.exponentialRampToValueAtTime(
        700,
        ctx.currentTime + 2.4
    );


    gain2.gain.setValueAtTime(
        0.05,
        ctx.currentTime
    );


    gain2.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 2.4
    );


    osc2.connect(
        gain2
    );

    gain2.connect(
        ctx.destination
    );


    // =============================================
    // START
    // =============================================

    osc1.start();
    osc2.start();


    osc1.stop(
        ctx.currentTime + 2.45
    );

    osc2.stop(
        ctx.currentTime + 2.45
    );


    // =============================================
    // RETURN STOP CONTROLLER
    // =============================================

    return {

        stop:
            function () {

                if (stopped) {
                    return;
                }

                stopped =
                    true;


                gain1.gain.cancelScheduledValues(
                    ctx.currentTime
                );

                gain2.gain.cancelScheduledValues(
                    ctx.currentTime
                );


                gain1.gain.setValueAtTime(
                    0,
                    ctx.currentTime
                );

                gain2.gain.setValueAtTime(
                    0,
                    ctx.currentTime
                );


                try {

                    osc1.stop();

                }
                catch (error) {
                }


                try {

                    osc2.stop();

                }
                catch (error) {
                }


                osc1.disconnect();
                osc2.disconnect();

                gain1.disconnect();
                gain2.disconnect();
            }
    };
}


// =====================================================
// UFO HIT SOUND
// =====================================================

function playUFOHitSound() {

    resumeAudio();


    playTone(
        220,
        90,
        0.09,
        0.14,
        "square"
    );
}


// =====================================================
// UFO EXPLOSION SOUND
// =====================================================

function playUFOExplosionSound() {

    resumeAudio();


    // Loud noise burst
    playNoise(
        0.55,
        0.32
    );


    // Deep bass impact
    playTone(
        140,
        35,
        0.65,
        0.28,
        "sine"
    );


    // Extra gritty layer
    playTone(
        90,
        45,
        0.45,
        0.18,
        "sawtooth"
    );
}


// =====================================================
// PLAYER DAMAGE SOUND
// =====================================================

function playPlayerDamageSound() {

    resumeAudio();


    playTone(
        220,
        110,
        0.18,
        0.18,
        "sawtooth"
    );


    setTimeout(
        function () {

            playTone(
                180,
                90,
                0.18,
                0.15,
                "sawtooth"
            );

        },
        90
    );
}


// =====================================================
// ENERGY DEPLETED SOUND
// =====================================================

function playEnergyDepletedSound() {

    resumeAudio();


    playTone(
        700,
        700,
        0.10,
        0.12,
        "square"
    );


    setTimeout(
        function () {

            playTone(
                450,
                450,
                0.12,
                0.12,
                "square"
            );

        },
        120
    );
}


// =====================================================
// WIN SOUND
// =====================================================

function playWinSound() {

    resumeAudio();


    playTone(
        440,
        440,
        0.18,
        0.12,
        "sine"
    );


    setTimeout(
        function () {

            playTone(
                660,
                660,
                0.18,
                0.12,
                "sine"
            );

        },
        180
    );


    setTimeout(
        function () {

            playTone(
                880,
                880,
                0.30,
                0.15,
                "sine"
            );

        },
        360
    );
}


// =====================================================
// LOSE SOUND
// =====================================================

function playLoseSound() {

    resumeAudio();


    playTone(
        400,
        220,
        0.25,
        0.14,
        "triangle"
    );


    setTimeout(
        function () {

            playTone(
                260,
                120,
                0.40,
                0.16,
                "triangle"
            );

        },
        220
    );
}


// =====================================================
// BACKGROUND MUSIC
// =====================================================

let backgroundMusic =
    null;


// =====================================================
// START BACKGROUND MUSIC
// =====================================================

function startBackgroundMusic() {

    if (!backgroundMusic) {

        backgroundMusic =
            new Audio(
                "audio/every-end.mp3"
            );


        // Loop only when the song itself ends
        backgroundMusic.loop =
            true;


        // Background level so SFX can sit above it
        backgroundMusic.volume =
            0.07;
    }


    // Do not restart if already playing
    if (backgroundMusic.paused) {

        backgroundMusic.play()
            .catch(
                function (error) {

                    console.log(
                        "Background music could not start:",
                        error
                    );
                }
            );
    }
}


// =====================================================
// PAUSE BACKGROUND MUSIC
// =====================================================

function pauseBackgroundMusic() {

    if (
        backgroundMusic
    ) {

        backgroundMusic.pause();
    }
}


// =====================================================
// RESUME BACKGROUND MUSIC
// =====================================================

function resumeBackgroundMusic() {

    if (
        backgroundMusic &&
        backgroundMusic.paused
    ) {

        backgroundMusic.play()
            .catch(
                function (error) {

                    console.log(
                        "Background music could not resume:",
                        error
                    );
                }
            );
    }
}