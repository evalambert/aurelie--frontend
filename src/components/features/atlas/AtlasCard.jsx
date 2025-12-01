// AtlasCard.jsx

const AtlasCard = ({ id, atlas }) => {
    const medium = atlas.medium;

    return (
        <div id={`atlas-${id}`}>
            <p>{atlas.title}</p>
            {medium && <p>({medium.medium})</p>}
        </div>
    );
};

export default AtlasCard;