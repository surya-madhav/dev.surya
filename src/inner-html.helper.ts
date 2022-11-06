export function addText(element:HTMLElement,value:string){
    element.innerHTML = value;
}
export function addCheckBox(element: HTMLElement,value:boolean){
    element.style.opacity = value?"100%":"0";
}