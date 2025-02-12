import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import DeleteWorkPopup from "./DeleteWorkPopup";
import useWorks from "../../hooks/useWorks";
import "./WorksArray.scss";

import { work } from "../../types/works";
import EditWorkPopup from "./EditWorkPopup";

const WorksArray = () => {
  const [workToPopup, setWorkToPopup] = useState<work | null>(null);
  const [isActiveDeletePopup, setIsActiveDeletePopup] = useState(false);
  const [isActiveEditPopup, setIsActiveEditPopup] = useState(false);

  const works = useWorks();

  const handleClickEdit = (e: React.MouseEvent, work: work) => {
    e.stopPropagation();
    setIsActiveEditPopup(true);
    setWorkToPopup(work);
  };
  const handleClickDelete = (e: React.MouseEvent, work: work) => {
    e.stopPropagation();
    setIsActiveDeletePopup(true);
    setWorkToPopup(work);
  };

  return (
    <div className="worksArray">
      <h2>Liste des travaux</h2>
      {works.error && <p className="error">{works.error}</p>}
      {works.isLoading && <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Prix/U</th>
            <th>Temps</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {works.works.map((work) => (
            <tr key={work.id} onClick={(e) => handleClickEdit(e, work)}>
              <td>{work.name}</td>
              <td>{work.unit_price}</td>
              <td>{work.unit_time}</td>
              <td className="actions">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleClickEdit(e, work)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleClickDelete(e, work)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*Popups*/}
      <DeleteWorkPopup
        workToDelete={workToPopup}
        isActive={isActiveDeletePopup}
        setIsActive={setIsActiveDeletePopup}
      />
      <EditWorkPopup
        workToEdit={workToPopup}
        isActive={isActiveEditPopup}
        setIsActive={setIsActiveEditPopup}
      />
    </div>
  );
};
export default WorksArray;
