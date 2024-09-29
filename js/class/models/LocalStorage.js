export class LocalStorage {
    constructor() {

    }

    saveFiches(fiches) {
        localStorage.setItem("re-fiches", JSON.stringify(fiches));
    }

    saveId(id) {
        localStorage.setItem("re-id", JSON.stringify(id));
    }


}