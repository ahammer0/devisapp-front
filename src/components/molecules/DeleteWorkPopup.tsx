import { deleteWork } from "../../api/worksApi";
import { work } from "../../types/works";
import Popup from "../atoms/Popup";
import { useAppDispatch } from "../../redux/hooks";
import { setWorks } from "../../redux/worksSlice";
import { getAllWorks } from "../../api/worksApi";
import { useState, useEffect } from "react";

const DeleteWorkPopup = ({
  workToDelete,
  reset,
}: {
  workToDelete: work | null;
  reset: () => void;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (workToDelete) {
      setIsActive(true);
    }
  }, [workToDelete]);

  useEffect(() => {
    if (!isActive) {
      reset();
    }
  }, [isActive]);

  const handleDelete = () => {
    if (!workToDelete) return;
    deleteWork(workToDelete.id)
      .then(() => {
        reset();
        setIsActive(false);
        getAllWorks()
          .then((works) => {
            dispatch(setWorks(works));
          })
          .catch(() => {
            setError("Une erreur est survenue");
          });
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
