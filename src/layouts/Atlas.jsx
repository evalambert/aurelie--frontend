// Atlas.jsx

import AtlasCard from "../components/features/atlas/AtlasCard.jsx";
import FilterAtlasList from "../components/features/atlas/FilterAtlasList.jsx";


const Atlas = ({ atlases, mediums }) => {

  return (
    <>
      <div class="wrapper-atlas py-y-body px-x-body bg-[#E0E0E0]">
        
        {mediums.map((p) => (
          <FilterAtlasList medium={p} />
        ))}
        {atlases.map((p) => (
          <AtlasCard atlas={p} />
        ))}
      </div>

    </>

  );
};

export default Atlas;


