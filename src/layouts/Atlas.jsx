// src/layouts/Atlas.jsx
import React, { useState } from "react";
import AtlasCard from "../components/features/atlas/AtlasCard.jsx";
import FilterAtlasList from "../components/features/atlas/FilterAtlasList.jsx";
import ImageLightboxAtlas from "../components/features/atlas/ImageLightboxAtlas.jsx";

const Atlas = ({ atlases, lang }) => {
  // Filtres •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
  // --- 1. État principal : les données filtrées ---
  const [filtered, setFiltered] = useState(atlases);
  const [activeMedium, setActiveMedium] = useState("all");
  const [activeTerritory, setActiveTerritory] = useState("all");

  // Helper de traduction all/tous
  const t = (key, lang) => {
    const translations = {
      all: {
        fr: "tous",
        en: "all",
      },
    };

    return translations[key]?.[lang] || key;
  };

  // --- 2. Construction des mediums à partir des atlases (triés par index) ---
  const mediumsMap = new Map();
  atlases.forEach((a) => {
    if (a.medium?.medium) {
      const mediumName = a.medium.medium;
      // Garde le medium avec l'index le plus bas si plusieurs occurrences
      if (
        !mediumsMap.has(mediumName) ||
        (a.medium.index !== null &&
          (mediumsMap.get(mediumName).index === null ||
            Number(a.medium.index) < Number(mediumsMap.get(mediumName).index)))
      ) {
        mediumsMap.set(mediumName, a.medium);
      }
    }
  });

  const mediumsList = [
    "all",
    ...Array.from(mediumsMap.values())
      .sort((a, b) => {
        // Si les deux ont un index, trier par index
        if (a.index !== null && b.index !== null) {
          return Number(a.index) - Number(b.index);
        }
        // Si seul a a un index, a vient avant
        if (a.index !== null && b.index === null) return -1;
        // Si seul b a un index, b vient avant
        if (a.index === null && b.index !== null) return 1;
        // Si aucun n'a d'index, garder l'ordre alphabétique
        return a.medium.localeCompare(b.medium);
      })
      .map((m) => m.medium),
  ];

  // --- 3. Construction des territories à partir des atlases (triés par index) ---
  const territoriesMap = new Map();
  atlases.forEach((a) => {
    if (a.territory) {
      // Supporte les deux formats : objet avec territory.territory ou chaîne directe
      const territoryObj =
        typeof a.territory === "object"
          ? a.territory
          : { territory: a.territory, index: null };
      const territoryName = territoryObj.territory || a.territory;
      // Garde le territory avec l'index le plus bas si plusieurs occurrences
      if (
        !territoriesMap.has(territoryName) ||
        (territoryObj.index !== null &&
          (territoriesMap.get(territoryName).index === null ||
            Number(territoryObj.index) <
              Number(territoriesMap.get(territoryName).index)))
      ) {
        territoriesMap.set(territoryName, territoryObj);
      }
    }
  });

  const territoriesList = [
    "all",
    ...Array.from(territoriesMap.values())
      .sort((a, b) => {
        // Si les deux ont un index, trier par index
        if (a.index !== null && b.index !== null) {
          return Number(a.index) - Number(b.index);
        }
        // Si seul a a un index, a vient avant
        if (a.index !== null && b.index === null) return -1;
        // Si seul b a un index, b vient avant
        if (a.index === null && b.index !== null) return 1;
        // Si aucun n'a d'index, garder l'ordre alphabétique
        const nameA = a.territory || a;
        const nameB = b.territory || b;
        return String(nameA).localeCompare(String(nameB));
      })
      .map((t) => t.territory || t),
  ];

  // --- 4. Fonction de filtre combiné ---
  const applyFilters = (medium, territory) => {
    let result = atlases;

    // Filtre par medium
    if (medium !== "all") {
      result = result.filter((a) => a.medium?.medium === medium);
    }

    // Filtre par territory
    if (territory !== "all") {
      result = result.filter((a) => {
        const atlasTerritory = a.territory?.territory || a.territory;
        return atlasTerritory === territory;
      });
    }

    setFiltered(result);
  };

  // --- 5. Fonctions de filtre individuelles ---
  const filterMedium = (medium) => {
    setActiveMedium(medium);
    applyFilters(medium, activeTerritory);
  };

  const filterTerritory = (territory) => {
    setActiveTerritory(territory);
    applyFilters(activeMedium, territory);
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

  const allById = new Map(filtered.map((item) => [item.id, item]));

  const ordered = [];
  const idsToSkip = new Set();

  filtered.forEach((item) => {
    if (idsToSkip.has(item.id)) return;

    ordered.push(item);
    idsToSkip.add(item.id);

    if (item.siblings?.length) {
      item.siblings.forEach((sib) => {
        const fullSibling = allById.get(sib.id) || sib;

        // ⛔️ NE PAS AJOUTER le sibling si son medium ne correspond pas au filtre
        if (
          activeMedium !== "all" &&
          fullSibling.medium?.medium !== activeMedium
        ) {
          return;
        }

        // ⛔️ NE PAS AJOUTER le sibling si son territory ne correspond pas au filtre
        if (activeTerritory !== "all") {
          const siblingTerritory =
            fullSibling.territory?.territory || fullSibling.territory;
          if (siblingTerritory !== activeTerritory) {
            return;
          }
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
      <div className="wrapper-atlas pt-header-height py-y-body px-x-body bg-[#E0E0E0] min-h-screen">
        <div className="sticky top-[60px] lg:top-[40px] z-50">
          {/* --- Filters Medium --- */}
          <div className="filter-medium flex gap-[10px]">
            <p>{lang === "fr" ? "supports :" : "mediums :"}</p>
            <ul className="filters flex flex-wrap gap-x-[10px] gap-y-[3px] lg:top-[40px] mb-[5px]">
              {mediumsList.map((m) => (
                <FilterAtlasList
                  key={m}
                  mediumName={m === "all" ? t("all", lang) : m}
                  onClick={() => filterMedium(m)} // ⚠️ valeur interne inchangée
                  isActive={activeMedium === m}
                />
              ))}
            </ul>
          </div>

          {/* --- Filters Territory --- */}
          <div className="filter-territory flex gap-[10px]">
            <p>{lang === "fr" ? "territoires :" : "territories :"}</p>
            <ul className="filters flex flex-wrap gap-x-[10px] gap-y-[3px] lg:top-[40px] mb-[35px]">
              {territoriesList.map((tItem) => (
                <FilterAtlasList
                  key={tItem}
                  mediumName={tItem === "all" ? t("all", lang) : tItem}
                  onClick={() => filterTerritory(tItem)}
                  isActive={activeTerritory === tItem}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* --- Cards --- */}
        <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-x-body lg:gap-[30px]">
          {ordered.map((p) => (
            <AtlasCard key={p.id} atlas={p} onCardClick={handleCardClick} />
          ))}
        </div>

        {/* --- Lightbox --- */}
        <ImageLightboxAtlas
          imageData={imageData}
          toggleOpen={toggleOpen}
          closeLightbox={() => setToggleOpen(false)}
        />
      </div>
    </>
  );
};

export default Atlas;
