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
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [fruitPlayed, setFruitPlayed] = useState<FruitLegume | null>(null);
  const [readyForNext, setReadyForNext] = useState(false); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get('region');
    if (regionParam) {
      setRegion(regionParam);
    }

    const shuffledData = fruitsLegumesData.sort(() => Math.random() - 0.5);
    setFruitsLegumes(shuffledData);
    setCurrentIndex(shuffledData.length - 1);
  }, []);

  const handleAnswer = (isLocal: boolean) => {
    setGameStarted(true);
    const item = fruitsLegumes[currentIndex];
    setFruitPlayed(item);
    let isCorrect = false;

    if (isLocal) {
      isCorrect = item.saisons.includes('Printemps') && 
                  (item.region.includes(region) || item.region.includes('Partout en France'));
    } else {
      isCorrect = !(item.saisons.includes('Printemps') && 
                    (item.region.includes(region) || item.region.includes('Partout en France')));
    }

    setAnsweredCorrectly(isCorrect);
    setReadyForNext(true); 
  };

  const handleOutOfFrame = (id: string) => {
    console.log(id + ' a quitté le cadre');
  };

  const handleNextCard = () => {
    setAnsweredCorrectly(null);
    setFruitPlayed(null);
    setReadyForNext(false);

    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(-1); 
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center px-8 py-10">
      <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
        Tu joues avec la région : <span className="text-green-600">{region}</span>
      </h1>

      {answeredCorrectly !== null && gameStarted && (
        <div className="mt-2">
          {answeredCorrectly ? (
            <p className="text-green-600 text-lg font-semibold">✅ Bravo ! Bonne réponse !</p>
          ) : (
            <p className="text-red-600 text-lg font-semibold">❌ Dommage ! Mauvaise réponse.</p>
          )}
        </div>
      )}

    {fruitPlayed !== null && gameStarted && (
      <div className="mt-8 w-full max-w-2xl bg-white border border-green-200 rounded-xl shadow p-6 space-y-4 text-gray-700">
        <div className="space-y-1">
          <p><span className="font-semibold">Nom :</span> {fruitPlayed.nom}</p>
          <p><span className="font-semibold">Type :</span> {fruitPlayed.type}</p>
          <p><span className="font-semibold">Origine :</span> {fruitPlayed.origine}</p>
          {fruitPlayed.region.length > 0 && (
            <p>
              <span className="font-semibold">Région(s) :</span> {fruitPlayed.region.join(', ')}
            </p>
          )}
          <p>
            <span className="font-semibold">Saison idéale :</span> {fruitPlayed.saisons.join(', ')}
          </p>
          <p>
            <span className="font-semibold">Description :</span> {fruitPlayed.description}
          </p>
        </div>
      </div>
    )}


      {/* Si "readyForNext" est faux, on affiche la carte et les zones */}
      {!readyForNext && (
        <div className="relative w-full max-w-5xl flex justify-between items-center mt-10">
          {/* Zone rouge cliquable */}
          <div 
            onClick={() => handleAnswer(false)} 
            className="w-1/6 h-[32rem] bg-red-100 rounded-xl flex items-center justify-center text-red-600 font-bold text-xl shadow-inner cursor-pointer hover:bg-red-200"
          >
            ❌ Pas local
          </div>

          {/* Carte */}
          <div className="w-4/6 flex justify-center">
            {fruitsLegumes.length > 0 && currentIndex >= 0 ? (
              <TinderCard
                onSwipe={(dir: string) => handleAnswer(dir === 'right')}
                onCardLeftScreen={() => handleOutOfFrame(fruitsLegumes[currentIndex].nom)}
                key={fruitsLegumes[currentIndex].nom}
                swipeRequirementType="position"
                swipeThreshold={50}
              >
                <div className="w-[22rem] h-[30rem] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col items-center justify-start transition">
                  <Image
                    src={`/data/images/${fruitsLegumes[currentIndex].nom.toLowerCase().replace(/\s/g, "_")}.jpg`}
                    alt={fruitsLegumes[currentIndex].nom}
                    width={350}
                    height={200}
                    className="object-cover w-full h-56"
                  />
                  <div className="p-4 text-center space-y-2">
                    <h3 className="text-2xl font-semibold text-green-800">{fruitsLegumes[currentIndex].nom}</h3>
                    <p className="text-sm text-gray-600">{fruitsLegumes[currentIndex].description}</p>
                  </div>
                </div>
              </TinderCard>
            ) : (
              <p className="text-center text-xl text-green-700 font-semibold">🎉 Toutes les cartes ont été jouées !</p>
            )}
          </div>

          {/* Zone verte cliquable */}
          <div 
            onClick={() => handleAnswer(true)} 
            className="w-1/6 h-[32rem] bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold text-xl shadow-inner cursor-pointer hover:bg-green-200"
          >
            ✅ Local
          </div>
        </div>
      )}

      {/* Bouton Suivant, seulement visible après avoir répondu */}
      {readyForNext && (
        <button
          onClick={handleNextCard}
          className="bg-green-700 text-white py-2 px-6 rounded-xl mt-6 hover:bg-green-800 transition"
        >
          Suivant
        </button>
      )}

      <button
        onClick={handleGoBack}
        className="bg-green-700 text-white py-2 px-6 rounded-xl mt-8 hover:bg-green-800 transition"
      >
        Retour à l'accueil
      </button>
    </div>
  );
}
