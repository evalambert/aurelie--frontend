// src/components/features/atlas/FilterAtlasList.jsx

const FilterAtlasList = ({ mediumName, onClick, isActive }) => {
  // Fonction pour capitaliser seulement la première lettre
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <li className="group [&:not(:last-child)]:after:content-[','] flex items-center">
      <button
        className=" flex items-center gap-[5px] cursor-pointer"
        onClick={onClick}
      >
        <div
          className={`h-[12px] w-[12px] border border-black group-hover:bg-black ${
            isActive
              ? "bg-black" // ← style actif
              : "" // ← style inactif
          }`}
        ></div>
        {capitalizeFirstLetter(mediumName)}
      </button>
    </li>
  );
};

export default FilterAtlasList;
