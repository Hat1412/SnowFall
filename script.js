SIZE_X = 500
SIZE_Y = 500
clicked = false
l = []

var slider = document.getElementById("snow");
var element = document.getElementById("placeholder");
var output = document.getElementById("output");
var preview = document.getElementById("prev");
var c = document.getElementById("snow_color");

function getOffset(el, cnv) {
    const rect = el.getBoundingClientRect();
    x = rect.left + window.scrollX;
    y = rect.top + window.scrollY;

    ele = document.getElementById("placeholder")
    ele.width = SIZE_X
    ele.height = SIZE_Y

    cnv.position(x, y)

}

function setup() {
    cnv = createCanvas(SIZE_X, SIZE_Y)
    console.log(c.value)
    c.value = "#ffffff"
    background(0)
    stroke(255)
    noFill()
    for (var i = 0; i < 100; i++) {
        a = new Snow(random(10, SIZE_X - 20), random(-15, SIZE_Y), random(5, 10), random(1, 8))
        l.push(a)
    }
}

function loadFile(event) {
    res = URL.createObjectURL(event.target.files[0]);
    if (event.target.files[0].size < 10 * 1024 * 1024){
    if (document.contains(preview)) { preview.remove() };

    output.src = res
    img = loadImage(res)
    resizeCanvas(this.width, this.height);

    num = map(width, 100, 1000, 0, 500)
    snow.value = num

    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
    }else{
        alert("File Too Large File Limit: 10 MB")
    }
};

function hex_to_rgb(hex){
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return [r, g, b]
}

function func() {
    clicked = true
    SIZE_X = img.width
    SIZE_Y = img.height
    resizeCanvas(img.width, img.height)
    getOffset(element, cnv)
}

function draw() {
    getOffset(element, cnv)
    background(0);

    if (clicked) { image(img, 0, 0) }

    for (a in l.slice(1, snow.value)) {

        l[a].draw()
        l[a].fall()
    }
}


class Snow {
    constructor(x, y, r, vel) {
        this.x = x
        this.y = y
        this.r = r
        this.vel = vel
    }

    draw() {

        const r = hex_to_rgb(c.value)[0]
        const g = hex_to_rgb(c.value)[1]
        const b = hex_to_rgb(c.value)[2]

        stroke(r, g, b, map(this.y, -15, SIZE_Y - 5, 255, 0))
        fill(r, g, b, map(this.y, -15, SIZE_Y - 5, 255, 0))

        if (this.x >= SIZE_X || this.y >= SIZE_Y) {
            this.x = random(10, SIZE_X - 20)
            this.y = random(-15, 10)
        }
        if (this.y >= 15 && this.y <= SIZE_Y - 5) {
            ellipse(this.x, this.y, this.r)
        }
    }

    fall() {
        this.y += this.vel / 2;
    }

}