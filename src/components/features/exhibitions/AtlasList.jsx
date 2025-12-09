//components/features/exhibitions/AtlasList.jsx

export default function AtlasList({ item, lang }) {
  return (
    <div className="exhibition--atlas-list flex flex-col md:gap-[10px]">
      {item.atlasRelation.length > 0 && (
        <h3>{lang === "fr" ? "Œuvres exposées :" : "Works exhibited :"}</h3>
      )}
      <div>
        {item.atlasRelation.map((work) => {
          // Crée un tableau avec les champs disponibles
          const fields = [
            work.title,
            work.technique,
            work.origin,
            work.year,
          ].filter(Boolean); // filtre les valeurs null ou undefined

          return <p key={work.id}>{fields.join(", ")}</p>;
        })}
      </div>
    </div>
  );
}
