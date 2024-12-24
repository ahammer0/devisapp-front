import WorkForm from "../molecules/WorkForm";
import WorksArray from "../molecules/WorksArray";
import MainTemplate from "../templates/MainTemplate";

const Works = () => {
  return (
    <MainTemplate>
      <WorksArray />
      <WorkForm />
    </MainTemplate>
  );
};
export default Works;
