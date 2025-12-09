// src/components/features/atlas/FilterAtlasList.jsx

const FilterAtlasList = ({ mediumName, onClick, isActive }) => {
  return (
    <li className="group [&:not(:last-child)]:after:content-[','] flex items-center">
      <button
        className="lowercase flex items-center gap-[5px] cursor-pointer"
        onClick={onClick}
      >
        <div
          className={`h-[12px] w-[12px] border border-black group-hover:bg-black ${
            isActive
              ? "bg-black" // ← style actif
              : "" // ← style inactif
          }`}
        ></div>
        {mediumName}
      </button>
    </li>
  );
};

export default FilterAtlasList;
