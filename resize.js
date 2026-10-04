const input = document.getElementById("resizeInput");

const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");

const aspectRatio = document.getElementById("aspectRatio");

const canvas = document.getElementById("resizeCanvas");

const ctx = canvas.getContext("2d");

let image = new Image();

let originalWidth = 0;
let originalHeight = 0;


// Image select
input.addEventListener("change", function () {

    const file = input.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        image.onload = function () {

            originalWidth = image.width;
            originalHeight = image.height;

            widthInput.value = originalWidth;
            heightInput.value = originalHeight;

        };

        image.src = e.target.result;

    };

    reader.readAsDataURL(file);

});


// Width change
widthInput.addEventListener("input", function () {

    if (!aspectRatio.checked) return;

    if (originalWidth === 0) return;

    const width = parseInt(widthInput.value);

    if (!width) return;

    const ratio = originalHeight / originalWidth;

    heightInput.value = Math.round(width * ratio);

});


// Height change
heightInput.addEventListener("input", function () {

    if (!aspectRatio.checked) return;

    if (originalHeight === 0) return;

    const height = parseInt(heightInput.value);

    if (!height) return;

    const ratio = originalWidth / originalHeight;

    widthInput.value = Math.round(height * ratio);

});


// Resize
function resizeImage() {

    if (!input.files[0]) {

        alert("Please select an image first.");

        return;

    }


    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);


    if (!width || !height || width <= 0 || height <= 0) {

        alert("Please enter valid width and height.");

        return;

    }


    canvas.width = width;
    canvas.height = height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    ctx.drawImage(
        image,
        0,
        0,
        width,
        height
    );


    const link = document.createElement("a");

    link.download = "resized-image.jpg";

    link.href = canvas.toDataURL(
        "image/jpeg",
        0.9
    );

    link.click();

}