import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditableSelect.scss";

const EditableSelect = ({
  values,
  defaultValue,
  onChange,
  label,
}: {
  values: string[];
  defaultValue: string;
  onChange: (a: string) => void;
  label?: string;
}) => {
  const [currentSection, setCurrentSection] = useState(defaultValue);
  const [newSection, setNewSection] = useState("");

  const handleAddSection = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setCurrentSection(newSection);
    onChange(newSection);
  };
  const handleChangeSection = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setCurrentSection(e.target.value);
    if (e.target.value !== "--Ajouter une section--") {
      onChange(e.target.value);
    }
  };

  return (
    <>
      <div>
        {label && <label htmlFor="edSelect">{label}</label>}
        <select
          name="edSelect"
          onChange={handleChangeSection}
          value={currentSection}
        >
          {values.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          {!values.includes(currentSection) && (
            <option key={currentSection} value={currentSection}>
              {currentSection}
            </option>
          )}
          {currentSection !== "--Ajouter une section--" && (
            <option value="--Ajouter une section--">
              --Ajouter une section--
            </option>
          )}
        </select>
      </div>
      {/*add new section*/}
      {currentSection === "--Ajouter une section--" && (
        <div>
          <input
            type="text"
            name="section"
            placeholder="Nouvelle section"
            autoFocus
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddSection}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      )}
    </>
  );
};
export default EditableSelect;
