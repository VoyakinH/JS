"use strict"

class triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    is_valid() {
        return this.a < this.b + this.c && this.b < this.a + this.c && this.c < this.a + this.b;

    }

    perimeter() {
        if (this.is_valid()) {
            return (this.a + this.b + this.c);
        }
        return undefined;
    }

    square() {
        if (this.is_valid()) {
            let p = this.perimeter() / 2;
            return (Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c)));
        }
        return undefined;
    }

    is_right() {
        if (this.is_valid()) {
            let hyp = Math.max(this.a, this.b, this.c);
            let kh_min = Math.min(this.a, this.b, this.c);
            let kh_sr = this.perimeter() - hyp - kh_min;
            if (Math.pow(hyp, 2) === Math.pow(kh_min, 2) + Math.pow(kh_sr, 2)) {
                return true;
            }
        }
        return false;
    }
}

console.log("\nНесуществующий треугольник. Стороны 4, 2, 2.")
let tr = new triangle(4, 2, 2);
console.log("Существует: ", tr.is_valid());
console.log("Периметр: ", tr.perimeter());
console.log("Площадь: ", tr.square());
console.log("Прямоугольный: ", tr.is_right());

console.log("\nНепрямоугольный треугольник. Стороны 2, 2, 2.")
tr = new triangle(2, 2, 2);
console.log("Существует: ", tr.is_valid());
console.log("Периметр: ", tr.perimeter());
console.log("Площадь: ", tr.square());
console.log("Прямоугольный: ", tr.is_right());

console.log("\nПрямоугольный треугольник треугольник. Стороны 6, 8, 10.")
tr = new triangle(6, 8, 10);
console.log("Существует: ", tr.is_valid());
console.log("Периметр: ", tr.perimeter());
console.log("Площадь: ", tr.square());
console.log("Прямоугольный: ", tr.is_right());