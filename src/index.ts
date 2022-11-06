import { banner } from "./introbanner";
import { Data } from './data.interface';
// import { addCheckBox, addText } from "./inner-html.helper";
var fs = require('fs');
const puppeteer = require('puppeteer')
let args = process.argv
let data = JSON.parse(args[3]);
// console.log(banner);
// let data: Data = {
//     "mode-of-transaction-cash": { type: "checkbox", value: true },
//     "first-name": { type: "text", value: "Rebbapragada" },
//     "middle-name": { type: "text", value: "Sai Surya" },
//     "last-name": { type: "text", value: "Madhav" },
//     "pin-code": { type: "text", value: "575030" },
//     "mobile-number": { type: "text", value: "9686397040" },
//     "mode-of-transaction-cheque": { type: "checkbox", value: false },
//     "mode-of-transaction-card": { type: "checkbox", value: true }
// }
async function generatePdf(data:any, template:string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const html = fs.readFileSync(`./src/html-templates/${template}.html`, 'utf-8');
    page.on('console', async (msg: any) => {
        const msgArgs = msg.args();
        for (let i = 0; i < msgArgs.length; ++i) {
            console.log(await msgArgs[i].jsonValue());
        }
    });
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.emulateMediaType('print');
    await page.waitForSelector("#page-container");
    await page.evaluate((data: Data) => {
        function addText(element:HTMLElement,value:string){
            element.innerHTML = value;
        }
        function addCheckBox(element: HTMLElement,value:boolean){
            element.style.opacity = value?"100%":"0";
        }
        let dom = document.querySelectorAll('.kaldata');
        for (let index = 0; index < dom.length; index++) {
            const element = dom[index];
            if (document.querySelector("#" + element.id)) {
                let qs = document.querySelector("#" + element.id) as HTMLElement;
                const d = data[element.id];
                if(d.type=="text"){
                    addText(qs ,d.value  as string);
                }else if(data[element.id].type=="checkbox"){
                    addCheckBox(qs,d.value as boolean);
                }
            }
        }
    }, data);
    const pdf = await page.pdf({
        path: 'result.pdf',
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });
    await browser.close();
    // return pdf;
    return "Generated PDF"
}

generatePdf(data, "form-60").then(res => { console.log(res), (err: any) => { console.error(err) } });
