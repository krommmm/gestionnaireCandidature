export class HomeCtrl {
    constructor(modal, fiche, fichesList, uiFiches, uiButtons, localStorage) {
        this.modal = modal;
        this.fiche = fiche;
        this.fichesList = fichesList;
        this.uiFiches = uiFiches;
        this.uiButtons = uiButtons;
        this.localStorage = localStorage;
        this.pokemons = [];
        this.init();
    }

    async init() {
        this.bindEvents();
        this.pokemons = await this.getPokemons();
        const fichesEnCours = this.fichesList.getFiches().filter((cell) => !cell.deletedId);
        this.uiFiches.displayFiches(this.pokemons, fichesEnCours);
        this.uiButtons.changeBgButton(null,true);
    }

    bindEvents() {
        document.addEventListener("click", this.handleClick.bind(this));
        document.addEventListener("submit", this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        const ficheEnPreparation = this.modal.submitForm();
        const names = this.fichesList.getFiches().map((cell) => cell.name);
        const cleanedNames = names.map((cell) => (cell).toLowerCase().replace(" ", ""));
        if (cleanedNames.includes(ficheEnPreparation.name.toLowerCase().replace(" ", ""))) {
            if (!confirm("Cette entreprise est déjà enregistrée, voullez-vous tout de même l'ajouter ? ")) {
                return;
            }
        }
        // if ficheEnPreparation.name 
        const fiche = this.fiche.create(this.fichesList.getId(), ficheEnPreparation, this.fichesList.getFiches());
        this.fichesList.addFiche(fiche);
        const generalId = this.fichesList.getId();
        this.localStorage.saveFiches(this.fichesList.getFiches());
        this.localStorage.saveId(generalId);
        const fiches = this.fichesList.getFiches();
        this.uiFiches.displayFiches(this.pokemons, fiches);
    }

    handleClick(e) {
        if (e.target.classList.contains("addFiche")) {
            this.modal.open();
        } else if (e.target.classList.contains("leaveModal")) {
            this.modal.close();
        } else if (e.target.classList.contains("deleteFiche")) {
            if (!confirm("Etes-vous sur de vouloir classer cette fiche parmis les refusés? ")) {
                return;
            }
            const id = e.target.closest(".main__fiche").dataset.id;
            this.fichesList.delete(parseInt(id));
            const generalId = this.fichesList.getId();
            this.localStorage.saveFiches(this.fichesList.getFiches());
            this.localStorage.saveId(generalId);
            this.uiFiches.displayFiche(this.pokemons, parseInt(id), this.fichesList.getFiches())
            this.uiFiches.displayFiches(this.pokemons, this.fichesList.getFiches());
        } else if (e.target.classList.contains("supprFicheBtn")) {
            if (!confirm("Etes-vous sur de vouloir supprimer définitivement cette fiche ? ")) {
                return;
            }
            const id = e.target.closest(".main__fiche").dataset.id;
            this.fichesList.realDelete(id);
            const generalId = this.fichesList.getId();
            this.localStorage.saveFiches(this.fichesList.getFiches());
            this.localStorage.saveId(generalId);
            this.uiFiches.displayFiches(this.pokemons, this.fichesList.getFiches());
            if (this.fichesList.getFiches().length > 0) {
                const newId = this.fichesList.getFiches()[0].id;
                this.uiFiches.displayFiche(this.pokemons, parseInt(newId), this.fichesList.getFiches());
            } else {
                document.querySelector("main").innerHTML = `<h1 class="titrePresentation">Bienvenue sur votre gestionnaire de candidatures</h1>`;
            }

        } else if (e.target.classList.contains("myFiches")) {
            const id = e.target.closest(".aside__fiches_fiche").dataset.id;
            this.uiFiches.displayFiche(this.pokemons, parseInt(id), this.fichesList.getFiches());
        } else if (e.target.classList.contains("tris__enCours")) {
            const fichesEnCours = this.fichesList.getFiches().filter((cell) => !cell.deletedId);
            this.uiFiches.displayFiches(this.pokemons, fichesEnCours);
        } else if (e.target.classList.contains("tris__toutes")) {
            this.uiFiches.displayFiches(this.pokemons, this.fichesList.getFiches());
            this.uiButtons.changeBgButton(e);
        } else if (e.target.classList.contains("tris__contrat")) {
            const fichesEnCours = this.fichesList.getFiches().filter((cell) => !cell.deletedId);
            this.uiFiches.displayFiches(this.pokemons, fichesEnCours, "contrat");
            this.uiButtons.changeBgButton(e);
        } else if (e.target.classList.contains("tris__experience")) {
            const fichesEnCours = this.fichesList.getFiches().filter((cell) => !cell.deletedId);
            this.uiFiches.displayFiches(this.pokemons, fichesEnCours, "experience");
            this.uiButtons.changeBgButton(e);
        } else if (e.target.classList.contains("tris__ville")) {
            const fichesEnCours = this.fichesList.getFiches().filter((cell) => !cell.deletedId);
            this.uiFiches.displayFiches(this.pokemons, fichesEnCours, "ville");
            this.uiButtons.changeBgButton(e);
        } else if (e.target.classList.contains("tris__posted")) {
            const fichesEnCours = this.fichesList.getFiches().filter((cell) => cell.isPost && !cell.deletedId);
            this.uiFiches.displayFiches(this.pokemons, fichesEnCours);
            this.uiButtons.changeBgButton(e);
        } else if (e.target.classList.contains("tris__called")) {
            const fichesEnCours = this.fichesList.getFiches().filter((cell) => cell.isCalled && !cell.deletedId);
            this.uiFiches.displayFiches(this.pokemons, fichesEnCours);
            this.uiButtons.changeBgButton(e);
        } else if (e.target.classList.contains("tris__deleted")) {
            const fichesEnCours = this.fichesList.getFiches().filter((cell) => cell.deletedId);
            this.uiFiches.displayFiches(this.pokemons, fichesEnCours);
            this.uiButtons.changeBgButton(e);
        } else if (e.target.classList.contains("header_search__searchBtn")) {
            const potentialFiches = this.getFiche(e);
            this.uiFiches.displayFiches(this.pokemons, potentialFiches);
        } else if (e.target.classList.contains("isPosted")) {
            const fiches = this.uiFiches.toggleIsPosted(e, this.fichesList.getFiches());
            this.fichesList.majList(fiches);
            const generalId = this.fichesList.getId();
            this.localStorage.saveFiches(this.fichesList.getFiches());
            this.localStorage.saveId(generalId);
            const id = e.target.closest(".main__fiche").dataset.id;
            this.uiFiches.displayFiche(this.pokemons, parseInt(id), fiches)
        } else if (e.target.classList.contains("isCalled")) {
            const fiches = this.uiFiches.toogleIsCalled(e, this.fichesList.getFiches());
            this.fichesList.majList(fiches);
            const generalId = this.fichesList.getId();
            this.localStorage.saveFiches(this.fichesList.getFiches());
            this.localStorage.saveId(generalId);
            const id = e.target.closest(".main__fiche").dataset.id;
            this.uiFiches.displayFiche(this.pokemons, parseInt(id), fiches)
        }
    }

    async getPokemons() {
        const preRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const pokemons = await preRes.json();
        return pokemons;

    }

    getFiche(e) {
        const $inputEl = document.querySelector("#input-search");
        return this.fichesList.getFiches().filter((fiche) => {
            return fiche.name.toLowerCase().replace(" ", "").startsWith($inputEl.value.toLowerCase().replace(" ", ""));
        });

    }



}