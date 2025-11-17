// camera.js

// Fungsi untuk mengakses kamera dan mengatur efek mirror
function setupCamera(videoElement) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } }) // Kamera depan
        .then(function(stream) {
            videoElement.srcObject = stream;
            videoElement.style.transform = "scaleX(-1)";  // Efek mirror
        })
        .catch(function(err) {
            console.log("Error accessing camera: " + err);
        });
}

// Fungsi untuk memilih kamera depan atau belakang
function switchCamera(videoElement, facingMode = "user") {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } })
        .then(function(stream) {
            videoElement.srcObject = stream;
            if (facingMode === "user") {
                videoElement.style.transform = "scaleX(-1)";  // Mirror effect for front camera
            }
        })
        .catch(function(err) {
            console.log("Error switching camera: " + err);
        });
}

// Ekspos fungsi-fungsi yang diperlukan
export { setupCamera, switchCamera };
