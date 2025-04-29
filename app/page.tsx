'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [region, setRegion] = useState('');

  const regions = [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne",
    "Centre-Val de Loire", "Corse", "Grand Est", "Hauts-de-France",
    "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie",
    "Pays de la Loire", "Provence-Alpes-Côte d'Azur", "Guadeloupe",
    "Martinique", "Guyane", "La Réunion", "Mayotte"
  ];

  const handleStart = () => {
    if (region) {
      router.push(`/jeu?region=${encodeURIComponent(region)}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/data/images/background.png')" }}
    >
      <div
        className="p-8 rounded-xl max-w-lg text-center shadow-lg w-full"
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <h1 className="text-4xl font-bold text-green-600 mb-4">TindTerroir</h1>
        <p className="text-xl text-gray-300 mb-6">Découvre les produits de saison près de chez toi.</p>

        <div className="mb-6">
          <label htmlFor="region" className="block mb-2 text-lg font-medium text-white">
            Sélectionne ta région
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-lg text-black"
          >
            <option value="">-- Choisir --</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleStart}
          disabled={!region}
          className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition-transform duration-200 hover:scale-105 ${!region && 'opacity-50 cursor-not-allowed'}`}
        >
          Commencer
        </button>
      </div>
    </div>
  );
}
