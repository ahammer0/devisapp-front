import { work } from "../../types/works";
import Popup from "../atoms/Popup";
import WorkForm from "./WorkForm";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditWorkPopup = ({
  workToEdit,
  isActive,
  setIsActive,
}: {
  workToEdit: work | null;
  isActive: boolean;
  setIsActive: (a: boolean) => void;
}) => {
  if (!workToEdit) return;

  return (
    <Popup isActive={isActive} setIsActive={setIsActive}>
      <div className="popupButtons">
        <button
          onClick={() => setIsActive(false)}
          className="btn btn-danger btnArrow"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <h1>Modifier un travail</h1>
      <WorkForm defaultWork={workToEdit} done={() => setIsActive(false)} />
    </Popup>
  );
};
export default EditWorkPopup;
