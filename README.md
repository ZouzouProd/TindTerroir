# 🌱 TindTerroir  
**Slogan** : *“Fais le bon geste, swipe du bon côté !”*

## 📌 Objectif de la campagne  
Promouvoir les circuits courts et les comportements écoresponsables à travers une application ludique, sensibilisant les utilisateurs à la saisonnalité et à l'origine des produits alimentaires.

---

## 🕹️ Fonctionnement de la Web App  
- **Interface** : Une carte = un fruit ou légume (image + nom).  
- **Interaction** :  
  - Swipe à droite : “Oui, c’est de saison/local”.  
  - Swipe à gauche : “Non, ce ne l’est pas”.  
- **Feedback immédiat** :  
  - Bonne réponse : Message positif.  
  - Mauvaise réponse : Explication avec anecdote ou conseil.  
- **Résultat final** : Score + badge *“Maître du panier local”* à partager.

---

## 🚀 Lancer l'application en local avec Docker  

### 🧰 Prérequis  
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installé.  
- [Docker Compose](https://docs.docker.com/compose/install/) (inclus avec Docker Desktop).

### ▶️ Étapes  
1. **Cloner le projet** :  
   ```bash
   git clone https://github.com/votre-repo/tindterroir.git
   ```

2. **Construire et lancer l'application** :  
   ```bash
   docker-compose up --build
   ```

3. **Accéder à l'application** :  
   Ouvrez votre navigateur à l'adresse : [http://localhost:3000](http://localhost:3000)

4. **Arrêter les services** :  
   Appuyez sur `Ctrl+C` dans le terminal ou exécutez :  
   ```bash
   docker-compose down
   ```

---

## 🛠️ Développement local sans Docker  

### 🧰 Prérequis  
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)  
- `npm` ou `yarn`

### ▶️ Étapes  
1. **Installer les dépendances** :  
   ```bash
   npm install
   ```
   ou  
   ```bash
   yarn install
   ```

2. **Lancer le serveur de développement** :  
   ```bash
   npm run dev
   ```
   ou  
   ```bash
   yarn dev
   ```

3. **Accéder à l'application** :  
   Ouvrez votre navigateur à l’adresse : [http://localhost:3000](http://localhost:3000)
