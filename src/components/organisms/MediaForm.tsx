import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MediaForm.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useState, useContext, useEffect } from "react";
import { AccordionContext } from "../../contexts/AccordionContext";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { addMedia, deleteMedia, getMedia } from "../../api/quotesApi";
import QuoteFormContext from "../../contexts/QuoteFormContext";
import Popup from "../atoms/Popup";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

const MediaForm = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const url = currentFile ? URL.createObjectURL(currentFile) : "";
  const accordionUpdate = useContext(AccordionContext);
  const [quote, setQuote, _isEditing] = useContext(QuoteFormContext) ?? [
    null,
    null,
    null,
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setCurrentFile(fileList[0]);
  };
  const handleAddImage = () => {
    if (!currentFile) return;
    if (!quote || !("id" in quote)) return;

    addMedia(currentFile, quote.id)
      .then((res) => {
        setQuote({ ...quote, quote_medias: [...quote.quote_medias, res] });
        setSuccess("l' image à bien été enregistrée");
        setCurrentFile(null);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(""), 5000);
    return () => clearTimeout(timer);
  }, [success]);
  useEffect(() => accordionUpdate(), [currentFile]);

  return (
    <fieldset className="mediaForm" key={"newImage" + currentFile?.name}>
      <section className="imagesGroup">
        {quote &&
          quote.quote_medias.map((el) => (
            <article className="card" key={`quoteImage${el.id}`}>
              <Image id={el.id} />
            </article>
          ))}
      </section>

      <article className="addCard card">
        {!currentFile && (
          <>
            <label className="flex-center" htmlFor="newImage">
              Ajouter une image
            </label>
            <div className="flex-center">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </>
        )}
        {currentFile && <img src={url} alt="image uploadée" />}
        <div className="flex-row items-center">
          <input
            type="file"
            name="newImage"
            accept="image/*"
            onChange={handleChange}
          />
          {currentFile && (
            <>
              {success && <p>{success}</p>}
              {error && <p>{error}</p>}
              <div>
                <button className="btn btn-primary" onClick={handleAddImage}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </>
          )}
        </div>
      </article>
    </fieldset>
  );
};
export default MediaForm;

const Image = ({ id }: { id: number }) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [isActivePopup, setIsActivePopup] = useState(false);
  const accordionUpdate = useContext(AccordionContext);
  const [quote, setQuote, isEditing] = useContext(QuoteFormContext) ?? [
    null,
    null,
    null,
  ];
  let pathname;
  if (file) {
    pathname = URL.createObjectURL(file);
  }
  useEffect(() => {
    getMedia(id).then((res) => {
      setFile(res);
    });
  }, []);
  useEffect(() => accordionUpdate(), [file]);

  const handleDelete = () => {
    deleteMedia(id).then(() => {
      //if delete successful then update current quote
      if (!quote || !("id" in quote)) return;
      setQuote({
        ...quote,
        quote_medias: quote.quote_medias.filter((el) => el.id !== id),
      });
    });
  };

  return (
    <div>
      <img src={pathname} onClick={() => setIsActivePopup(true)} />
      <Popup isActive={isActivePopup} setIsActive={setIsActivePopup}>
        <button
          className="btn btn-danger"
          onClick={() => setIsActivePopup(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <img src={pathname} alt="image" />
        <button className="btn btn-danger" onClick={handleDelete}>
          Supprimer
        </button>
      </Popup>
    </div>
  );
};
