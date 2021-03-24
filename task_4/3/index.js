"use strict"

const fs = require("fs");
const rl = require("readline-sync")

if (fs.existsSync("template.html")) {
    let temp = fs.readFileSync("template.html", "utf8");
    const act = rl.question("Введите адрес запроса: ");
    temp = temp.replace(/\$action/gi, act.toString());
    const num = rl.question("Введите кол-во названий полей: ");
    let fb = "";
    for (let i = 0; i < parseInt(num.toString()); i++) {
        let name = rl.question("Поле №" + (i + 1) + ": ");
        fb +=  "<p>\n\t\t<label>\n\t\t\t<span>" + name + "</span> <br>\n\t\t\t<input name=\"" + name + "\" type=\"text\" " +
            "spellcheck=\"false\" autocomplete=\"off\">\n\t\t</label>\n\t</p>\n\t<br>\n\t";
    }
    temp = temp.replace("$form_body", fb);
    fs.writeFileSync("form.html", temp);
}
else {
    console.log("Нет шаблона html");
}