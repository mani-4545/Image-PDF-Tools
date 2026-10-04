const input = document.getElementById("cropInput");
const canvas = document.getElementById("cropCanvas");
const ctx = canvas.getContext("2d");

let image = new Image();

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

let isSelecting = false;
let hasSelection = false;


// Image upload
input.addEventListener("change", function () {

    const file = input.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        image.onload = function () {

            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0);

        };

        image.src = e.target.result;

    };

    reader.readAsDataURL(file);

});


// Mouse down
canvas.addEventListener("mousedown", function (e) {

    const rect = canvas.getBoundingClientRect();

    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    endX = startX;
    endY = startY;

    isSelecting = true;
    hasSelection = false;

});


// Mouse move
canvas.addEventListener("mousemove", function (e) {

    if (!isSelecting) return;

    const rect = canvas.getBoundingClientRect();

    endX = e.clientX - rect.left;
    endY = e.clientY - rect.top;

    drawSelection();

});


// Mouse up
canvas.addEventListener("mouseup", function () {

    isSelecting = false;
    hasSelection = true;

});


// Draw selection
function drawSelection() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 0, 0);

    const width = endX - startX;
    const height = endY - startY;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    ctx.strokeRect(
        startX,
        startY,
        width,
        height
    );

}


// Crop and download
function cropImage() {

    if (!input.files[0]) {

        alert("Please select an image first.");

        return;

    }

    if (!hasSelection) {

        alert("Please select an area by dragging on the image.");

        return;

    }


    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);


    if (width < 10 || height < 10) {

        alert("Please select a larger area.");

        return;

    }


    const croppedCanvas = document.createElement("canvas");

    croppedCanvas.width = width;
    croppedCanvas.height = height;


    const croppedCtx = croppedCanvas.getContext("2d");


    croppedCtx.drawImage(
        image,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height
    );


    const link = document.createElement("a");

    link.download = "cropped-image.jpg";

    link.href = croppedCanvas.toDataURL(
        "image/jpeg",
        0.9
    );

    link.click();

}