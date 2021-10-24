class Mandelbrot {

    compute(c,iterations) {

        var z = new Complex(0,0);
        var k = 0;
            
        while (k < iterations) {

            z = Complex.add(Complex.multiply(z,z),c);

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

}