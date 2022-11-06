var fs = require('fs');
import * as puppeteer from "puppeteer";
let args = process.argv
console.log("---- Reading definitions from vocabulary.com -----");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let words = ["befuddleds", "acumen"];
    let result = [];
    for (let index = 0; index < words.length; index++) {
        const element = words[index];
        const res = await getWordData(element);
        result.push(res);
    }
    await browser.close();
    console.log(result);

    async function getWordData(word) {
        await page.goto(`https://www.vocabulary.com/dictionary/${word}`);
        await page.waitForSelector(".definitionsContainer");
        const res = await page.evaluate(() => {
            // Find word
            let word = document.querySelector("#hdr-word-area").textContent;
            word = word.slice(word.indexOf("\n\t\t\t\t\t") + 6, word.indexOf("\n\t\t\t\t\t\n\t\t\t\t\t"));
            let shortDef = document.querySelector(".short").textContent;
            let longDef = document.querySelector(".long").textContent;
            let definitions = [];
            let def_nodes = document.querySelector(".definitionsContainer").querySelector("ol").querySelectorAll("li");
            def_nodes.forEach(node => {
                const grammer_node = node.querySelector(".pos-icon");
                const grammer = node.querySelector(".pos-icon").textContent;
                let def = node.innerText;
                definitions.push({ grammer, def });

            });
            return {
                "word": word,
                "shortDef": shortDef,
                "longDef": longDef,
                "definitions": definitions
            };
        });
        return res;
    }
})()