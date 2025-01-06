import { quote_element_create } from "../../types/quotes";
import useWorks from "../../hooks/useWorks";
import { useContext, useState } from "react";
import QuoteFormContext from "../../contexts/QuoteFormContext";
import Popup from "../atoms/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

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

  function handleClickAction(quoteElement: quote_element_create) {
    setIsPopupOpen(true);
    setElToPopup(quoteElement);
  }
  return (
    <>
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
