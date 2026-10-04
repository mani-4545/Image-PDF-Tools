const input = document.getElementById("convertInput");
const formatInput = document.getElementById("formatInput");

const preview = document.getElementById("preview");
const result = document.getElementById("result");

let selectedImage = null;


// Image select
input.addEventListener("change", function () {

    const file = input.files[0];

    preview.innerHTML = "";
    result.innerHTML = "";

    if (!file) return;


    const reader = new FileReader();


    reader.onload = function (e) {

        selectedImage = new Image();

        selectedImage.onload = function () {

            const img = document.createElement("img");

            img.src = e.target.result;

            img.style.maxWidth = "300px";
            img.style.maxHeight = "250px";
            img.style.borderRadius = "10px";

            preview.appendChild(img);

        };


        selectedImage.src = e.target.result;

    };


    reader.readAsDataURL(file);

});


// Convert image
function convertImage() {

    if (!input.files[0]) {

        alert("Please select an image first.");

        return;

    }


    if (!selectedImage) {

        alert("Please wait for the image to load.");

        return;

    }


    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");


    canvas.width = selectedImage.width;
    canvas.height = selectedImage.height;


    ctx.drawImage(
        selectedImage,
        0,
        0,
        selectedImage.width,
        selectedImage.height
    );


    const format = formatInput.value;


    const convertedImage =
        canvas.toDataURL(format, 0.9);


    let extension = "jpg";

    if (format === "image/png") {

        extension = "png";

    } else if (format === "image/webp") {

        extension = "webp";

    }


    result.innerHTML = `
        <p>
            Image converted successfully to
            <strong>${extension.toUpperCase()}</strong>.
        </p>
    `;


    const link = document.createElement("a");

    link.download =
        `converted-image.${extension}`;

    link.href = convertedImage;

    link.click();

}