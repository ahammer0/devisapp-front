import WorkForm from "../molecules/WorkForm";
import WorksArray from "../molecules/WorksArray";
import MainTemplate from "../templates/MainTemplate";

const Works = () => {
  return (
    <MainTemplate>
      <WorksArray />
      <h1>Ajout d' un travail</h1>
      <WorkForm />
    </MainTemplate>
  );
};
export default Works;
