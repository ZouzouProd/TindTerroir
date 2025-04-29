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
    }
  };

  const handleOutOfFrame = (id: string) => {
    console.log(id + ' a quitté le cadre');
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Tu joues avec la région : <span className="text-green-600">{region}</span>
      </h1>

      {currentIndex >= 0 && (
        <div className="mb-4 text-lg font-semibold text-green-700">
          Score: {score}/10 - Restant: {currentIndex + 1}
        </div>
      )}

      {answeredCorrectly !== null && gameStarted && (
        <div className="mt-4">
          {answeredCorrectly ? (
            <p className="text-green-600">Bravo ! Réponse correcte !</p>
          ) : (
            <p className="text-red-600">Dommage ! Mauvaise réponse.</p>
          )}
        </div>
      )}

      {fruitPlayed !== null && gameStarted && (
        <div className="mt-4 max-w-2xl text-center">
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

      <div className="mt-8">
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
          <div className="text-center mt-8">
            <p className="text-green-700 font-semibold text-xl mb-4">
              {score >= 7 ? "🎉 Bravo ! Super score !" : score >= 5 ? "Pas mal !" : "Peut mieux faire..."}
            </p>
            <p className="text-2xl font-bold text-green-800 mb-6">
              Ton score final : {score}/10
            </p>
            <button
              onClick={handleGoBack}
              className="bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-transform duration-200 hover:scale-105"
            >
              Retour à l'accueil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}