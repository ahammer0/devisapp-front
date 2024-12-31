import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import DeleteWorkPopup from "./DeleteWorkPopup";
import useWorks from "../../hooks/useWorks";

import { work } from "../../types/works";
import EditWorkPopup from "./EditWorkPopup";

const WorksArray = () => {
  const [workToDelete, setWorkToDelete] = useState<work | null>(null);
  const [workToEdit, setWorkToEdit] = useState<work | null>(null);

  const works = useWorks();

  return (
    <div>
      <h2>WorksArray</h2>
      {works.error && <p className="error">{works.error}</p>}
      {works.isLoading && <p>Loading...</p>}
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
          {works.works.map((work) => (
            <tr key={work.id}>
              <td>{work.name}</td>
              <td>{work.unit_price}</td>
              <td>{work.unit_time}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => setWorkToEdit(work)}
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

      {/*Popups*/}
      <DeleteWorkPopup
        workToDelete={workToDelete}
        reset={() => {
          setWorkToDelete(null);
        }}
      />
      <EditWorkPopup
        workToEdit={workToEdit}
        reset={() => {
          setWorkToEdit(null);
        }}
      />
    </div>
  );
};
export default WorksArray;
