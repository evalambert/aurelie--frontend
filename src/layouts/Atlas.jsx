// src/layouts/Atlas.jsx
import React, { useState, useEffect } from 'react';
import AtlasCard from "../components/features/atlas/AtlasCard.jsx";
import FilterAtlasList from "../components/features/atlas/FilterAtlasList.jsx";
import ImageLightboxAtlas from "../components/features/atlas/ImageLightboxAtlas.jsx";

const Atlas = ({ atlases }) => {

  // Filtres •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
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
  // ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••


  // Lightbox •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
  const [imageData, setImageData] = useState(null);
  const [toggleOpen, setToggleOpen] = useState(false);

  const handleCardClick = (imgData) => {
    setImageData(imgData);
    setToggleOpen(true);
  };
  // ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••


  // Sibling cards •••••••••••••••••••••••••••••••••••••••••••••••••••••

  const allById = new Map(filtered.map(item => [item.id, item]));

  const ordered = [];
  const idsToSkip = new Set();

  filtered.forEach(item => {
    if (idsToSkip.has(item.id)) return;

    ordered.push(item);
    idsToSkip.add(item.id);

    if (item.siblings?.length) {
      item.siblings.forEach(sib => {
        const fullSibling = allById.get(sib.id) || sib;

        // ⛔️ NE PAS AJOUTER le sibling si son medium ne correspond pas au filtre
        if (activeMedium !== 'all' && fullSibling.medium?.medium !== activeMedium) {
          return;
        }

        if (!idsToSkip.has(fullSibling.id)) {
          ordered.push(fullSibling);
          idsToSkip.add(fullSibling.id);
        }
      });
    }
  });

  // ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••


  return (
    <>


      <div className="wrapper-atlas pt-[53px] md:pt-[40px] py-y-body px-x-body bg-[#E0E0E0] min-h-screen">

        {/* --- Filters --- */}
        <ul className="filters flex flex-wrap gap-x-[10px] gap-y-[3px] sticky top-[54px] md:top-[40px] mb-[50px]">
          {mediumsList.map((m) => (
            <FilterAtlasList
              key={m}
              mediumName={m}
              onClick={() => filterMedium(m)}
              isActive={activeMedium === m}
            />
          ))}
        </ul>

        {/* --- Cards --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-body md:gap-[30px]">
          {ordered.map(p => (
            <AtlasCard key={p.id} atlas={p} onCardClick={handleCardClick} />
          ))}
        </div>


        {/* --- Lightbox --- */}
        <ImageLightboxAtlas imageData={imageData} toggleOpen={toggleOpen} closeLightbox={() => setToggleOpen(false)} />


      </div>
    </>
  );
};

export default Atlas;