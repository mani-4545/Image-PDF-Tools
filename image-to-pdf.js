const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");


// Show image preview
input.addEventListener("change", function () {

    preview.innerHTML = "";

    const files = input.files;

    if (files.length === 0) {
        return;
    }

    for (let i = 0; i < files.length; i++) {

        const imageURL = URL.createObjectURL(files[i]);

        const img = document.createElement("img");

        img.src = imageURL;

        img.style.width = "150px";
        img.style.height = "150px";
        img.style.objectFit = "cover";
        img.style.margin = "10px";
        img.style.borderRadius = "10px";

        preview.appendChild(img);
    }

});


// Convert images to PDF
async function createPDF() {

    const files = input.files;

    if (files.length === 0) {

        alert("Please select at least one image.");

        return;
    }


    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();


    for (let i = 0; i < files.length; i++) {

        const file = files[i];

        const imageURL = URL.createObjectURL(file);

        const img = new Image();

        img.src = imageURL;


        await new Promise((resolve) => {

            img.onload = resolve;

        });


        const imgWidth = 190;

        const imgHeight =
            (img.height * imgWidth) / img.width;


        if (i > 0) {

            pdf.addPage();

        }


        pdf.addImage(
            img,
            "JPEG",
            10,
            10,
            imgWidth,
            imgHeight
        );


        URL.revokeObjectURL(imageURL);

    }


    pdf.save("converted-images.pdf");

}