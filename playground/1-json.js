const fs = require("fs");

const buffer = fs.readFileSync("1-json.json");
const dataJSON = buffer.toString();
const user = JSON.parse(dataJSON);
console.log(user.name);
