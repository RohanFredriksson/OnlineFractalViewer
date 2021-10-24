class Colour {

    constructor(r,g,b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toString() {
        return ("#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16)).toUpperCase();
    }

    static parse(hexString) {
        return new Colour(
            parseInt(hexString.substring(1,3),16),
            parseInt(hexString.substring(3,5),16),
            parseInt(hexString.substring(5,7),16)
        );
    }

}

class ColourMap {

    constructor() {
        this.colours = new Map() // A map of colours and positions.
    }

    addColour(pos,colour) {
        this.colours.set(pos,colour);
    }

    // Uses linear interpolation to calculate the colour at a position. 
    // Returns a new Colour obejct with these values.
    getColour(pos) {
        
        // If the position is already a key we don't need to interpolate.
        if (pos in this.colours) {
            return this.colours[pos];
        }

        keys = Object.keys(this.colours);
        x = Math.min(keys); // Largest key smaller than pos.
        y = Math.max(keys); // Smallest key larger than pos.

        keys.forEach(key => {
            if (key < pos && key > x) {
                x = key;
            } 
            else if (key > pos && key < y) {
                y = key;
            }
        });

        xColour = this.colours.get(x);
        yColour = this.colours.get(y);

        rGradient = (yColour.r - xColour.r) / (x - y);
        gGradient = (yColour.g - xColour.g) / (x - y);
        bGradient = (yColour.b - xColour.b) / (x - y);

        rNew = xColour.r + rGradient * (pos - x);
        gNew = xColour.g + gGradient * (pos - x);
        bNew = xColour.b + bGradient * (pos - x);

        return new Colour(rNew,gNew,bNew);

    }

}