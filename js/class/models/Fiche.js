export class Fiche {
    constructor() { }

    create(id,fiche,fiches=[]) {

        fiche.id = id;
        fiche.deletedId = false;
        fiche.recycledId = false;

        const fichesPrises = fiches.filter((cell) => !cell.deletedId);
        const idsPrises = fichesPrises.map((cell) => cell.imgId).sort((a, b) => a - b);

        function trouveUnePlace(arr) {
            for (let i = 0; i < 150; i++) {
                if (i !== arr[i]) {
                    return i;
                }
            }
        }
        const result = trouveUnePlace(idsPrises);
        fiche.imgId = result;

        return fiche;
    }
}


