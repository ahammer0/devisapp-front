import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const handleAddSection = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setCurrentSection(e.target[0].value);
    onChange(e.target[0].value);
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
      <form>
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
      </form>
      {/*add new section*/}
      {currentSection === "--Ajouter une section--" && (
        <form onSubmit={handleAddSection}>
          <input
            type="text"
            name="section"
            placeholder="Nouvelle section"
            autoFocus
          />
          <button className="btn btn-primary" type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
      )}
    </>
  );
};
export default EditableSelect;
