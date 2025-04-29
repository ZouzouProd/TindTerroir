"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter()
  const [region, setRegion] = useState('')

  const regions = [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne",
    "Centre-Val de Loire", "Corse", "Grand Est", "Hauts-de-France",
    "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie",
    "Pays de la Loire", "Provence-Alpes-Côte d'Azur", "Guadeloupe",
    "Martinique", "Guyane", "La Réunion", "Mayotte"
  ]

  const handleSubmit = () => {
    if (region) {
      router.push(`/jeu?region=${encodeURIComponent(region)}`)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">TindTerroir</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <label htmlFor="region" className="block mb-2 text-lg font-medium text-gray-700">
          Choisis ta région :
        </label>
        <select
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        >
          <option value="">-- Sélectionner une région --</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          disabled={!region}
          className={`w-full py-3 text-white rounded-xl transition ${
            region ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Commencer
        </button>
      </div>
    </div>
  )
}