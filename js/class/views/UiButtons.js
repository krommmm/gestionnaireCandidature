export class UiButtons {
    constructor() {}

    changeBgButton(e,value=false){
        const container = value? document.querySelector(".aside__tris"): e.target.closest(".aside__tris");
        Array.from(container.children).forEach((btn)=>btn.classList.remove("pressed"));
        !value ? e.target.classList.add("pressed") : document.querySelector(".tris__enCours").classList.add("pressed");
        
    }
}