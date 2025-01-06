import WorkForm from "../molecules/WorkForm";
import WorksArray from "../molecules/WorksArray";
import MainTemplate from "../templates/MainTemplate";

const Works = () => {
  return (
    <MainTemplate>
      <WorksArray />
      <h2>Ajout d' un travail</h2>
      <WorkForm />
    </MainTemplate>
  );
};
export default Works;
