export class Modal {
    constructor() {

    }

    submitForm() {
        const $formEl = document.querySelector("form");
        const formData = new FormData($formEl);

        const name = formData.get("name");
        const contract = formData.get("contrat");
        const ville = formData.get("ville");
        const durée = formData.get("durée");
        const salaire = formData.get("salaire");
        const experience = formData.get("experience");
        const techno = formData.get("techno");
        let isPost = formData.get("isPost");
        let isCalled = formData.get("isCalled");
        const description = formData.get("description");
        const url = formData.get("url-Offer")

        isPost = isPost === "on" ? true : false;
        isCalled = isCalled === "on" ? true : false;

        document.querySelectorAll("input", "select").forEach((input) => input.value = "");
        this.close();
        const date = new Date().getTime();
        return {
            url: url, date: date, name: name, contract: contract, ville: ville, durée: durée, salaire: salaire, experience: experience, techno: techno, isPost: isPost, isCalled: isCalled, description: description
        }

    }

    open() {
        document.querySelector(".modalFiche").style.display = "flex";
    }

    close() {
        document.querySelector(".modalFiche").style.display = "none";
    }
}