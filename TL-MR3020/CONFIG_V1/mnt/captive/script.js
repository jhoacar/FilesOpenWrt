const getConfiguration = async function () {
    try {
        const response = await fetch("config.txt");
        if (!response.ok) return {};
        const configuration = await response.json();
        return configuration;
    }
    catch(error){
        return {};
    }
}

const showImages = async function () {
    let numImage = 1;
    const configuration = await getConfiguration();
    const { folder, name, extension } = configuration;
    while (folder && name && extension) {
        const response = await fetch(folder + "/" + name + numImage + extension);
        if (!response.ok) break;
        const dataImage = await response.blob();
        if (!dataImage || !dataImage.type.includes("image")) break;
        const objectURL = URL.createObjectURL(dataImage);
        const image = document.createElement("img");
        image.setAttribute("src", objectURL);
        document.getElementById("images").appendChild(image)
        numImage++;
    }
}

window.onload = showImages;