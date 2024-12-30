import { useState, useEffect } from "react";
import { workCreate, work } from "../../types/works";
import { addWork, editWork } from "../../api/worksApi";

const WorkForm = ({ defaultWork }: { defaultWork?: work }) => {
  let emptyWork: workCreate = {
    name: "",
    unit: "",
    unit_price: 0,
    unit_time: 0,
    buy_price: 0,
    isFavorite: false,
    type: "template",
  };
  let isEditing = false;
  let id: number;
  if (defaultWork) {
    const { id: workid, user_id, ...rest } = defaultWork;
    emptyWork = rest;
    id = defaultWork.id;
    isEditing = true;
  }
  const [workToSave, setWorkToSave] = useState<workCreate>(emptyWork);
  const [error, setError] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
  };

  function changeWork<K extends keyof workCreate>(
    key: K,
    value: workCreate[K],
  ) {
    setWorkToSave({ ...workToSave, [key]: value });
  }

  useEffect(() => {
    if (isSaving) {
      if (isEditing) {
        editWork(id, workToSave)
          .then(() => {
            setError("");
            setIsSaving(false);
            setIsSuccess(true);
          })
          .catch((error) => {
            setError("Une erreur est survenue");
            setIsSaving(false);
          });
      } else {
        addWork(workToSave)
          .then(() => {
            setError("");
            setIsSaving(false);
            setIsSuccess(true);
          })
          .catch((error) => {
            setError("Une erreur est survenue");
            setIsSaving(false);
          });
      }
    }
  }, [isSaving]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div>
      <h1>Ajout d' un travail</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Désignation</label>
        <input
          type="text"
          name="name"
          id="name"
          value={workToSave.name}
          onChange={(e) => changeWork("name", e.target.value)}
        />

        <label htmlFor="unit">Unité (ex: m2,kg,...)</label>
        <input
          type="text"
          name="unit"
          id="unit"
          value={workToSave.unit}
          onChange={(e) => changeWork("unit", e.target.value)}
        />

        <label htmlFor="unit_price">Prix unitaire</label>
        <input
          type="number"
          name="unit_price"
          id="unit_price"
          value={workToSave.unit_price}
          onChange={(e) => changeWork("unit_price", parseFloat(e.target.value))}
        />

        <label htmlFor="unit_time">Main d' oeuvre par unité</label>
        <input
          type="number"
          name="unit_time"
          id="unit_time"
          value={workToSave.unit_time}
          onChange={(e) => changeWork("unit_time", parseFloat(e.target.value))}
        />

        <label htmlFor="buy_price">Prix d' achat</label>
        <input
          type="number"
          name="buy_price"
          id="buy_price"
          value={workToSave.buy_price}
          onChange={(e) => changeWork("buy_price", parseFloat(e.target.value))}
        />
        <div className="flex-row items-center justify-between">
          <div>
            <label htmlFor="isFavorite">Favoris</label>
            <input
              type="checkbox"
              name="isFavorite"
              id="isFavorite"
              checked={workToSave.isFavorite}
              onChange={(e) => changeWork("isFavorite", e.target.checked)}
            />
          </div>

          <div>
            <label htmlFor="type">type</label>
            <select
              name="type"
              id="type"
              value={workToSave.type}
              onChange={(e) =>
                changeWork(
                  "type",
                  e.target.value === "template" ? "template" : "custom",
                )
              }
            >
              <option value="template">template</option>
              <option value="custom">custom</option>
            </select>
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Enregistrer
          </button>
          {error && <p className="text-danger">{error}</p>}
          {isSaving && <p>En cours...</p>}
          {isSuccess && <p className="text-success">Enregistré</p>}
        </div>
      </form>
    </div>
  );
};
export default WorkForm;
