export class FichesList {
    constructor() {
        this.id = JSON.parse(localStorage.getItem("re-id")) || 0;
        this.fiches = JSON.parse(localStorage.getItem("re-fiches")) || [];
    }

    addFiche(fiche) {
        this.fiches.push(fiche);
        this.id++;
    }

    delete(id) {
        const index = this.fiches.findIndex((cell) => cell.id === id);
        this.fiches[index].deletedId = true;
    }

    realDelete(id) {
        this.fiches =  this.fiches.filter((fiche) => !(parseInt(fiche.id) === parseInt(id)));
        if(this.fiches.length<=0){
            this.id=0;
        }
    }

    getFiches() {
        return this.fiches;
    }

    getId() {
        return this.id;
    }

    majList(fichesList) {
        this.fiches = fichesList;
    }

   

}