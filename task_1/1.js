"use strict"; 
 
let children = { 
    data: [], 
 
    // Функция создания объекта child и добавление его в хранилище.
    create: function(surname, age) {
        // Проверка на корректность введённого возраста.
        if (age <= 0) {
            console.log("Возраст должен быть положильным целым числом");
            return;
        }

        // Проверка на уникальность фамилии.
        if (this.data.find(item => item.surname.toLowerCase() === surname.toLowerCase()) !== undefined) {
            console.log("Ребёнок с фамилией", '"'+surname+'"', "уже присутствует в хранилище.");
            return;
        }

        this.data.push({ 
            "surname": surname, 
            "age": age 
        });
    }, 
 
    // Функция вывода возраста ребенка по фамилии.
    read: function(surname) { 
        // Проверка наличия ребенка с необходимой фамилией в хранилище.
        let child = this.data.find(item => item.surname.toLowerCase() === surname.toLowerCase());
        if (child === undefined) {
            console.log("Ребёнок с фамилией", '"'+surname+'"', "не найден.");
            return;
        }

        return(child);
    },

    // Функция модифицирования информации о ребёнке с введённой фамилией.
    update: function(surname_old, surname, age) {
        // Проверка на наличие ребенка для уделания в хранилище.
        let ind = this.data.findIndex(item => item.surname.toLowerCase() === surname_old.toLowerCase());
        if (ind === -1) {
            console.log("Ребенок с фамилией", '"'+surname_old+'"', "не найден.");
            return;
        }

        // Проверка на уникальность фамилии добавляемого ребёнка.
        let child = this.data.find(item => item.surname.toLowerCase() === surname.toLowerCase());
        if (child !== undefined && surname_old.toLowerCase() !== surname.toLowerCase()) {
            console.log("Ребенок с фамилией", '"'+surname+'"', "уже присутствует в хранилище.")
            return;
        }

        // Обновление информации о ребёнке.
        this.data.splice(ind, 1, {"surname": surname, "age": age });
    },

    // Функция удаления информации о ребёнке по его фамилии.
    delete: function(surname) {
        // Проверка на наличие ребенка для уделания в хранилище.
        let ind = this.data.findIndex(item => item.surname.toLowerCase() === surname.toLowerCase());
        if (ind === -1) {
            console.log("Ребенок с фамилией", '"'+surname+'"', "не найден.");
            return;
        }

        // Удаление информации о ребёнке.
        this.data.splice(ind, 1);
    },

    // Фунция вывода хранилища.
    output: function() {
        console.log("\n---------ХРАНИЛИЩЕ---------");
        for (let i = 0; i < this.data.length; i++) {
            console.log(this.data[i].surname, this.data[i].age);
        }
        console.log("---------------------------");
    },

    // Получение среднего возраста детей.
    average_age: function() {
        // Проверка на наличие информации о детях в хранилище.
        if (this.data.length === 0) {
            console.log("Пустое хранилище информации о детях.");
            return undefined;
        }

        // Подсчёт среднего возрасте детей в хранилище.
        let sum = 0;
        for (let i = 0; i < this.data.length; i++) {
            sum += this.data[i].age;
        }
        sum /= this.data.length;
        return sum;
    },

    // Получение информации о самом старшем ребёнке.
    find_oldest: function() {
        // Проверка на наличие информации о детях в хранилище.
        if (this.data.length === 0) {
            console.log("Пустое хранилище информации о детях.");
            return undefined;
        }

        // Нахождение максимального возраста детей в хранилище.
        let max_age = 0;
        for (let i = 0; i < this.data.length; i++) if (this.data[i].age > max_age){
            max_age = this.data[i].age;
        }

        // Нахождение всех детей с максимальным возрастом из хранилища.
        return this.data.filter(item => item.age === max_age);
    },

    // Получение информации о детях, возраст которых входит в заданный отрезок.
    in_age_range: function(from, to) {
        // Проверка на наличие информации о детях в хранилище.
        if (this.data.length === 0) {
            console.log("Пустое хранилище информации о детях.");
            return undefined;
        }

        // Фильтрация.
        return this.data.filter(item => item.age >= from & item.age <= to);
    },

    // Получение информации о детях, фамилия которых начинается с заданной буквы.
    starts_with_letter: function(letter) {
        // Проверка на наличие информации о детях в хранилище.
        if (this.data.length === 0) {
            console.log("Пустое хранилище информации о детях.");
            return undefined;
        }

        // Фильтрация.
        return this.data.filter(item => item.surname[0].toLowerCase() === letter.toLowerCase());
    },

    // Получение информации о детях, фамилия которых длиннее заданного количества символов.
    sur_longer_then_num: function(num) {
        // Проверка на наличие информации о детях в хранилище.
        if (this.data.length === 0) {
            console.log("Пустое хранилище информации о детях.");
            return undefined;
        }

        // Фильтрация.
        return this.data.filter(item => item.surname.length > num);
    },

    // Получение информации о детях, фамилия которых начинается с гласной буквы.
    sur_starts_with_vowel(){
        // Проверка на наличие информации о детях в хранилище.
        if (this.data.length === 0) {
            console.log("Пустое хранилище информации о детях.");
            return undefined;
        }

        // Фильтрация.
        let vowels = "aeiouyаеёиоуыэюя";
        return this.data.filter(item => vowels.search(item.surname[0].toLowerCase()) !== -1);
    }
} 

// Create test
console.log("\n--------CREATE TEST--------");
children.create("Воякин", 10); 
children.create("Пиксаев", 11);
children.create("Вильданов", 6);
children.create("Дорогова", 13); 
children.create("Капичникова", 1);
children.create("Сорокина", 16);
// Negative test
children.create("пиксаев", 12);
children.output();

// Read test
console.log("\n---------READ TEST---------");
console.log(children.read("Воякин"));
// Negative test
console.log(children.read("Дорогова"));

// Update test
console.log("\n--------UPDATE TEST--------");
children.update("Вильданов", "Попов", 3);
children.update("Воякин", "Воякин", 12);
// Negative test
children.update("Пиксаев", "Воякин", 12);
children.update("Тюрин", "Попов", 13);
children.output();

// Delete test
console.log("\n--------DELETE TEST--------");
children.delete("Попов");
// Negative test
children.delete("Вильданов");
children.output();

// Average age test
console.log("\n------AVERAGE_AGE TEST-----");
console.log("Средний возраст детей в хранилище: ", children.average_age());

// Find oldest child test
console.log("\n------FIND_OLDEST TEST-----");
console.log(children.find_oldest());

// In age range test
console.log("\n---------IN_AGE TEST-------");
console.log(children.in_age_range(10, 11));

// Surname starts from current letter test
console.log("\n--STARTS_WITH_LETTER TEST--");
console.log(children.starts_with_letter('в'));

// Surname longer then number
console.log("\n----LONGER_THEN_NUM TEST---");
console.log(children.sur_longer_then_num(7));

// Surname starts with vowel
console.log("\n---STARTS_WITH_VOWEL TEST--");
children.create("Орехов", 3);
console.log(children.sur_starts_with_vowel());



