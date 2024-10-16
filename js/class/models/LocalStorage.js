export class LocalStorage {
    constructor() {

    }

    saveFiches(fiches) {
        localStorage.setItem("re-fiches", JSON.stringify(fiches));
    }

    saveId(id) {
        localStorage.setItem("re-id", JSON.stringify(id));
    }


    addSampleFiches(){
        const sampleFiches = [
            {
              "url": "https://www.linkedin.com/jobs/search/?currentJobId=4027728915&keywords=developer%20front-end&location=Worldwide",
              "date": 1729063353601,
              "name": "codezoo",
              "contract": "cdd",
              "ville": "paris",
              "durée": "",
              "salaire": "30k",
              "experience": "junior",
              "techno": "back",
              "isPost": false,
              "isCalled": false,
              "description": "Codezoo est une startup en pleine croissance, spécialisée dans la création de solutions innovantes pour le secteur du e-commerce.",
              "id": 0,
              "deletedId": false,
              "recycledId": false,
              "imgId": 0
            },
            {
              "url": "https://www.linkedin.com/jobs/search/?currentJobId=4027728920&keywords=developer%20front-end&location=Worldwide",
              "date": 1729063378901,
              "name": "technoverse",
              "contract": "cdi",
              "ville": "lyon",
              "durée": "",
              "salaire": "40k",
              "experience": "intermédiaire",
              "techno": "full-stack",
              "isPost": true,
              "isCalled": true,
              "description": "Entreprise dynamique en pleine expansion spécialisée dans le développement de solutions web innovantes.",
              "id": 1,
              "deletedId": false,
              "recycledId": false,
              "imgId": 1
            },
            {
              "url": "https://www.linkedin.com/jobs/search/?currentJobId=4027728930&keywords=developer%20front-end&location=Worldwide",
              "date": 1729063388901,
              "name": "webfusion",
              "contract": "cdi",
              "ville": "marseille",
              "durée": "12 mois",
              "salaire": "45k",
              "experience": "senior",
              "techno": "frontend",
              "isPost": true,
              "isCalled": false,
              "description": "Création de solutions web sur mesure pour des clients internationaux, avec une forte culture d'innovation.",
              "id": 2,
              "deletedId": false,
              "recycledId": false,
              "imgId": 2
            },
            {
              "url": "https://www.linkedin.com/jobs/search/?currentJobId=4027728945&keywords=developer%20front-end&location=Worldwide",
              "date": 1729063401901,
              "name": "devinno",
              "contract": "stage",
              "ville": "toulouse",
              "durée": "6 mois",
              "salaire": "1200€",
              "experience": "débutant",
              "techno": "react",
              "isPost": true,
              "isCalled": false,
              "description": "Stage pour intégrer une équipe agile et développer des applications React avec des défis techniques intéressants.",
              "id": 3,
              "deletedId": false,
              "recycledId": false,
              "imgId": 3
            },
            {
              "url": "https://www.linkedin.com/jobs/search/?currentJobId=4027728955&keywords=developer%20front-end&location=Worldwide",
              "date": 1729063412801,
              "name": "coderise",
              "contract": "freelance",
              "ville": "bordeaux",
              "durée": "variable",
              "salaire": "60k",
              "experience": "senior",
              "techno": "vue.js",
              "isPost": false,
              "isCalled": true,
              "description": "Mission freelance pour un projet client à fort enjeu avec une équipe de développement internationale.",
              "id": 4,
              "deletedId": false,
              "recycledId": false,
              "imgId": 4
            },
            {
              "url": "https://www.linkedin.com/jobs/search/?currentJobId=4027728961&keywords=developer%20front-end&location=Worldwide",
              "date": 1729063423801,
              "name": "bluecloud",
              "contract": "cdd",
              "ville": "paris",
              "durée": "18 mois",
              "salaire": "50k",
              "experience": "junior",
              "techno": "angular",
              "isPost": false,
              "isCalled": false,
              "description": "Développement d'applications de cloud computing pour des entreprises innovantes.",
              "id": 5,
              "deletedId": false,
              "recycledId": false,
              "imgId": 5
            },
            {
              "url": "https://www.linkedin.com/jobs/search/?currentJobId=4027728970&keywords=developer%20front-end&location=Worldwide",
              "date": 1729063434801,
              "name": "innoapps",
              "contract": "cdi",
              "ville": "paris",
              "durée": "",
              "salaire": "70k",
              "experience": "senior",
              "techno": "node.js",
              "isPost": true,
              "isCalled": false,
              "description": "Entreprise leader en développement d'applications mobiles et web avec des projets de grande envergure.",
              "id": 6,
              "deletedId": false,
              "recycledId": false,
              "imgId": 6
            },
            {
              "url": "https://www.linkedin.com/jobs/search/?currentJobId=4027728981&keywords=developer%20front-end&location=Worldwide",
              "date": 1729063445901,
              "name": "softwaves",
              "contract": "cdi",
              "ville": "nantes",
              "durée": "12 mois",
              "salaire": "38k",
              "experience": "junior",
              "techno": "python",
              "isPost": true,
              "isCalled": false,
              "description": "Entreprise innovante dans le développement de logiciels pour le secteur des télécommunications.",
              "id": 7,
              "deletedId": false,
              "recycledId": false,
              "imgId": 7
            },
            {
              "url": "https://www.linkedin.com/jobs/search/?currentJobId=4027728992&keywords=developer%20front-end&location=Worldwide",
              "date": 1729063456901,
              "name": "novalytics",
              "contract": "freelance",
              "ville": "strasbourg",
              "durée": "variable",
              "salaire": "55k",
              "experience": "intermédiaire",
              "techno": "react",
              "isPost": false,
              "isCalled": true,
              "description": "Développement de solutions d'analyse de données pour des clients du secteur financier.",
              "id": 8,
              "deletedId": false,
              "recycledId": false,
              "imgId": 8
            }
          ];
          localStorage.setItem("re-fiches", JSON.stringify(sampleFiches));
          localStorage.setItem("re-id", JSON.stringify(8));
          
    }
}