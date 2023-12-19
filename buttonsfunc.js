var rotpos = 0;
var direction = 1;

const productInfo = [
    {title: "Vanilla Eclair", desc: "The Original Vanilla"},
    {title: "Cream filled Eclair", desc: "The Cooler Vanilla Eclair"},
    {title: "Cheesy Eclair", desc: "Indistinguishable from Vanilla? We'll put a different colored sticker on it!"},
    {title: "Almond Croissant", desc: "Quaso? Kruasant? Wha? Forget it! Just know that it's delicious!"}
]

function changeText(which){
    index = which;

    if(index < 0) index = 4 - ((index * -1) % 4);
    if(index > 3) index = index % 4;

    document.getElementById("product-title").innerText = productInfo[index].title;
    document.getElementById("product-description").innerText = productInfo[index].desc;
}

// Function untuk button, ini ubah innertext
function htmlprev(){
    rotpos--;
    direction = 0;

    changeText(rotpos);
}

function htmlnext(){
    rotpos++;
    direction = 1;

    changeText(rotpos);
}