import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MediaForm.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useState, useContext, useEffect } from "react";
import { AccordionContext } from "../../contexts/AccordionContext";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import {
  faArrowLeft,
  faArrowRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { addMedia, deleteMedia, getMedia } from "../../api/quotesApi";
import QuoteFormContext from "../../contexts/QuoteFormContext";
import Popup from "../atoms/Popup";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { quote_media } from "../../types/quotes";

const MediaForm = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const url = currentFile ? URL.createObjectURL(currentFile) : "";
  const accordionUpdate = useContext(AccordionContext);
  const [quote, setQuote, isEditing] = useContext(QuoteFormContext) ?? [
    null,
    null,
    null,
  ];
  const [mediasWithPathname, setMediasWithPathname] = useState<
    (quote_media & { pathname?: string; data?: Blob })[]
  >([]);
  const [mediaToPopup, setMediaToPopup] = useState(0);
  const [isActivePopup, setIsActivePopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setCurrentFile(fileList[0]);
    accordionUpdate();
  };
  const handleAddImage = () => {
    if (!currentFile) return;
    if (!quote || !("id" in quote)) return;

    addMedia(currentFile, quote.id)
      .then((res) => {
        setQuote({ ...quote, quote_medias: [...quote.quote_medias, res] });
        setSuccess("l' image à bien été enregistrée");
        setCurrentFile(null);
        accordionUpdate();
      })
      .catch((err) => setError(err));
  };
  const handleDelete = () => {
    const id = mediasWithPathname[mediaToPopup].id;
    deleteMedia(id).then(() => {
      //if delete successful then update current quote
      if (!quote || !("id" in quote)) return;
      setQuote({
        ...quote,
        quote_medias: quote.quote_medias.filter((el) => el.id !== id),
      });
      setMediasWithPathname(
        mediasWithPathname.filter((_, i) => i !== mediaToPopup),
      );
    });
  };
  const handleOpenPopup = (id: number) => {
    setMediaToPopup(id);
    setIsActivePopup(true);
  };
  const handleNextImage = () => {
    if (mediaToPopup < mediasWithPathname.length - 1)
      setMediaToPopup(mediaToPopup + 1);
  };
  const handlePreviousImage = () => {
    if (mediaToPopup > 0) setMediaToPopup(mediaToPopup - 1);
  };

  useEffect(() => {
    if (!quote?.quote_medias) return;
    if (quote.quote_medias.length === mediasWithPathname.length) return;

    const promises = quote.quote_medias.map((media) => getMedia(media.id));

    Promise.all(promises).then((res) => {
      setMediasWithPathname(
        quote.quote_medias.map((media, i) => ({
          ...media,
          pathname: URL.createObjectURL(res[i]),
          data: res[i],
        })),
      );
      accordionUpdate();
    });

    function free() {
      mediasWithPathname.forEach((el) => {
        if (!el.pathname) return;
        URL.revokeObjectURL(el.pathname);
      });
    }
    return free;
  }, [quote?.quote_medias, mediasWithPathname, accordionUpdate]);

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

  return (
    <fieldset className="mediaForm" key={"newImage" + currentFile?.name}>
      <section className="imagesGroup">
        {mediasWithPathname.map((el, id) => (
          <article className="card" key={`quoteImage${id}`}>
            <img
              src={el?.pathname ?? undefined}
              onClick={() => handleOpenPopup(id)}
            />
          </article>
        ))}
      </section>

      <article className="addCard card">
        {isEditing ? (
          <>
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
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddImage}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <p>Veuillez enregistrer le devis pour pouvoir ajouter des images</p>
        )}
      </article>
      <Popup isActive={isActivePopup} setIsActive={setIsActivePopup}>
        <img
          className="popupImage"
          src={mediasWithPathname[mediaToPopup]?.pathname ?? undefined}
          alt="image"
        />
        <div className="popupButtons">
          <button
            type="button"
            className="btn btn-danger btnArrow"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <div className="btnGroup">
            <button
              type="button"
              className="btn btn-primary btnArrow"
              onClick={handlePreviousImage}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              type="button"
              className="btn btn-primary btnArrow"
              onClick={handleNextImage}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button
              type="button"
              className="btn btn-danger btnArrow"
              onClick={() => setIsActivePopup(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      </Popup>
    </fieldset>
  );
};
export default MediaForm;
