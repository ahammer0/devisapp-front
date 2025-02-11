import WorkForm from "../molecules/WorkForm";
import WorksArray from "../molecules/WorksArray";
import MainTemplate from "../templates/MainTemplate";
import "./Works.scss";

const Works = () => {
  return (
    <MainTemplate>
      <h1>Travaux</h1>
      <div className="works">
        <WorksArray />
        <div>
          <h2>Ajout d' un travail</h2>
          <WorkForm />
        </div>
      </div>
    </MainTemplate>
  );
};
export default Works;
