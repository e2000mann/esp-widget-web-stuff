document.addEventListener('DOMContentLoaded', () => {
    addListenerToMoodMatrix();
    addListenerToTTS();
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