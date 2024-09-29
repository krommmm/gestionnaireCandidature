import { Modal } from "./class/models/Modal.js";
import { Fiche } from "./class/models/Fiche.js";
import { FichesList } from "./class/models/FichesList.js";
import { UiFiches } from "./class/views/UiFiches.js";
import { LocalStorage } from "./class/models/LocalStorage.js";
import { HomeCtrl } from "../js/class/controllers/HomeCtrl.js";

const modal = new Modal();
const fiche = new Fiche();
const fichesList = new FichesList();
const uiFiches = new UiFiches();
const localStorage = new LocalStorage();
new HomeCtrl(modal, fiche, fichesList, uiFiches, localStorage);