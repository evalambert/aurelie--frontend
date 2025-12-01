// FilterAtlasList.jsx

const FilterAtlasList = ({ mediumName, onClick }) => {
    return (
      <button
        className="px-3 py-1 bg-white border border-black hover:bg-black hover:text-white transition"
        onClick={onClick}
      >
        {mediumName}
      </button>
    );
  };
  
  export default FilterAtlasList;