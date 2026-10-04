async function convertPDF() {

    const input = document.getElementById("pdfInput");
    const file = input.files[0];

    if (!file) {
        alert("Please select a PDF file.");
        return;
    }

    const output = document.getElementById("output");
    output.innerHTML = "";

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {

        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({
            scale: 2
        });

        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        const image = document.createElement("img");

        image.src = canvas.toDataURL("image/jpeg", 0.9);

        image.style.width = "300px";
        image.style.margin = "10px";

        output.appendChild(image);

        const downloadButton = document.createElement("a");

        downloadButton.href = image.src;
        downloadButton.download = `page-${pageNumber}.jpg`;

        downloadButton.textContent = `Download Page ${pageNumber}`;

        downloadButton.style.display = "block";
        downloadButton.style.marginBottom = "20px";

        output.appendChild(downloadButton);
    }
}