export class UiFiches {
    constructor() {
        this.fichesContainer = document.querySelector(".aside__fiches");
        this.ficheContainer = document.querySelector("main");

    }

    async displayFiches(pokemons, arr, type = "name") {
        this.fichesContainer.innerHTml = "";
        let sum = "";
        let name;
        let imgUrl;
        let id;
        let order;
        let newArr;
        for (let i = 0; i < arr.length; i++) {

            switch (type) {
                case "name":
                    id = arr[i].imgId;
                    if (!arr[i].deletedId) {
                        name = pokemons.results[id].name;
                        imgUrl = await this.getImgPokemon(name);
                    } else {
                        imgUrl = `/assets/pictures/cartoons/deleted.webp`;
                    }
                    sum += `
                    <div class="aside__fiches_fiche myFiches" data-id="${arr[i].id}">
                            <img class="myFiches" src=${imgUrl} />
                            <h2 class="myFiches">${arr[i].name}</h2>
                        </div>
                    `;
                    break;
                case "contrat":
                    order = { cdi: 1, cdd: 2, stage: 3, alternance: 4 };
                    newArr = JSON.parse(JSON.stringify(arr));
                    newArr.sort((a, b) => order[a.contract] - order[b.contract]);
                    id = newArr[i].imgId;
                    if (!newArr[i].deletedId) {
                        name = pokemons.results[id].name;
                        imgUrl = await this.getImgPokemon(name);
                    } else {
                        imgUrl = `/assets/pictures/cartoons/deleted.webp`;
                    }
                    sum += `
                    <div class="aside__fiches_fiche myFiches" data-id="${newArr[i].id}">
                            <img class="myFiches" src=${imgUrl} />
                            <h2 class="myFiches">${newArr[i].contract}</h2>
                        </div>
                    `;
                    break;
                case "experience":
                    order = { junior: 1, premierEmploi: 2, intermediaire: 3, senior: 4 };
                    newArr = JSON.parse(JSON.stringify(arr));
                    newArr.sort((a, b) => order[a.experience] - order[b.experience]);
                    id = newArr[i].imgId;
                    if (!newArr[i].deletedId) {
                        name = pokemons.results[id].name;
                        imgUrl = await this.getImgPokemon(name);
                    } else {
                        imgUrl = `/assets/pictures/cartoons/deleted.webp`;
                    }
                    sum += `
                        <div class="aside__fiches_fiche myFiches" data-id="${newArr[i].id}">
                                <img class="myFiches" src=${imgUrl} />
                                <h2 class="myFiches">${newArr[i].experience}</h2>
                            </div>
                        `;
                    break;
                case "ville":

                    newArr = JSON.parse(JSON.stringify(arr));
                    const villes = newArr.map((cell) => cell.ville);
                    const sortedVilles = villes.sort();
                    const uniqueSortedVilles = Array.from(new Set(sortedVilles));
                    order = uniqueSortedVilles.reduce((acc, currV, index) => {
                        acc[currV] = index;
                        return acc;
                    }, {});

                    newArr.sort((a, b) => order[a.ville] - order[b.ville]);
                    id = newArr[i].imgId;
                    if (!newArr[i].deletedId) {
                        name = pokemons.results[id].name;
                        imgUrl = await this.getImgPokemon(name);
                    } else {
                        imgUrl = `/assets/pictures/cartoons/deleted.webp`;
                    }
                    sum += `
                           <div class="aside__fiches_fiche myFiches" data-id="${newArr[i].id}">
                                   <img class="myFiches" src=${imgUrl} />
                                   <h2 class="myFiches">${newArr[i].ville}</h2>
                               </div>
                           `;
                    break;
            }


        }
        this.fichesContainer.innerHTML = sum;
    }

    async getImgPokemon(name) {
        const preRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const res = await preRes.json();
        const imgUrl = res.sprites.other['official-artwork'].front_default;
        return imgUrl;
    }

    async displayFiche(pokemons, id, fiches) {
        this.ficheContainer.innerHTml = "";
        const fiche = fiches.find((cell) => cell.id === id);

        const name = pokemons.results[fiche.imgId].name;
        const imgUrl = await this.getImgPokemon(name);

        const container = document.createElement("div");
        container.className = "main__fiche";
        container.setAttribute("data-id", fiche.id);

        // header
        const header = document.createElement("div");
        header.className = "main__fiche__header";
        const deleteContainer = document.createElement("div");
        deleteContainer.className = "deleteFiche_container";
        const deleteFiche = document.createElement("div");
        const img = document.createElement("img");

        if (!fiche.deletedId) {
            img.src = imgUrl;
        } else {
            img.className = "rond";
            img.src = "/assets/pictures/cartoons/deleted.webp";
        }
        deleteFiche.className = "deleteFiche btn faillure";
        deleteFiche.textContent = "Ranger dans les non reçus";

        const supprFiche = document.createElement("div");

        supprFiche.className = "deleteFiche_container";
        const supprFicheBtn = document.createElement("div");
        supprFicheBtn.textContent = "Supprimer la fiche";
        supprFicheBtn.className = "supprFicheBtn btn delete";


        supprFiche.appendChild(supprFicheBtn);
        header.appendChild(supprFiche);



        deleteContainer.appendChild(deleteFiche);
        header.appendChild(deleteContainer);
        header.appendChild(img);
        container.appendChild(header);

        // title
        const title = document.createElement("p");
        title.className = "main__fiche__title";
        title.textContent = fiche.name;
        container.appendChild(title);

        // tags
        const tagsContainer = document.createElement("div");
        tagsContainer.className = "main__fiche__title__tags";

        const tagVille = document.createElement("div");
        tagVille.className = "main__fiche__title__tag";
        tagVille.textContent = fiche.ville;
        if (fiche.ville !== undefined && fiche.ville !== "" && fiche.ville !== null) {
            tagsContainer.appendChild(tagVille);
        }

        const tagContract = document.createElement("div");
        tagContract.className = "main__fiche__title__tag";
        tagContract.textContent = fiche.contract;
        if (fiche.contract !== undefined && fiche.contract !== "" && fiche.contract !== null) {
            tagsContainer.appendChild(tagContract);
        }

        const tagDurée = document.createElement("div");
        tagDurée.className = "main__fiche__title__tag";
        tagDurée.textContent = fiche.durée;
        if (fiche.durée !== undefined && fiche.durée !== "" && fiche.durée !== null) {
            tagsContainer.appendChild(tagDurée);
        }


        const tagExperience = document.createElement("div");
        tagExperience.className = "main__fiche__title__tag";
        tagExperience.textContent = fiche.experience;
        if (fiche.experience !== undefined && fiche.experience !== "" && fiche.experience !== null) {
            tagsContainer.appendChild(tagExperience);
        }

        const tagTechno = document.createElement("div");
        tagTechno.className = "main__fiche__title__tag";
        tagTechno.textContent = fiche.techno;
        tagsContainer.appendChild(tagTechno);
        if (fiche.techno !== undefined && fiche.techno !== "" && fiche.techno !== null) {
            container.appendChild(tagsContainer);
        }



        // isBool
        const boolContainer = document.createElement("div");
        boolContainer.className = "main__fiche__title__isBool";

        const btnIsPosted = document.createElement("div");
        btnIsPosted.textContent = "Posted";

        if (fiche.isPost === true) {
            btnIsPosted.className = "btn validated isPosted";
        } else {
            btnIsPosted.className = "btn isPosted";
        }

        const btnValidated = document.createElement("div");
        btnValidated.textContent = "Called";
        btnValidated.className = "isCalled";

        if (fiche.isCalled === true) {
            btnValidated.className = "btn validated isCalled";
        } else {
            btnValidated.className = "btn isCalled";
        }

        boolContainer.appendChild(btnIsPosted);
        boolContainer.appendChild(btnValidated);
        container.appendChild(boolContainer);

        const divText = document.createElement("div");
        divText.className="text";
        container.appendChild(divText);

        // description
        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "main__fiche__title__description";
        const paraDescription = document.createElement("p");
        paraDescription.textContent = fiche.description;
        descriptionContainer.appendChild(paraDescription);
        container.appendChild(descriptionContainer);

        this.ficheContainer.innerHTML = "";
        this.ficheContainer.appendChild(container);
    }

    toggleIsPosted(e, fiches) {
        const id = e.target.closest(".main__fiche").dataset.id;
        const fiche = fiches.find((fiche) => parseInt(fiche.id) === parseInt(id));
        fiche.isPost = !fiche.isPost;
        const index = fiches.findIndex((cell) => cell.id === fiche.id);
        fiches.splice(index, 1, fiche);
        return fiches;
    }

    toogleIsCalled(e, fiches) {
        const id = e.target.closest(".main__fiche").dataset.id;
        const fiche = fiches.find((fiche) => parseInt(fiche.id) === parseInt(id));
        fiche.isCalled = !fiche.isCalled;
        const index = fiches.findIndex((cell) => cell.id === fiche.id);
        fiches.splice(index, 1, fiche);
        return fiches;
    }
}