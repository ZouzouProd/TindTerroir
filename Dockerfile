# Dockerfile
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste de l'application
COPY . .

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
