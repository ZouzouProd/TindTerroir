'use client';

import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useRouter } from "next/navigation";
import { FruitLegume, fruitsLegumesData } from "../data/fruitsLegumes";



export default function Jeu() {
  const router = useRouter()
  const [region, setRegion] = useState('')
  const [fruitsLegumes, setFruitsLegumes] = useState<FruitLegume[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [fruitPlayed, setFruitPlayed] = useState<FruitLegume | null>(null)

  const regions = [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne",
    "Centre-Val de Loire", "Corse", "Grand Est", "Hauts-de-France",
    "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie",
    "Pays de la Loire", "Provence-Alpes-Côte d'Azur", "Guadeloupe",
    "Martinique", "Guyane", "La Réunion", "Mayotte"
  ]

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const regionParam = urlParams.get('region')
    if (regionParam) {
      setRegion(regionParam)
    }
  
    const shuffledData = fruitsLegumesData.sort(() => Math.random() - 0.5)
    setFruitsLegumes(shuffledData)
    setCurrentIndex(shuffledData.length - 1) // 🔧 correction ici
  }, [])

  // Liste des fruits/légumes générée précédemment
  const handleSwipe = (direction: string, item: FruitLegume) => {
    setGameStarted(true);
    setFruitPlayed(item);
    const isCorrect = direction === 'right' &&
                      item.saisons.includes('Automne') && // à adapter dynamiquement
                      item.region.includes(region)
    setAnsweredCorrectly(isCorrect)
  
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    } else {
      setCurrentIndex(-1) // plus de cartes
    }
  }

  const handleOutOfFrame = (id: string) => {
    console.log(id + ' a quitté le cadre')
  }

  const handleGoBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Tu joue avec la région : <span className="text-green-600">{region}</span> </h1>
      {answeredCorrectly !== null && gameStarted && (
          <div className="mt-4">
            {answeredCorrectly ? (
              <p className="text-green-600">Bravo ! Ce produit est local et en saison !</p>
            ) : (
              <p className="text-red-600">Dommage, ce produit n'est pas local ou en saison.</p>
            )}
          </div>
        )}
        {fruitPlayed !==null && gameStarted && (
            <div className="mt-4">
                <p className="text-black-500">Le {fruitPlayed.nom} est un {fruitPlayed.type} originaire de {fruitPlayed.origine}. {fruitPlayed.region.length > 0 && (
                    <p className="text-black-500">Plus précisement il vient de {fruitPlayed.region.join(', ')}.</p>
                )}</p>
                <p className="text-black-500">{fruitPlayed.saisons.length > 1 ? 'Les période' : 'La période'} idéal pour manger ce {fruitPlayed.type} {fruitPlayed.saisons.length > 1 ? 'sont' : 'est'} {fruitPlayed.saisons.join(', ')}</p>
                <p className="text-black-500">En savoir plus : {fruitPlayed.description}</p>
            </div>
        )}
      <div className="">

        <div className="">
            {fruitsLegumes.length > 0 && currentIndex >= 0 ? (
            <div className="flex justify-center">
                <div className="">
                <TinderCard
                    onSwipe={(dir: string) => handleSwipe(dir, fruitsLegumes[currentIndex])}
                    onCardLeftScreen={() => handleOutOfFrame(fruitsLegumes[currentIndex].nom)}
                    key={fruitsLegumes[currentIndex].nom}
                    swipeRequirementType="position"
                    swipeThreshold={50}
                >
                    <div className="w-80 h-80 bg-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold">{fruitsLegumes[currentIndex].nom}</h3>
                    <p>{fruitsLegumes[currentIndex].description}</p>
                    </div>
                </TinderCard>
                </div>
            </div>
            ) : (
            <p className="text-center mt-8 text-green-700 font-semibold">Toutes les cartes ont été jouées 🎉</p>
            )}
        </div>

        <button
              onClick={handleGoBack}
              className="bg-green-600 text-white py-2 px-4 rounded-xl mt-4 hover:bg-green-700 transition"
            >
              Retour à l'accueil
            </button>
        
      </div>
    </div>
  )
}