class Mandelbrot {

    constructor(colourMap) {
        this.colourMap = colourMap;
    }

    compute(c,iterations) {

        z = new Complex(0,0);
        k = 0
            
        while (k < iterations) {

            z = Complex.add(Complex.multiply(z,z),c)

            if (z.magnitude() > 2) {
                k = k + 1;
                break;
            }

            k = k + 1;
        }

        if (k < iterations) {
            return k / iterations;
        }

        return 0;
    }

    draw(ctx, width, height, xMin, yMin, xMax, yMax) {

    }

}