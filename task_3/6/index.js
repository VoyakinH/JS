"use strict"

let obj = {
    0: undefined
};

let vloj = 0;
while (true) {
    let new_obj = {};
    try {
        JSON.stringify(obj);
    } catch(err) {
        console.log(vloj);
        break;
    }
    vloj++;
    new_obj[vloj] = obj;
    obj = new_obj;
}