import useWorks from "../../hooks/useWorks";
import { work } from "../../types/works";
const WorkTapCards = ({ handleTap }: { handleTap: (work: work) => void }) => {
  const works = useWorks();

  return (
    <div>
      <h2>Ajouter des éléments</h2>
      {works.error && <p className="error">{works.error}</p>}
      {works.isLoading && <p>Loading...</p>}
      {works.works.map((work) => (
        <button
          className="btn btn-secondary btn-outline"
          key={work.id}
          onClick={() => handleTap(work)}
        >
          {work.name}
        </button>
      ))}
    </div>
  );
};

export default WorkTapCards;
