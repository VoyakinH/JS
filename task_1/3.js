"use strict"; 
 
let nodes = { 
    data: [], 
 
    // Функция создания объекта node и добавление его в хранилище.
    create: function(name, x, y) {
        // Проверка на уникальность имени точки.
        if (this.data.find(item => item.name === name) !== undefined) {
            console.log("Точка с именем", '"'+name+'"' , "уже присутствует в хранилище.");
            return;
        }

        this.data.push({ 
            "name": name, 
            "x": x,
            "y": y 
        });
    }, 
 
    // Функция вывода информации о точке по её имени.
    read: function(name) { 
        // Проверка наличия точки с нужным именем в хранилище.
        let node = this.data.find(item => item.name === name);
        if (node === undefined) {
            console.log("Точка с именем", '"'+name+'"', "не найдена.");
            return;
        }

        return node;
    },

    // Функция модифицирования информации о точке с нужным именем.
    update: function(name_old, name, x, y) {
        // Проверка на наличие точки для уделания в хранилище.
        let ind = this.data.findIndex(item => item.name === name_old);
        if (ind === -1) {
            console.log("Точка с названием", '"'+name_old+'"', "не найдена.");
            return;
        }

        // Проверка на уникальность имени добавляемой точки.
        let node = this.data.find(item => item.name === name);
        if (node !== undefined & name_old !== name) {
            console.log("Точка на именем", '"'+name+'"', "уже присутствует в хранилище.");
            return;
        }

        // Обновление информации о точке.
        this.data.splice(ind, 1, {"name": name, "x": x, "y": y});
    },

    // Функция удаления информации о точке по её имени.
    delete: function(name) {
        // Проверка на наличие точки для уделания в хранилище.
        let ind = this.data.findIndex(item => item.name === name);
        if (ind === -1) {
            console.log("Точка с именем", '"'+name+'"', "не найдена.");
            return;
        }

        // Удаление информации о точке.
        this.data.splice(ind, 1);
    },

    // Фунция вывода хранилища.
    output: function() {
        console.log("\n---------ХРАНИЛИЩЕ---------");
        for (let i = 0; i < this.data.length; i++) {
            console.log(this.data[i].name, this.data[i].x, this.data[i].y);
        }
        console.log("---------------------------\n");
    },

    // Получение двух точек, между которыми наибольшее расстояние
    max_distance: function() {
        if (this.data.length < 2) {
            console.log("Недостаточно точек определения расстояния.");
            return undefined;
        }
        let max_dis = 0;
        let i_buff = 0;
        let j_buff = 0;
        for (let i = 0; i < this.data.length - 1; i++) {
            let xi = this.data[i].x;
            let yi = this.data[i].y;
            for (let j = i + 1; j < this.data.length; j++) {
                let xj = this.data[j].x;
                let yj = this.data[j].y;
                let dis = Math.pow(Math.pow(xi - xj, 2) + Math.pow(yi - yj, 2), 1/2);
                if(dis > max_dis) {
                    i_buff = i;
                    j_buff = j;
                    max_dis = dis;
                }
            }
        }
        return([this.data[i_buff], this.data[j_buff]]);
    },

    // Получение точек, находящихся от заданной точки на расстоянии, не превышающем заданную константу.
    in_range: function(x, y, dis) {
        let result = [];
        for (let i = 0; i < this.data.length; i++) {
            let xi = this.data[i].x;
            let yi = this.data[i].y;
            if (Math.pow(Math.pow(xi - x, 2) + Math.pow(yi - y, 2), 1/2) <= dis) {
                result.push(this.data[i]);
            }
        }
        return result;
    },

    // Получение точек, находящихся правее заданной оси координат.
    x_r: function(x) {
        return(this.data.filter(item => item.x > x));
    },

    // Получение точек, находящихся левее заданной оси координат.
    x_l: function(x) {
        return(this.data.filter(item => item.x < x));
    },

    // Получение точек, находящихся выше заданной оси координат.
    y_u: function(y) {
        return(this.data.filter(item => item.y > y));
    },

    // Получение точек, находящихся ниже заданной оси координат.
    y_d: function(y) {
        return(this.data.filter(item => item.y < y));
    },

    // Получение точек, входящих внутрь заданной прямоугольной зоны.
    in_rect: function(x1, y1, x2, y2) {
        let x11 = Math.min(x1, x2);
        let x22 = Math.max(x1, x2);
        let y11 = Math.min(y1, y2);
        let y22 = Math.max(y1, y2);
        return(this.data.filter(item => item.x > x11 & item.y > y11 & item.x < x22 & item.y < y22));
    }
} 

// Create test
console.log("\n--------CREATE TEST--------");
nodes.create("A", 0, 0); 
nodes.create("B", 4, 4);
nodes.create("C", 0, 4);
nodes.create("D", -4, -4); 
nodes.create("E", 0, -4);
// Negative test
nodes.create("C", 0, 0);
nodes.output();

// Read test
console.log("\n---------READ TEST---------");
console.log(nodes.read("A"));
console.log(nodes.read("D"));
// Negative test
console.log(nodes.read("F"));

// Update test
console.log("\n--------UPDATE TEST--------");
nodes.update("A", "A", 0, -1);
// Negative test
nodes.update("F", "G", 0, 0);
nodes.update("A", "B", 0, 0);
nodes.output();

// Delete test
console.log("\n--------DELETE TEST--------");
nodes.delete("A");
// Negative test
nodes.delete("F");
nodes.output();

// Max_distance test
console.log("\n-----MAX_DISTANCE TEST-----");
console.log(nodes.max_distance());

// In_range test
console.log("\n-------IN_RANGE TEST-------");
console.log(nodes.in_range(0, 0, 4));

// X_r test
console.log("\n---------X_R TEST----------");
console.log(nodes.x_r(2));

// X_l test
console.log("\n---------X_L TEST----------");
console.log(nodes.x_l(2));

// Y_u test
console.log("\n---------Y_U TEST----------");
console.log(nodes.y_u(2));

// Y_d test
console.log("\n---------Y_D TEST----------");
console.log(nodes.y_d(5));

// In_rect test
console.log("\n-------IN_RECT TEST--------");
console.log(nodes.in_rect(-1, 2, 5, 5));
console.log(nodes.in_rect(1, 0, -5, -5));