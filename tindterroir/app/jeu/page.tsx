'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Jeu() {
  const router = useRouter()
  const [region, setRegion] = useState('')
  const [loading, setLoading] = useState(true)

  // Récupérer la région depuis les query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const regionParam = urlParams.get('region')
    if (regionParam) {
      setRegion(regionParam)
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2>Chargement...</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Bienvenue sur TindTerroir</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Tu as choisi la région : <span className="text-green-600">{region}</span>
        </h2>

        {/* Exemple de contenu dynamique pour la région choisie */}
        <p>Voici quelques informations ou défis pour ta région...</p>
        <div className="mt-4">
          {/* Ajouter des éléments du jeu ici */}
          <button
            onClick={() => router.push('/')} 
            className="bg-green-600 text-white py-2 px-4 rounded-xl mt-4 hover:bg-green-700 transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  )
}