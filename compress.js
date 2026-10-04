const input = document.getElementById("compressInput");
const qualityInput = document.getElementById("qualityInput");
const qualityValue = document.getElementById("qualityValue");

const fileInfo = document.getElementById("fileInfo");
const result = document.getElementById("result");


// Convert bytes into KB / MB
function formatSize(bytes) {

    if (bytes < 1024) {
        return bytes + " Bytes";
    }

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}


// Show quality value
qualityInput.addEventListener("input", function () {

    qualityValue.textContent =
        qualityInput.value + "%";

});


// Show original file size
input.addEventListener("change", function () {

    const file = input.files[0];

    result.innerHTML = "";

    if (!file) {
        fileInfo.innerHTML = "";
        return;
    }

    fileInfo.innerHTML = `
        <p>
            <strong>Original Size:</strong>
            ${formatSize(file.size)}
        </p>
    `;

});


// Compress image
function compressImage() {

    const file = input.files[0];

    if (!file) {

        alert("Please select an image first.");

        return;

    }


    const reader = new FileReader();


    reader.onload = function (e) {

        const image = new Image();


        image.onload = function () {

            const canvas = document.createElement("canvas");

            const ctx = canvas.getContext("2d");


            canvas.width = image.width;
            canvas.height = image.height;


            ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.height
            );


            const quality =
                parseInt(qualityInput.value) / 100;


            canvas.toBlob(function (blob) {

                if (!blob) {

                    alert("Compression failed.");

                    return;

                }


                const originalSize = file.size;
                const compressedSize = blob.size;


                const reduction =
                    ((originalSize - compressedSize)
                    / originalSize) * 100;


                result.innerHTML = `
                    
                    <p>
                        <strong>Original Size:</strong>
                        ${formatSize(originalSize)}
                    </p>

                    <p>
                        <strong>Compressed Size:</strong>
                        ${formatSize(compressedSize)}
                    </p>

                    <p>
                        <strong>Size Reduced:</strong>
                        ${Math.max(0, reduction).toFixed(1)}%
                    </p>

                `;


                const link =
                    document.createElement("a");


                link.download =
                    "compressed-image.jpg";


                link.href =
                    URL.createObjectURL(blob);


                link.click();


            }, "image/jpeg", quality);

        };


        image.src = e.target.result;

    };


    reader.readAsDataURL(file);

}