document.addEventListener('DOMContentLoaded', () => {
    addListenerToMoodMatrix();
    addListenerToTTS();
    addListenersToSettings();
});

const addListenerToMoodMatrix = () => {
    const moodMatrixSelect = document.getElementsByClassName('mood-matrix')?.[0];

    if (!moodMatrixSelect) {
        console.error('could not connect to mood matrix');
        return;
    }
    
    moodMatrixSelect.addEventListener('change', moodMatrixListener);
};

const moodMatrixListener = async (event) => {
    const chosenFace = event.target.value;

    try {
        await fetch('/mood-matrix', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chosenFace }),
        });
    } catch (e) {
        console.error(e);
    }
};

const addListenerToTTS = () => {
    const ttsForm = document.getElementsByClassName('tts')?.[0];

    if (!ttsForm) {
        console.error('could not connect to tts form');
        return;
    }
    
    ttsForm.addEventListener('submit', ttsListener);
};

const ttsListener = async (event) => {
    event.preventDefault();

    const textarea = event.target.querySelector("textarea");

    try {
        await fetch('/tts', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: textarea.value }),
        });
    } catch (e) {
        console.error(e);
    }
};

const addListenersToSettings = () => {
    const settingsForm = document.getElementsByClassName('settings')?.[0];

    if (!settingsForm) {
        console.error('could not connect to settings form');
        return;
    }

    settingsForm.addEventListener('submit', settingsListener);

    const brightnessInput = document.querySelector('#brightness');
    brightnessInput.addEventListener('input', (event) => {
        linkInputToOutput(event, '#brightnessOut');
    });

    const volumeInput = document.querySelector('#volume');
    volumeInput.addEventListener('input', (event) => {
        linkInputToOutput(event, '#volumeOut');
    });

};

const settingsListener = async (event) => {
    event.preventDefault();

    const brightness = event.target.querySelector('#brightness');
    const volume = event.target.querySelector('#volume');

    try {
        await fetch('/settings', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brightness: brightness.value, volume: volume.value }),
        });
    } catch (e) {
        console.error(e);
    }
}

const linkInputToOutput = async (event, outputId) => {
    const input = event.target;

    const output = document.querySelector(outputId);
    
    output.textContent = event.target.value;
};