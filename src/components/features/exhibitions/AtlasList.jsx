//components/features/exhibitions/AtlasList.jsx

export default function AtlasList({ item, lang }) {
  return (
    <div className="exhibition--atlas-list flex flex-col md:gap-[10px]">
      {item.atlasRelation.length > 0 && (
        <h3>{lang === "fr" ? "Œuvres exposées :" : "Works exhibited :"}</h3>
      )}
      <div>
        {item.atlasRelation?.map((work) => {
          if (!work.Image) return null;
          const url =
            work.Image.formats?.small?.url ||
            work.Image.formats?.medium?.url ||
            work.Image.url;
          // Crée un tableau avec les champs disponibles
          const fields = [
            work.title,
            work.technique,
            work.origin,
            work.year,
          ].filter(Boolean); // filtre les valeurs null ou undefined

          return (
            <>
            <p key={work.id}>{fields.join(", ")}</p>
            <img src={url} class="w-[100px] h-auto border" alt={work.title} />
            </>
          );
        })}
      </div>
    </div>
  );
}
