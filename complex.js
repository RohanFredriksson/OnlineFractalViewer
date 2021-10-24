class Complex {

    constructor(real,complex) {
        this.real = real;
        this.complex = complex;
    }

    static add(z1,z2) {
        return new Complex(z1.real + z2.real,z1.complex + z2.complex);
    }

    static multiply(z1,z2) {
        return new Complex((z1.real * z2.real) - (z1.complex * z2.complex),(z1.real * z2.complex) + (z1.complex * z2.real));
    }

    magnitude() {
        return Math.sqrt(Math.pow(this.real,2) + Math.pow(this.complex,2));
    }

}