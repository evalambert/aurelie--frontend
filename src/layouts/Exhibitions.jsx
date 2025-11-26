//layouts/Exhibitions.jsx

export default function Exhibitions({ data, lang }) {
  return (
    <>
      <h2 className="text-amber-300">Exhibition</h2>
      <ul>
        {data.map((p) => (
          <li key={p.id}>
            <p>{p.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
