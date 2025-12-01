// Atlas.jsx
import React, { useState, useEffect } from 'react';
import AtlasCard from "../components/features/atlas/AtlasCard.jsx";
import FilterAtlasList from "../components/features/atlas/FilterAtlasList.jsx";

const Atlas = ({ atlases }) => {

  // --- 1. État principal : les données filtrées ---
  const [filtered, setFiltered] = useState(atlases);
  const [activeMedium, setActiveMedium] = useState('all');

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
    setActiveMedium(medium);
    if (medium === 'all') {
      setFiltered(atlases);
      return;
    }

    const result = atlases.filter(a => a.medium?.medium === medium);
    setFiltered(result);
  };

  return (
    <div className="wrapper-atlas py-y-body px-x-body bg-[#E0E0E0] h-[200vh]">

      {/* --- 4. Boutons des Mediums --- */}
      <ul className="filters flex gap-[10px] sticky top-[40px] mb-[50px]">
        {mediumsList.map((m) => (
          <FilterAtlasList 
            key={m} 
            mediumName={m} 
            onClick={() => filterMedium(m)} 
            isActive={activeMedium === m}
          />
        ))}
      </ul>

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