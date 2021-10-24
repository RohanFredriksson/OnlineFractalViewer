class Colour {

    constructor(r,g,b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toString() {
        return ("#" + Math.floor(this.r).toString(16) + Math.floor(this.g).toString(16) + Math.floor(this.b).toString(16)).toUpperCase();
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
        
        // If the map is empty just return 0.
        if (this.colours.size() == 0) {
            return 0;
        }

        // If the position is already a key we don't need to interpolate.
        if (pos in this.colours) {
            return this.colours[pos];
        }

        var keys =[ ...this.colours.keys() ];

        // If the map only contains one colour return that colour.
        if (keys.length == 1) {
            return this.colours.get(keys[0]);
        }

        var x = keys[0]; // Largest key less than pos.
        var y = keys[keys.length - 1]; // Smallest key greater than pos.

        keys.forEach(key => {
            if (key < x) {
                x = key;
            } else if (key > y) {
                y = key;
            }
        });

        keys.forEach(key => {
            if (key < pos && key > x) {
                x = key;
            } 
            else if (key > pos && key < y) {
                y = key;
            }
        });

        var xColour = this.colours.get(x);
        var yColour = this.colours.get(y);

        var rGradient = (yColour.r - xColour.r) / (y - x);
        var gGradient = (yColour.g - xColour.g) / (y - x);
        var bGradient = (yColour.b - xColour.b) / (y - x);

        var rNew = xColour.r + rGradient * (pos - x);
        var gNew = xColour.g + gGradient * (pos - x);
        var bNew = xColour.b + bGradient * (pos - x);

        return new Colour(rNew,gNew,bNew);

    }

}