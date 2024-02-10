import { readFileSync, writeFileSync } from "fs";

const content = readFileSync("./source.css", "utf-8");

// Replace all ': hsl(' with nothing
let newContent = content.replace(/: hsl\(/g, ": ");

// Replace all '%);' with nothing '%;'
newContent = newContent.replace(/%\);/g, "%;");

console.log(newContent);

writeFileSync("./styles/globals.css", newContent, "utf-8");
