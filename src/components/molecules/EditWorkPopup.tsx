import { work } from "../../types/works";
import Popup from "../atoms/Popup";
import { useState, useEffect } from "react";
import WorkForm from "./WorkForm";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditWorkPopup = ({
  workToEdit,
  reset,
}: {
  workToEdit: work | null;
  reset: () => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (workToEdit) {
      setIsActive(true);
    }
  }, [workToEdit]);

  useEffect(() => {
    if (!isActive) {
      reset();
    }
  }, [isActive,reset]);

  if (!workToEdit) return;

  return (
    <Popup isActive={isActive} setIsActive={setIsActive}>
      <button onClick={() => setIsActive(false)} className="btn btn-secondary">
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <h1>Modifier un travail</h1>
      <WorkForm defaultWork={workToEdit} done={() => setIsActive(false)} />
    </Popup>
  );
};
export default EditWorkPopup;
