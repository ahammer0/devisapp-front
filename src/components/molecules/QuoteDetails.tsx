import { quote_element_create } from "../../types/quotes";
import useWorks from "../../hooks/useWorks";
import { useContext, useState } from "react";
import QuoteFormContext from "../../contexts/QuoteFormContext";
import Popup from "../atoms/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlus,
  faMinus,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import EditableText from "../atoms/EditableText";

/**
 * need to be placed in quoteformContext
 */
const QuoteDetails = ({
  quoteElements,
}: {
  quoteElements: quote_element_create[];
}) => {
  const works = useWorks();
  const formContext = useContext(QuoteFormContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [elToPopup, setElToPopup] = useState<null | quote_element_create>(null);
  const [isEditSectionName, setIsEditSectionName] = useState(false);

  //check if placed in right context
  if (!formContext) {
    throw new Error("QuoteFormContext not found");
  }
  const [quote, setQuote] = formContext;

  function setQuantity(quantity: number) {
    if (quantity === 0) {
      rmQuoteElement();
      return;
    }
    if (!elToPopup) return;
    setQuote({
      ...quote,
      quote_elements: quote.quote_elements.map((quoteEl) =>
        quoteEl.work_id === elToPopup.work_id &&
        quoteEl.quote_section === elToPopup.quote_section
          ? { ...quoteEl, quantity }
          : quoteEl,
      ),
    });

    setElToPopup({ ...elToPopup, quantity });
  }
  function rmQuoteElement() {
    if (!elToPopup) return;
    setQuote({
      ...quote,
      quote_elements: quote.quote_elements.filter(
        (quoteEl) =>
          quoteEl.work_id !== elToPopup.work_id ||
          quoteEl.quote_section !== elToPopup.quote_section,
      ),
    });
    setIsPopupOpen(false);
  }
  function updateSectionName(newName: string) {
    const currentSection = quoteElements[0].quote_section;
    setQuote({
      ...quote,
      quote_elements: quote.quote_elements.reduce((acc, quoteEl) => {
        // if not in current section don't touch
        if (
          quoteEl.quote_section !== currentSection &&
          quoteEl.quote_section !== newName
        ) {
          return [...acc, quoteEl];
        }

        //check if not already exists
        const id = acc.findIndex(
          (el) =>
            el.quote_section === newName && el.work_id === quoteEl.work_id,
        );
        if (id !== -1) {
          //if exists update
          return acc.map((el, i) => {
            if (i === id) {
              return { ...el, quantity: el.quantity + quoteEl.quantity };
            }
            return el;
          });
        }

        //else return with new name
        return [...acc, { ...quoteEl, quote_section: newName }];
      }, [] as quote_element_create[]),
    });
  }

  function handleClickAction(quoteElement: quote_element_create) {
    setIsPopupOpen(true);
    setElToPopup(quoteElement);
  }
  function handleEditSectionName(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setIsEditSectionName(false);
  }
  function handlesetEditSectionOn(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setIsEditSectionName(true);
  }
  return (
    <>
      <form onSubmit={handleEditSectionName} className="flex-row items-center">
        <h3 className="flex-row items-center">
          Section:{" "}
          <EditableText
            isEditMode={isEditSectionName}
            startValue={quoteElements[0].quote_section ?? "sans section"}
            onModeSwitch={(name) => updateSectionName(name)}
          >
            {quoteElements[0].quote_section ?? "sans section"}
          </EditableText>
        </h3>
        {isEditSectionName ? (
          <button className="btn btn-secondary" type="submit">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handlesetEditSectionOn}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        )}
      </form>
      <table>
        <tbody>
          <tr>
            <th>Designation</th>
            <th>Quantité</th>
            <th className="actions">Actions</th>
          </tr>
          {quoteElements.map((quoteElement) => (
            <tr key={`${quoteElement.work_id}-${quoteElement.quote_section}`}>
              <td>
                {
                  works.works.find((work) => work.id === quoteElement.work_id)
                    ?.name
                }
              </td>
              <td>{quoteElement.quantity}</td>
              <td className="actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleClickAction(quoteElement)}
                >
                  &bull;&bull;&bull;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Popup isActive={isPopupOpen} setIsActive={setIsPopupOpen}>
        <button
          onClick={() => setIsPopupOpen(false)}
          className="btn btn-secondary"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {elToPopup && (
          <>
            <p>
              {elToPopup.quote_section}--
              {works.works.find((work) => work.id === elToPopup.work_id)?.name}
            </p>
            <div className="flex-row items-center">
              <button
                className="btn btn-primary"
                onClick={() => setQuantity(elToPopup.quantity - 1)}
                disabled={elToPopup.quantity === 0}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <form>
                <label htmlFor="quantity">Quantité</label>
                <input
                  type="number"
                  id="quantity"
                  value={elToPopup.quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </form>
              <button
                className="btn btn-primary"
                onClick={() => setQuantity(elToPopup.quantity + 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <button className="btn btn-danger" onClick={() => rmQuoteElement()}>
              Supprimer
            </button>
          </>
        )}
      </Popup>
    </>
  );
};

export default QuoteDetails;
