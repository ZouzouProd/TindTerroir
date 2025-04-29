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
  const [score, setScore] = useState(0);
  const [readyForNext, setReadyForNext] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get('region');
    if (regionParam) {
      setRegion(regionParam);
    }

    const shuffledData = fruitsLegumesData.sort(() => Math.random() - 0.5).slice(0, 10);
    setFruitsLegumes(shuffledData);
    setCurrentIndex(shuffledData.length - 1);
  }, []);

  const handleAnswer = (isLocal: boolean) => {
    setGameStarted(true);
    const item = fruitsLegumes[currentIndex];
    setFruitPlayed(item);

    const isCorrect = isLocal
      ? item.saisons.includes('Printemps') && (item.region.includes(region) || item.region.includes('Partout en France'))
      : !item.saisons.includes('Printemps') || (!item.region.includes(region) && !item.region.includes('Partout en France'));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnsweredCorrectly(isCorrect);
    setReadyForNext(true);
  };

  const handleNextCard = () => {
    setAnsweredCorrectly(null);
    setFruitPlayed(null);
    setReadyForNext(false);

    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setGameFinished(true);
    }
  };

  const handleOutOfFrame = (id: string) => {
    console.log(id + ' a quitté le cadre');
  };

  const handleGoBack = () => {
    router.push('/');
  };

  const getPlayerLevel = () => {
    if (score >= 9) return { level: "Expert Locavore", color: "bg-green-600", message: "Vous êtes un véritable expert de la consommation locale!" };
    if (score >= 7) return { level: "Jardinier Averti", color: "bg-green-500", message: "Bravo! Vous avez d'excellentes connaissances!" };
    if (score >= 5) return { level: "Apprenti Maraîcher", color: "bg-yellow-500", message: "Pas mal! Vous êtes sur la bonne voie." };
    if (score >= 3) return { level: "Pousse Verte", color: "bg-orange-500", message: "Vous pouvez vous améliorer avec quelques conseils." };
    return { level: "Graine à Cultiver", color: "bg-red-500", message: "Il est temps d'apprendre à consommer local!" };
  };

  const getPersonalizedTips = () => {
    if (score >= 8) {
      return [
        "Partagez vos connaissances avec votre entourage",
        "Essayez de cultiver vos propres légumes/fruits",
        "Participez à des réseaux de producteurs locaux"
      ];
    } else if (score >= 5) {
      return [
        "Visitez les marchés de votre région",
        "Utilisez un calendrier de saisonnalité",
        "Privilégiez les circuits courts"
      ];
    } else {
      return [
        "Repérez l'origine des produits achetés",
        "Apprenez les fruits/légumes de saison",
        "Téléchargez une app de saisonnalité"
      ];
    }
  };

  const progressPercentage = score * 10;
  const playerStatus = getPlayerLevel();

  const currentFruit = fruitsLegumes[currentIndex]; 
  if (!currentFruit) {
    return <div>Chargement...</div>; 
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center px-4 py-8">
      <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
        Tu joues avec la région : <span className="text-green-600">{region}</span>
      </h1>

      {!gameFinished && currentIndex >= 0 && (
        <div className="w-full max-w-3xl flex flex-col items-center space-y-4">
          <div className="w-full max-w-lg text-green-700 font-medium">
            <p>Score : {score}/10</p>
            <div className="w-full bg-gray-300 rounded-full h-3 mt-1">
              <div className={`h-3 rounded-full ${playerStatus.color}`} style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          {answeredCorrectly !== null && (
            <div>
              {answeredCorrectly ? (
                <p className="text-green-600 text-lg font-semibold">✅ Bravo ! Bonne réponse !</p>
              ) : (
                <p className="text-red-600 text-lg font-semibold">❌ Dommage ! Mauvaise réponse.</p>
              )}
            </div>
          )}

          {fruitPlayed && (
            <div className="w-full bg-white border border-green-200 rounded-xl shadow p-4 space-y-2">
              <p><strong>Nom :</strong> {fruitPlayed.nom}</p>
              <p><strong>Type :</strong> {fruitPlayed.type}</p>
              <p><strong>Origine :</strong> {fruitPlayed.origine}</p>
              <p><strong>Régions :</strong> {fruitPlayed.region.join(', ')}</p>
              <p><strong>Saisons :</strong> {fruitPlayed.saisons.join(', ')}</p>
              <p><strong>Description :</strong> {fruitPlayed.description}</p>
            </div>
          )}

          {!readyForNext && (
            <div className="flex w-full justify-between mt-6">
              <div
                onClick={() => handleAnswer(false)}
                className="w-1/4 h-80 bg-red-100 rounded-xl flex items-center justify-center text-red-700 font-bold text-xl shadow-inner cursor-pointer hover:bg-red-200"
              >
                ❌ Pas local
              </div>

              <div className="w-2/4 flex justify-center">
                <TinderCard
                  onSwipe={(dir: string) => handleAnswer(dir === 'right')}
                  onCardLeftScreen={() => handleOutOfFrame(fruitsLegumes[currentIndex].nom)}
                  key={currentFruit.nom}
                  swipeRequirementType="position"
                  swipeThreshold={50}
                >
                  <div className="w-72 h-96 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col items-center">
                    <Image
                      src={`/data/images/${currentFruit.nom.toLowerCase().replace(/\s/g, "_")}.jpg`}
                      alt={currentFruit.nom}
                      width={300}
                      height={200}
                      className="object-cover w-full h-48"
                    />
                    <div className="p-4 text-center space-y-2">
                      <h3 className="text-2xl font-semibold text-green-800">{currentFruit.nom}</h3>
                      <p className="text-sm text-gray-600">{currentFruit.description}</p>
                    </div>
                  </div>
                </TinderCard>
              </div>

              <div
                onClick={() => handleAnswer(true)}
                className="w-1/4 h-80 bg-green-100 rounded-xl flex items-center justify-center text-green-700 font-bold text-xl shadow-inner cursor-pointer hover:bg-green-200"
              >
                ✅ Local
              </div>
            </div>
          )}

          {readyForNext && (
            <button
              onClick={handleNextCard}
              className="bg-green-700 text-white py-2 px-6 rounded-xl mt-4 hover:bg-green-800 transition"
            >
              Suivant
            </button>
          )}
        </div>
      )}

      {gameFinished && (
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-6 mt-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-2">{playerStatus.level}</h2>
          <p className="text-gray-700 mb-4">{playerStatus.message}</p>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
            <div
              className={`h-6 rounded-full flex items-center justify-center text-white font-semibold ${playerStatus.color}`}
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage}%
            </div>
          </div>
          <p className="text-xl font-bold text-green-800 mb-6">Score final : {score}/10</p>

          <h3 className="text-lg font-semibold text-green-700 mb-2">Conseils personnalisés :</h3>
          <ul className="text-left space-y-2 mb-4">
            {getPersonalizedTips().map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-green-600">🌱</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGoBack}
              className="bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700"
            >
              Retour à l'accueil
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700"
            >
              Rejouer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
