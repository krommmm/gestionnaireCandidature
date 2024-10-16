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
                        imgUrl = `/assets/pictures/cartoons/denied.png`;
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
                        imgUrl = `/assets/pictures/cartoons/denied.png`;
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
                        imgUrl = `/assets/pictures/cartoons/denied.png`;
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
                        imgUrl = `/assets/pictures/cartoons/denied.png`;
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

        // card
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-id", fiche.id);


        // card header
        const cardHeader = document.createElement("div");
        cardHeader.className = "card__header";

        // card header left
        const cardHLeft = document.createElement("div");
        cardHLeft.className = "card__header__left";

        // title 
        const CardHeaderTitle = document.createElement("p");
        CardHeaderTitle.className = " card__header--title";
        CardHeaderTitle.textContent = fiche.name;
        cardHLeft.appendChild(CardHeaderTitle);

        // tags
        const cardList = document.createElement("ul");

        const tags = ["ville", "contract", "durée", "experience", "techno"];

        tags.forEach((tag) => createIfTagsIsPresent(tag));

        function createIfTagsIsPresent(tag) {
            if (fiche[tag] !== undefined && fiche[tag] !== "" && fiche[tag] !== null) {
                const $liEl = document.createElement("li");
                $liEl.textContent = fiche[tag];
                cardList.appendChild($liEl);
            }
        }
        cardHLeft.appendChild(cardList);
        cardHeader.appendChild(cardHLeft);

        // card header right
        const cardHRight = document.createElement("div");
        cardHRight.className="card__header__right";

        const cardHeaderImg = document.createElement("img");
 
        if (!fiche.deletedId) {
            cardHeaderImg.src = imgUrl;
        } else {
            cardHeaderImg.className = "rond";
            cardHeaderImg.src = "/assets/pictures/cartoons/denied.png";
        }
        cardHRight.appendChild(cardHeaderImg);
        cardHeader.appendChild(cardHRight);
        card.appendChild(cardHeader);

                   // Date

                   if (fiche.date) {

                    const date = new Date(fiche.date);
                    const diff = new Date().getTime() - fiche.date;
                    const hoursD = diff / (1000 * 3600);
                    const hoursLeft = hoursD % 24;
                    const daysD = parseInt(hoursD / 24);
        
                    let minutesString;
                    let minutesD = parseInt(diff / (1000 * 60));
                    if (minutesD <= 0) {
                        minutesString = "Moins d'une min";
                    } else {
                        minutesString = minutesD < 60 ? `${minutesD} min` : "";
                    }
        
                    let dayString = hoursD > 24 ? `${daysD} jours` : "";
                    let hoursString = hoursLeft >= 1 ? `${parseInt(hoursLeft)}h` : "";
                    const restString = `${dayString} ${hoursString} ${minutesString}`;
        
        
                    const $dateContainerEl = document.createElement("div");
                    $dateContainerEl.className = "dateContainer";
                    const $dateParaEl = document.createElement("p");
                    let dayOfMonth = date.getDate();
                    dayOfMonth = dayOfMonth <= 9 ? `0${dayOfMonth}` : dayOfMonth;
                    let month = date.getMonth() + 1;
                    month = month <= 9 ? `0${month}` : month;
                    const year = date.getFullYear();
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    $dateParaEl.textContent = `${restString}`;
                    $dateContainerEl.appendChild($dateParaEl);
                    card.appendChild($dateContainerEl);
                }
                if (fiche.url) {
                    const urlA = document.createElement("a");
                    urlA.href = fiche.url;
                    const $urlBtnEl = document.createElement("p");
                    $urlBtnEl.className = "urlBtn btn";
                    $urlBtnEl.textContent = "url";
                    urlA.appendChild($urlBtnEl);
                    card.appendChild(urlA);
                }
        

                

        // Description
        const descriptionCard = document.createElement("div");
        descriptionCard.className="card__description";

        const descriptionCardIs = document.createElement("div");
        descriptionCardIs.className="card__description__is";

        const descriptionCardIsPosted = document.createElement("div");

         if (fiche.isPost === true) {
            descriptionCardIsPosted.className = "btn white validated isPosted";
        } else {
            descriptionCardIsPosted.className = "btn white isPosted";
        }

        const descriptionCardIsCalled = document.createElement("div");
        if (fiche.isCalled === true) {
            descriptionCardIsCalled.className = "btn white validated isCalled";
        } else {
            descriptionCardIsCalled.className = "btn white isCalled";
        }

        descriptionCardIsPosted.textContent = "Posté";
        descriptionCardIsCalled.textContent = "Appelé";

        descriptionCardIs.appendChild(descriptionCardIsPosted);
        descriptionCardIs.appendChild(descriptionCardIsCalled);
        descriptionCard.appendChild(descriptionCardIs);

        const descriptionPara = document.createElement("p");
        descriptionPara.className="description_main";
        descriptionPara.textContent = fiche.description;
        descriptionCard.appendChild(descriptionPara);

        // card buttons
        const cardButtons = document.createElement("div");
        cardButtons.className="card__buttons";

        const btnRanger = document.createElement("button");
        btnRanger.className="deleteFiche btn faillure";
        btnRanger.textContent = "Ranger";
        cardButtons.appendChild(btnRanger);

        const btnSupprimer = document.createElement("button");
        btnSupprimer.className="supprFicheBtn btn delete";
        btnSupprimer.textContent = "Supprimer";
        cardButtons.appendChild(btnSupprimer);

        descriptionCard.appendChild(cardButtons);

        card.appendChild(descriptionCard)
        
        this.ficheContainer.innerHTML = "";
        this.ficheContainer.appendChild(card);
    }

    toggleIsPosted(e, fiches) {
        const id = e.target.closest(".card").dataset.id;
        const fiche = fiches.find((fiche) => parseInt(fiche.id) === parseInt(id));
        fiche.isPost = !fiche.isPost;
        const index = fiches.findIndex((cell) => cell.id === fiche.id);
        fiches.splice(index, 1, fiche);
        return fiches;
    }

    toogleIsCalled(e, fiches) {
        const id = e.target.closest(".card").dataset.id;
        const fiche = fiches.find((fiche) => parseInt(fiche.id) === parseInt(id));
        fiche.isCalled = !fiche.isCalled;
        const index = fiches.findIndex((cell) => cell.id === fiche.id);
        fiches.splice(index, 1, fiche);
        return fiches;
    }
}


