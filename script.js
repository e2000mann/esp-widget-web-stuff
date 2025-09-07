

window.addEventListener('load', () => {
    addListenerToMoodMatrix();
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