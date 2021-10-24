const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

iterations = 256;
pixelSize = 32;

xCentre = -0.75
yCentre = 0;

x1 = -3.25;
y1 = 0;

x2 = 1.75;
y2 = 0;

boardStack = [];

stopDrawFlag = false;
isDrawing = false;

fractal = new Mandelbrot();
colourMap = grayscale;

// This function draws the mandelbrot set to the screen. 
function draw(pixelSize, xMin, yMin, xMax, yMax) {

    isDrawing = true;

    if ((Math.log(pixelSize)/Math.log(2) % 1) == 0) {
        pixelSize = Math.pow(2,Math.round(Math.log(pixelSize) / Math.log(2)));
    }

    width = canvas.width / pixelSize;
    height = canvas.height / pixelSize;
    
    xDelta = (xMax - xMin) / width;
    yDelta = (yMax - yMin) / height;

    i = 0;
    n = width;

    interval = setInterval(function() {

        if (stopDrawFlag == true || pixelSize < 0.5) { // Stopping the recursion.
            stopDrawFlag = false;
            isDrawing = false;
            clearInterval(interval);
        } else if (i >= n){ // Going deeper in the recursion.
            clearInterval(interval);
            draw(pixelSize/2, xMin, yMin, xMax, yMax);
        }

        j = 0;
        m = height;

        while (j < m) {

            x = xMin + i*xDelta;
            y = yMax - j*yDelta;

            c = new Complex(x,y);
            value = fractal.compute(c,iterations);

            ctx.fillStyle = colourMap.getColour(value).toString();
            ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);

            j = j + 1;

        }

        i = i + 1;

    },1);

}

// Function to stop the current drawing to canvas.
function stopDraw() {

    // If the draw() function is currently drawing, then raise the stopDrawFlag.
    if (isDrawing == true) {
        stopDrawFlag = true;
    }

}

// Redraw the canvas when it changes size.
window.addEventListener('resize', function() {

    // Wait until the drawing has stopped.
    check = setInterval(function() {

        // Once the drawing has stopped.
        if (isDrawing == false) {

            // Calculate the required coordinates.
            unitsPerPixel = (x2 - x1) / canvas.width;
            y1 = yCentre - unitsPerPixel * canvas.height/2;
            y2 = yCentre + unitsPerPixel * canvas.height/2;

            // Draw the new set to the screen.
            draw(pixelSize,x1,y1,x2,y2);
            clearInterval(check);
        }

    },1);

});

// When loading the page.
window.addEventListener('DOMContentLoaded', function() {

    // Calculate the required x,y coordinates.
    unitsPerPixel = (x2 - x1) / canvas.width;
    y1 = yCentre - unitsPerPixel * canvas.height/2;
    y2 = yCentre + unitsPerPixel * canvas.height/2;

    // Draw the mandelbrot set.
    draw(pixelSize,x1,y1,x2,y2);

});