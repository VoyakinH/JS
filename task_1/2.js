"use strict"; 
 
let students = { 
    data: [], 
 
    // Функция создания объекта student и добавление его в хранилище.
    create: function(group, studentID, grades) {
        // Проверка на уникальность номера студенческого билета.
        if (this.data.find(item => item.studentID === studentID) !== undefined) {
            console.log("Студент со студенческим билетом №", studentID, "уже присутствует в хранилище.");
            return;
        }

        this.data.push({ 
            "group": group, 
            "studentID": studentID,
            "grades": grades 
        });
    }, 
 
    // Функция вывода информации о студенте по номеру его студенческого билета.
    read: function(studentID) { 
        // Проверка наличия студента с нужным номером студенческого билета в хранилище.
        let student = this.data.find(item => item.studentID === studentID);
        if (student === undefined) {
            console.log("Студент со студенческим билетом №", studentID, "не найден.");
            return;
        }

        return student;
    },

    // Функция модифицирования информации о студенте с введённым номером студ. билета.
    update: function(studentID_old, group, studentID, grades) {
        // Проверка на наличие студента для уделания в хранилище.
        let ind = this.data.findIndex(item => item.studentID === studentID_old);
        if (ind === -1) {
            console.log("Студент со студенческим билетом №", studentID_old, "не найден.");
            return;
        }

        // Проверка на уникальность номера студенческого билета добавляемого студента.
        let student = this.data.find(item => item.studentID === studentID);
        if (student !== undefined & studentID_old !== studentID) {
            console.log("Студент со студенческим билетом №", studentID, "уже присутствует в хранилище.");
            return;
        }

        // Обновление информации о студенте.
        this.data.splice(ind, 1, {"group": group, "studentID": studentID, "grades": grades});
    },

    // Функция удаления информации о студенте по номеру его студенческого билета.
    delete: function(studentID) {
        // Проверка на наличие студента для уделания в хранилище.
        let ind = this.data.findIndex(item => item.studentID === studentID);
        if (ind === -1) {
            console.log("Студент со студенческим билетом №", studentID, "не найден.");
            return;
        }

        // Удаление информации о студенте.
        this.data.splice(ind, 1);
    },

    // Фунция вывода хранилища.
    output: function() {
        console.log("\n---------ХРАНИЛИЩЕ---------");
        for (let i = 0; i < this.data.length; i++) {
            console.log(this.data[i].group, this.data[i].studentID, this.data[i].grades);
        }
        console.log("---------------------------\n");
    },

    // Получение средней оценки заданного студента.
    average_grade: function(studentID) {
        // Проверка наличия информации о студенте в хранилище.
        let ind = this.data.findIndex(item => item.studentID === studentID);
        if (ind === -1) {
            console.log("Студент со студенческим билетом №", studentID, "не найден.");
            return undefined;
        }

        // Проверка наличия оценок у заданного студента.
        let count = this.data[ind].grades.length;
        if (count === 0) {
            console.log("Студент со студенческим билетом №", studentID, "не имеет оценок.");
            return undefined;
        }

        // Подсчёт средней оценки заданного студента.
        let av_gr = 0;
        this.data[ind].grades.forEach(item => av_gr += item);
        return av_gr / count;
    },

    // Получение информации о студентах в заданной группе.
    in_group: function(group) {
        let result = this.data.filter(item => item.group === group);
        if (result.length === 0) {
            console.log("В группе", '"'+group+'"', "нет студентов.");
        }
        return result;
    },

    // Получение студента, у которого наибольшее количество оценок в заданной группе.
    max_grades_num_in_group: function(group) {
        // Фильтр по нужной группе.
        let cur_group = this.data.filter(item => item.group === group);

        // Проверка на наличие студентов в заданной группе.
        if (cur_group.length === 0) {
            console.log("В группе", '"'+group+'"', "нет студентов.");
            return [];
        }

        // Вычисление максимального кол-ва оценок.
        let max_num = 0;
        for (let i = 0; i < cur_group.length; i++) if (cur_group[i].grades.length > max_num) {
            max_num = cur_group[i].grades.length;
        }

        // Фильтр по нужному кол-ву оценок.
        let result = cur_group.filter(item => item.grades.length === max_num);
        return result;
    },

    // Получение студента, у которого нет оценок.
    empty_grades: function() {
        let result = this.data.filter(item => item.grades.length === 0);
        if (result.length === 0) {
            console.log("В хранилище отсутствуют студенты без оценок.");
        }
        return result;
    }
} 

// Create test
console.log("\n--------CREATE TEST--------");
students.create("ИУ7-54Б", 192, [5, 4, 3, 5]); 
students.create("ИУ7-54Б", 391, [5, 5]);
students.create("ИУ7-54Б", 474, [3, 3, 2]);
students.create("ИУ7-51Б", 701, [5, 5, 5, 5]); 
students.create("ИУ7-51Б", 652, []);
students.create("ИУ7-51Б", 918, [2, 3, 2]);
// Negative test
students.create("ИУ7-54Б", 192, []);
students.output();

// Read test
console.log("\n---------READ TEST---------");
console.log(students.read(192));
console.log(students.read(652));
// Negative test
console.log(students.read(111));

// Update test
console.log("\n--------UPDATE TEST--------");
students.update(391, "ИУ7-53Б", 111, [4, 4, 3, 3, 4]);
students.update(918, "ИУ7-51Б", 918, [2, 3, 2, 4]);
// Negative test
students.update(999, "ИУ7-53Б", 888, [4, 3, 3, 3]);
students.update(192, "ИУ7-53Б", 918, [4, 3, 3, 3]);
students.output();

// Delete test
console.log("\n--------DELETE TEST--------");
students.delete(111);
// Negative test
students.delete(999);
students.output();

// Average grade test
console.log("\n----AVERAGE_GRADE TEST-----");
console.log("192: ", students.average_grade(192));
console.log("918: ", students.average_grade(918));
// Negative test
console.log("652: ", students.average_grade(652));
console.log("999: ", students.average_grade(999));

// In_group test
console.log("\n-------IN_GROUP TEST-------");
console.log(students.in_group("ИУ7-54Б"));
// Negative test
console.log(students.in_group("ИУ7-52Б"));

// Max_grades_num_in_group
console.log("\n-MAX_GRADES_NUM_IN_GROUP TEST-");
console.log(students.max_grades_num_in_group("ИУ7-51Б"));
// Negative test
console.log(students.max_grades_num_in_group("ИУ7-55Б"));

// Empty_grades test
console.log("\n-----EMPTY_GRADES TEST-----");
console.log(students.empty_grades());