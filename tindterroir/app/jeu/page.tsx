'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import TinderCard from "react-tinder-card";
import { useRouter } from "next/navigation";
import { FruitLegume, fruitsLegumesData } from "../data/fruitsLegumes";

export default function Jeu() {
  const router = useRouter();
  const [region, setRegion] = useState('');
  const [fruitsLegumes, setFruitsLegumes] = useState<FruitLegume[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [fruitPlayed, setFruitPlayed] = useState<FruitLegume | null>(null);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const regions = [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne",
    "Centre-Val de Loire", "Corse", "Grand Est", "Hauts-de-France",
    "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie",
    "Pays de la Loire", "Provence-Alpes-Côte d'Azur", "Guadeloupe",
    "Martinique", "Guyane", "La Réunion", "Mayotte"
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get('region');
    if (regionParam) {
      setRegion(regionParam);
    }

    const shuffledData = fruitsLegumesData
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    setFruitsLegumes(shuffledData);
    setCurrentIndex(shuffledData.length - 1);
  }, []);

  const handleSwipe = (direction: string, item: FruitLegume) => {
    setGameStarted(true);
    setFruitPlayed(item);
    let isCorrect = false;

    if (direction === 'right') {
      isCorrect = item.saisons.includes('Printemps') &&
        (item.region.includes(region) || item.region.includes('Partout en France'));
    } else if (direction === 'left') {
      isCorrect = !item.saisons.includes('Printemps') && !item.region.includes(region);
    }

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnsweredCorrectly(isCorrect);

    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(-1);
      setGameFinished(true);
    }
  };

  const handleOutOfFrame = (id: string) => {
    console.log(id + ' a quitté le cadre');
  };

  const handleGoBack = () => {
    router.push('/');
  };

  // Fonction pour obtenir le niveau du joueur basé sur le score
  const getPlayerLevel = () => {
    if (score >= 9) return { level: "Expert Locavore", color: "bg-green-600", message: "Vous êtes un véritable expert de la consommation locale!" };
    if (score >= 7) return { level: "Jardinier Averti", color: "bg-green-500", message: "Bravo! Vous avez d'excellentes connaissances!" };
    if (score >= 5) return { level: "Apprenti Maraîcher", color: "bg-yellow-500", message: "Pas mal! Vous êtes sur la bonne voie." };
    if (score >= 3) return { level: "Pousse Verte", color: "bg-orange-500", message: "Vous pouvez vous améliorer avec quelques conseils." };
    return { level: "Graine à Cultiver", color: "bg-red-500", message: "Il est temps d'apprendre à consommer local!" };
  };

  // Conseils personnalisés en fonction du score
  const getPersonalizedTips = () => {
    if (score >= 8) {
      return [
        "Partagez vos connaissances avec votre entourage pour sensibiliser à la consommation locale",
        "Essayez de cultiver vos propres légumes et fruits dans un potager ou sur votre balcon",
        "Participez à des réseaux d'AMAP ou de producteurs locaux pour soutenir l'agriculture durable"
      ];
    } else if (score >= 5) {
      return [
        "Visitez régulièrement les marchés locaux de votre région pour découvrir les producteurs",
        "Utilisez un calendrier de saisonnalité pour planifier vos repas",
        "Privilégiez les circuits courts et les produits labellisés de votre région"
      ];
    } else {
      return [
        "Commencez par repérer l'origine des produits que vous achetez",
        "Apprenez à reconnaître les fruits et légumes de saison chaque mois",
        "Réduisez votre consommation de produits importés en faveur des productions locales",
        "Téléchargez une application de saisonnalité pour vous guider dans vos achats"
      ];
    }
  };

  // Calcul du pourcentage pour la barre de progression
  const progressPercentage = score * 10;
  const playerStatus = getPlayerLevel();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Tu joues avec la région : <span className="text-green-600">{region}</span>
      </h1>

      {currentIndex >= 0 && (
        <div className="w-full max-w-lg mb-6">
          <div className="flex justify-between text-lg font-semibold text-green-700 mb-2">
            <span>Score: {score}/10</span>
            <span>Cartes restantes: {currentIndex + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-300 ${score >= 7 ? 'bg-green-600' : score >= 5 ? 'bg-yellow-500' : 'bg-orange-500'}`} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {answeredCorrectly !== null && gameStarted && !gameFinished && (
        <div className="mb-4 py-2 px-4 rounded-lg text-center">
          {answeredCorrectly ? (
            <p className="text-green-600 font-semibold">✓ Bravo ! Réponse correcte !</p>
          ) : (
            <p className="text-red-600 font-semibold">✗ Dommage ! Mauvaise réponse.</p>
          )}
        </div>
      )}

      {fruitPlayed !== null && gameStarted && !gameFinished && (
        <div className="mt-2 max-w-2xl text-center p-4 bg-white rounded-lg shadow-sm">
          <p className="text-gray-700">
            Le {fruitPlayed.nom} est un {fruitPlayed.type} originaire de {fruitPlayed.origine}.
          </p>
          {fruitPlayed.region.length > 0 && (
            <p className="text-gray-700">
              Zones de production : {fruitPlayed.region.join(', ')}
            </p>
          )}
          <p className="text-gray-700">
            Période(s) idéale(s) : {fruitPlayed.saisons.join(', ')}
          </p>
          <p className="text-gray-700 italic mt-2">{fruitPlayed.description}</p>
        </div>
      )}

      <div className="mt-6">
        {fruitsLegumes.length > 0 && currentIndex >= 0 ? (
          <div className="flex justify-center">
            <TinderCard
              onSwipe={(dir: string) => handleSwipe(dir, fruitsLegumes[currentIndex])}
              onCardLeftScreen={() => handleOutOfFrame(fruitsLegumes[currentIndex].nom)}
              key={fruitsLegumes[currentIndex].nom}
              swipeRequirementType="position"
              swipeThreshold={50}
            >
              <div className="w-80 h-[28rem] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center transition-transform duration-200 hover:scale-105">
                <div className="relative w-full h-48">
                  <Image
                    src={`/data/images/${fruitsLegumes[currentIndex].nom.toLowerCase().replace(/\s/g, "_")}.jpg`}
                    alt={fruitsLegumes[currentIndex].nom}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="p-4 text-center flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {fruitsLegumes[currentIndex].nom}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {fruitsLegumes[currentIndex].type.charAt(0).toUpperCase() + 
                     fruitsLegumes[currentIndex].type.slice(1)}
                  </p>
                </div>
              </div>
            </TinderCard>
          </div>
        ) : (
          <div className="text-center mt-8 max-w-2xl bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                {playerStatus.level}
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                {playerStatus.message}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                <div 
                  className={`h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold ${playerStatus.color}`} 
                  style={{ width: `${progressPercentage}%` }}
                >
                  {progressPercentage}%
                </div>
              </div>
              <p className="text-2xl font-bold text-green-800 mb-6">
                Score final : {score}/10
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Conseils pour une meilleure consommation locale :
              </h3>
              <ul className="text-left space-y-2">
                {getPersonalizedTips().map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2 text-green-600">🌱</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGoBack}
                className="bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-transform duration-200 hover:scale-105"
              >
                Retour à l'accueil
              </button>
              <button
                onClick={() => {
                  // Recharger la partie avec la même région
                  window.location.reload();
                }}
                className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-transform duration-200 hover:scale-105"
              >
                Rejouer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}