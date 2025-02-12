import { deleteWork } from "../../api/worksApi";
import { work } from "../../types/works";
import Popup from "../atoms/Popup";
import { useState } from "react";
import useWorks from "../../hooks/useWorks";

const DeleteWorkPopup = ({
  workToDelete,
  isActive,
  setIsActive,
}: {
  workToDelete: work | null;
  isActive: boolean;
  setIsActive: (a: boolean) => void;
}) => {
  const [error, setError] = useState("");

  const works = useWorks();

  const handleDelete = () => {
    if (!workToDelete) return;
    deleteWork(workToDelete.id)
      .then(() => {
        works.doRefresh();
        setIsActive(false);
      })
      .catch(() => {
        setError("Une erreur est survenue");
      });
  };

  return (
    <Popup isActive={isActive} setIsActive={setIsActive}>
      <p>Supprimer {workToDelete?.name} ?</p>
      <button
        className="btn btn-secondary btn-outline"
        onClick={() => setIsActive(false)}
      >
        Annuler
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Confirmer
      </button>
      {error && <p className="text-danger">{error}</p>}
    </Popup>
  );
};
export default DeleteWorkPopup;
