"use strict"

class point {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    output() {
        console.log('(' + this.a + ' ; ' + this.b + ')');
    }
}

class line_segment {
    constructor(a1, b1, a2, b2) {
        this.from = new point(a1, b1);
        this.to = new point(a2, b2);
    }

    output() {
        console.log('(' + this.from.a + ' ; ' + this.from.b + ') ' + '(' + this.to.a + ' ; ' + this.to.b + ')');
    }

    len() {
        let val = Math.sqrt(Math.pow(this.from.a - this.to.a, 2) + Math.pow(this.from.b - this.to.b, 2));
        return val;
    }
}

let line = new line_segment(0, 0, 5, 3);
line.output();
console.log(line.len());