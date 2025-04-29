export type FruitLegume = {
    nom: string;
    saisons: string[];
    region: string[];
    origine: string;
    description: string;
    type: string;
  };

  export const fruitsLegumesData: FruitLegume[] = [
    {
      "nom": "Tomate",
      "type": "légume",
      "saisons": [
        "Été"
      ],
      "region": [
        "Provence-Alpes-Côte d'Azur",
        "Nouvelle-Aquitaine"
      ],
      "origine": "France",
      "description": "Cultivée localement en été. Souvent importée hors saison depuis le Maroc ou les Pays-Bas."
    },
    {
      "nom": "Fraise",
      "type": "fruit",
      "saisons": [
        "Printemps",
        "Été"
      ],
      "region": [
        "Bretagne",
        "Nouvelle-Aquitaine"
      ],
      "origine": "France",
      "description": "Disponible localement à partir d'avril. Importée d’Espagne en hiver."
    },
    {
      "nom": "Pomme",
      "type": "fruit",
      "saisons": [
        "Automne",
        "Hiver"
      ],
      "region": [
        "Normandie",
        "Pays de la Loire"
      ],
      "origine": "France",
      "description": "Récoltée en automne, se conserve l’hiver. Très bon fruit local."
    },
    {
      "nom": "Carotte",
      "type": "légume",
      "saisons": [
        "Automne",
        "Hiver",
        "Printemps"
      ],
      "region": [
        "Hauts-de-France",
        "Centre-Val de Loire"
      ],
      "origine": "France",
      "description": "Légume local disponible presque toute l’année. Stocké en hiver."
    },
    {
      "nom": "Poireau",
      "type": "légume",
      "saisons": [
        "Automne",
        "Hiver"
      ],
      "region": [
        "Bretagne",
        "Pays de la Loire"
      ],
      "origine": "France",
      "description": "Légume d’hiver typique, cultivé localement en France."
    },
    {
      "nom": "Cerise",
      "type": "fruit",
      "saisons": [
        "Printemps"
      ],
      "region": [
        "Occitanie",
        "Provence-Alpes-Côte d'Azur"
      ],
      "origine": "France",
      "description": "Disponible seulement en mai-juin. Souvent importée du Chili en hiver."
    },
    {
      "nom": "Chou-fleur",
      "type": "légume",
      "saisons": [
        "Hiver",
        "Printemps"
      ],
      "region": [
        "Bretagne"
      ],
      "origine": "France",
      "description": "Cultivé localement en hiver. Importé hors saison d’Espagne."
    },
    {
      "nom": "Poire",
      "type": "fruit",
      "saisons": [
        "Automne",
        "Hiver"
      ],
      "region": [
        "Auvergne-Rhône-Alpes",
        "Provence-Alpes-Côte d'Azur"
      ],
      "origine": "France",
      "description": "Fruit local d'automne, souvent de variété Williams ou Conférence."
    },
    {
      "nom": "Mangue",
      "type": "fruit",
      "saisons": [],
      "region": [],
      "origine": "Brésil, Pérou, Côte d'Ivoire",
      "description": "Fruit tropical non cultivé en France. Disponible toute l’année en importation."
    },
    {
      "nom": "Avocat",
      "type": "fruit",
      "saisons": [],
      "region": [],
      "origine": "Mexique, Pérou, Israël",
      "description": "Cultivé à l’étranger. Très gourmand en eau. Pas local en France."
    },
    {
      "nom": "Banane",
      "type": "fruit",
      "saisons": [],
      "region": [],
      "origine": "Colombie, Équateur, Antilles",
      "description": "Ne pousse pas en métropole. Importée depuis les régions tropicales."
    },
    {
      "nom": "Ananas",
      "type": "fruit",
      "saisons": [],
      "region": [],
      "origine": "Costa Rica, Côte d’Ivoire",
      "description": "Fruit tropical, toujours importé. Pas cultivé en France continentale."
    },
    {
      "nom": "Patate douce",
      "type": "légume",
      "saisons": [
        "Automne"
      ],
      "region": [
        "Occitanie"
      ],
      "origine": "France, Israël, États-Unis",
      "description": "Parfois cultivée en France mais souvent importée, notamment hors saison."
    },
    {
      "nom": "Kiwi",
      "type": "fruit",
      "saisons": [
        "Hiver"
      ],
      "region": [
        "Nouvelle-Aquitaine"
      ],
      "origine": "France, Italie, Nouvelle-Zélande",
      "description": "Peut être local en hiver, mais souvent importé de Nouvelle-Zélande le reste de l’année."
    },
    {
      "nom": "Orange",
      "type": "fruit",
      "saisons": [
        "Hiver"
      ],
      "region": [],
      "origine": "Espagne, Maroc",
      "description": "Fruit typiquement importé. Ne pousse pas en France métropolitaine sauf exception."
    },
    {
      "nom": "Grenade",
      "type": "fruit",
      "saisons": [
        "Automne"
      ],
      "region": [],
      "origine": "Espagne, Israël, Tunisie",
      "description": "Importée majoritairement. Parfois cultivée dans le sud de la France en climat très doux."
    },
    {
      "nom": "Brocoli",
      "type": "légume",
      "saisons": [
        "Automne",
        "Hiver"
      ],
      "region": [
        "Bretagne",
        "Centre-Val de Loire"
      ],
      "origine": "France",
      "description": "Légume riche en fibres et vitamines, disponible localement en hiver."
    },
    {
      "nom": "Navet",
      "type": "légume",
      "saisons": [
        "Automne",
        "Hiver"
      ],
      "region": [
        "Grand Est",
        "Bretagne"
      ],
      "origine": "France",
      "description": "Légume racine rustique, excellent en soupe ou purée."
    },
    {
      "nom": "Épinard",
      "type": "légume",
      "saisons": [
        "Printemps",
        "Automne"
      ],
      "region": [
        "Île-de-France",
        "Hauts-de-France"
      ],
      "origine": "France",
      "description": "Légume feuille riche en fer, pousse bien au printemps et en automne."
    },
    {
      "nom": "Pêche",
      "type": "fruit",
      "saisons": [
        "Été"
      ],
      "region": [
        "Occitanie",
        "Provence-Alpes-Côte d'Azur"
      ],
      "origine": "France",
      "description": "Fruit juteux d’été, très fragile, consommer local pour éviter les pertes."
    },
    {
      "nom": "Abricot",
      "type": "fruit",
      "saisons": [
        "Été"
      ],
      "region": [
        "Occitanie",
        "Auvergne-Rhône-Alpes"
      ],
      "origine": "France",
      "description": "Fruit d’été riche en vitamine A, souvent produit localement dans le sud."
    },
    {
      "nom": "Courgette",
      "type": "légume",
      "saisons": [
        "Été"
      ],
      "region": [
        "Provence-Alpes-Côte d'Azur",
        "Occitanie"
      ],
      "origine": "France",
      "description": "Légume estival cultivé dans le sud, sensible au froid."
    },
    {
      "nom": "Aubergine",
      "type": "légume",
      "saisons": [
        "Été"
      ],
      "region": [
        "PACA",
        "Occitanie"
      ],
      "origine": "France",
      "description": "Légume d’été du sud, composant des plats méditerranéens."
    },
    {
      "nom": "Salade (laitue)",
      "type": "légume",
      "saisons": [
        "Printemps",
        "Été",
        "Automne"
      ],
      "region": [
        "Partout en France"
      ],
      "origine": "France",
      "description": "Cultivée localement une grande partie de l’année sauf en hiver sans serre."
    },
    {
      "nom": "Melon",
      "type": "fruit",
      "saisons": [
        "Été"
      ],
      "region": [
        "Nouvelle-Aquitaine",
        "Occitanie"
      ],
      "origine": "France",
      "description": "Fruit d'été apprécié en entrée, cultivé localement dans le sud."
    },
    {
      "nom": "Raisin",
      "type": "fruit",
      "saisons": [
        "Été",
        "Automne"
      ],
      "region": [
        "Occitanie",
        "Nouvelle-Aquitaine"
      ],
      "origine": "France",
      "description": "Fruit de fin d’été, peut aussi servir à la production de vin local."
    },
    {
      "nom": "Framboise",
      "type": "fruit",
      "saisons": [
        "Été"
      ],
      "region": [
        "Auvergne-Rhône-Alpes",
        "Bretagne"
      ],
      "origine": "France",
      "description": "Petit fruit rouge fragile, cultivé localement en été."
    },
    {
      "nom": "Prune",
      "type": "fruit",
      "saisons": [
        "Été"
      ],
      "region": [
        "Nouvelle-Aquitaine",
        "Occitanie"
      ],
      "origine": "France",
      "description": "Fruit à noyau, souvent transformé en pruneaux dans le Sud-Ouest."
    },
    {
      "nom": "Fenouil",
      "type": "légume",
      "saisons": [
        "Hiver"
      ],
      "region": [
        "PACA"
      ],
      "origine": "France",
      "description": "Légume au goût anisé, souvent cultivé en Provence l’hiver."
    },
    {
      "nom": "Chou rouge",
      "type": "légume",
      "saisons": [
        "Hiver"
      ],
      "region": [
        "Grand Est",
        "Bourgogne"
      ],
      "origine": "France",
      "description": "Légume rustique, idéal pour les salades d’hiver."
    },
    {
      "nom": "Topinambour",
      "type": "légume",
      "saisons": [
        "Hiver"
      ],
      "region": [
        "Centre-Val de Loire"
      ],
      "origine": "France",
      "description": "Légume oublié, racine sucrée au goût proche de l’artichaut."
    },
    {
      "nom": "Panais",
      "type": "légume",
      "saisons": [
        "Hiver"
      ],
      "region": [
        "Normandie",
        "Bretagne"
      ],
      "origine": "France",
      "description": "Ancien légume racine revenu à la mode, riche en fibres."
    },
    {
      "nom": "Betterave",
      "type": "légume",
      "saisons": [
        "Automne",
        "Hiver"
      ],
      "region": [
        "Hauts-de-France",
        "Normandie"
      ],
      "origine": "France",
      "description": "Utilisée crue ou cuite, naturellement sucrée et locale."
    },
    {
      "nom": "Myrtille",
      "type": "fruit",
      "saisons": [
        "Été"
      ],
      "region": [
        "Auvergne",
        "Vosges"
      ],
      "origine": "France",
      "description": "Fruit des montagnes, récolté à la main en saison."
    },
    {
      "nom": "Artichaut",
      "type": "légume",
      "saisons": [
        "Printemps",
        "Été"
      ],
      "region": [
        "Bretagne"
      ],
      "origine": "France",
      "description": "Légume fleuri cultivé dans l’ouest, peu transportable."
    },
    {
      "nom": "Oignon",
      "type": "légume",
      "saisons": [
        "Été",
        "Automne"
      ],
      "region": [
        "Centre-Val de Loire"
      ],
      "origine": "France",
      "description": "Base de la cuisine, se conserve longtemps, disponible localement."
    }
  ];