import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import DeleteWorkPopup from "./DeleteWorkPopup";
import useWorks from "../../hooks/useWorks";

import { work } from "../../types/works";

const WorksArray = () => {
  const [workToDelete, setWorkToDelete] = useState<work | null>(null);
  const [displayDeletePopup, setDisplayDeletePopup] = useState(false);

  const works = useWorks();

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
          {works.works.map((work) => (
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
      <DeleteWorkPopup
        workToDelete={workToDelete}
        reset={() => {
          setWorkToDelete(null);
          console.log("reset");
        }}
      />
    </div>
  );
};
export default WorksArray;
