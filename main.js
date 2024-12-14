const generate = document.getElementById("generate");
const seed = document.getElementById("seed");
const width = document.getElementById("width");
const height = document.getElementById("height");
const prompt = document.getElementById("prompt");
const model = document.getElementById("model_select");
const loading = document.getElementById("loading");

generate.addEventListener("click", () => {
    seed.value = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000);
})

fetch('https://image.pollinations.ai/models').then(response => response.json()).then(data => {
    for (let i of data) {
        const option = document.createElement("option");
        option.value = encodeURIComponent(i);
        option.innerText = i;
        document.querySelector("#model_select").appendChild(option);
    }
})

document.getElementById("submit").addEventListener("click", function () {
    loading.classList.remove("hidden");
    const prompt_str = prompt.value;
    const url = `https://pollinations.ai/p/${encodeURIComponent(prompt_str)}?width=${width.value}&height=${height.value}&seed=${seed.value}&model=${model.value}&nologo=true&enhance=true`;
    fetch(url, { mode: 'no-cors' }).then(response => {
        const img = document.querySelector("img");
        document.querySelector("#wrapper-img").href = url;
        img.style.backgroundImage = `url('${url}')`;
        loading.classList.add("hidden");
    })
    console.log(url);
});