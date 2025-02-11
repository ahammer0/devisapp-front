import useWorks from "../../hooks/useWorks";
import { work } from "../../types/works";
import "./WorkTapCards.scss";
const WorkTapCards = ({ handleTap }: { handleTap: (work: work) => void }) => {
  const works = useWorks();

  return (
    <div className="workTapCards">
      <div>
        {" "}
        <h2>Ajouter des éléments</h2>
      </div>
      {works.error && <p className="error">{works.error}</p>}
      {works.isLoading && <p>Loading...</p>}
      <div className="cardGroup">
        {works.works.map((work) => (
          <button
            type="button"
            className="btn btn-secondary btn-outline tapCard"
            key={work.id}
            onClick={() => handleTap(work)}
          >
            {work.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkTapCards;
