// Atlas.jsx
import React, { useState, useEffect } from 'react';
import AtlasCard from "../components/features/atlas/AtlasCard.jsx";
import FilterAtlasList from "../components/features/atlas/FilterAtlasList.jsx";

const Atlas = ({ atlases }) => {

  // --- 1. État principal : les données filtrées ---
  const [filtered, setFiltered] = useState(atlases);

  // --- 2. Construction des mediums à partir des atlases ---
  const mediumsList = [
    'all',
    ...new Set(
      atlases
        .map(a => a.medium?.medium) // récupère le nom du medium
        .filter(Boolean) // retire null / undefined
    )
  ];

  // --- 3. Fonction de filtre ---
  const filterMedium = (medium) => {
    if (medium === 'all') {
      setFiltered(atlases);
      return;
    }

    const result = atlases.filter(a => a.medium?.medium === medium);
    setFiltered(result);
  };

  return (
    <div className="wrapper-atlas py-y-body px-x-body bg-[#E0E0E0]">

      {/* --- 4. Boutons des Mediums --- */}
      <div className="filters flex gap-4 mb-6">
        {mediumsList.map((m) => (
          <FilterAtlasList 
            key={m} 
            mediumName={m} 
            onClick={() => filterMedium(m)} 
          />
        ))}
      </div>

      {/* --- 5. Affichage filtré --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <AtlasCard key={p.id} atlas={p} />
        ))}
      </div>

    </div>
  );
};

export default Atlas;