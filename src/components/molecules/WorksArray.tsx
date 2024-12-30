import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getAllWorks } from "../../api/worksApi";
import { setWorks, selectWorks } from "../../redux/worksSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { work } from "../../types/works";
import DeleteWorkPopup from "./DeleteWorkPopup";

const WorksArray = () => {
  const [error, setError] = useState("");
  const [isNeedingRefresh, setIsNeedingRefresh] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<work | null>(null);
  const dispatch = useAppDispatch();
  const works = useAppSelector(selectWorks);

  useEffect(() => {
    if (works.length === 0) {
      setIsNeedingRefresh(true);
    }
  }, [works]);
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (!isNeedingRefresh) {
      return;
    }

    getAllWorks()
      .then((works) => {
        dispatch(setWorks(works));
      })
      .catch(() => {
        setError("Une erreur est survenue");
      });
  }, [isNeedingRefresh, dispatch]);

  const handleEdit = (workId: number) => {
    console.log("edition de " + workId);
  };
  return (
    <div>
      <h2>WorksArray</h2>
      <table>
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Prix/U</th>
            <th>Temps</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work) => (
            <tr key={work.id}>
              <td>{work.name}</td>
              <td>{work.unit_price}</td>
              <td>{work.unit_time}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(work.id)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setWorkToDelete(work)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteWorkPopup workToDelete={workToDelete} />
    </div>
  );
};
export default WorksArray;
