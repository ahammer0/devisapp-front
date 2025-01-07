import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  quote_full_create,
  quote_element_create,
  full_quote,
} from "../../types/quotes";
import WorkTapCards from "../molecules/WorkTapCards";
import QuoteDetails from "../molecules/QuoteDetails";
import useQuotes from "../../hooks/useQuotes";
import QuoteFormContext from "./../../contexts/QuoteFormContext";
import { work } from "../../types/works";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuoteForm = ({ quoteId }: { quoteId?: number }) => {
  const initialQuote: quote_full_create = {
    global_discount: 0,
    general_infos: "",
    status: "draft",
    quote_elements: [],
    quote_medias: [],
    expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  };
  ////////////////////////////////////////////////////////
  //                                                    //
  //               STATES                               //
  //                                                    //
  ////////////////////////////////////////////////////////
  const quotes = useQuotes();
  if (!quotes.quotes) return null;
  const isEditing = useMemo(() => quoteId !== undefined, [quoteId]);
  const [quoteToSave, setQuoteToSave] =
    useState<quote_full_create>(initialQuote);
  const [currentSection, setCurrentSection] = useState<string>("Sans Section");
  const categories = useMemo(() => {
    return quoteToSave.quote_elements.reduce((acc, el) => {
      if (!acc.includes(el.quote_section)) {
        return [...acc, el.quote_section];
      }
      return acc;
    }, [] as string[]);
  }, [quoteToSave]);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  ////////////////////////////////////////////////////////
  //                                                    //
  //               FUNCTIONS                            //
  //                                                    //
  ////////////////////////////////////////////////////////
  const addWork = (work: work) => {
    // Check if increment quantity or create new element
    const elId = quoteToSave.quote_elements.findIndex(
      (el) => el.work_id === work.id && el.quote_section === currentSection,
    );
    if (elId !== -1) {
      setQuoteToSave((state) => {
        const newel = {
          ...state.quote_elements[elId],
          quantity: state.quote_elements[elId].quantity + 1,
        };
        const newelements = [
          ...state.quote_elements.filter((el, id) => id !== elId),
          newel,
        ];
        return { ...state, quote_elements: [...newelements] };
      });
      return;
    }

    setQuoteToSave({
      ...quoteToSave,
      quote_elements: [
        ...quoteToSave.quote_elements,
        {
          work_id: work.id,
          quote_section: currentSection,
          quantity: 1,
          discount: 0,
        },
      ],
    });
  };

  ////////////////////////////////////////////////////////
  //                                                    //
  //               EFFECTS                              //
  //                                                    //
  ////////////////////////////////////////////////////////

  // Persistent state using localStorage
  useEffect(() => {
    if (isEditing) return;
    if (isFirstRender.current) {
      const ls = localStorage.getItem("quote");
      if (ls) {
        setQuoteToSave(JSON.parse(ls));
      }
      isFirstRender.current = false;
    }
  }, []);
  useEffect(() => {
    if (isEditing) return;
    if (!isFirstRender.current) {
      localStorage.setItem("quote", JSON.stringify(quoteToSave));
    }
  }, [quoteToSave]);

  // Redirect on success
  useEffect(() => {
    if (quotes.success) {
      navigate("/quotes");
    }
  }, [quotes.success]);

  // if edit mode then load the quote
  useEffect(() => {
    if (isEditing) {
      const quote = quotes.quotes.find((q) => q.id === quoteId);
      if (quote) {
        setQuoteToSave(quote);
      }
    }
  }, [isEditing, quoteId, quotes.quotes]);

  ////////////////////////////////////////////////////////
  //                                                    //
  //               EVENT HANDLERS                       //
  //                                                    //
  ////////////////////////////////////////////////////////
  const handleSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    if (isEditing) {
      quotes.edit(quoteToSave as full_quote);
    } else {
      quotes.saveQuote(quoteToSave);
    }
    localStorage.removeItem("quote");
  };
  const handleAddSection = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setCurrentSection(e.target[0].value);
  };
  const handleChangeSection = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setCurrentSection(e.target.value);
  };
  const handleReset = () => {
    setQuoteToSave(initialQuote);
  };

  return (
    <>
      <QuoteFormContext.Provider
        value={[quoteToSave, setQuoteToSave, isEditing]}
      >
        <WorkTapCards handleTap={(work) => addWork(work)} />
        <hr />

        {/*select existing sections*/}
        <form>
          <select onChange={handleChangeSection} value={currentSection}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            {!categories.includes(currentSection) && (
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

        {/*display quotes elements by sections*/}
        {categories.map((category) => (
          <div key={category}>
            <QuoteDetails
              quoteElements={quoteToSave.quote_elements.filter(
                (el) => el.quote_section === category,
              )}
            />
          </div>
        ))}

        <hr />
        {/*general quotes infos form*/}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="general_infos">Infos gérérales</label>
            <textarea
              name="general_infos"
              onChange={(e) =>
                setQuoteToSave({
                  ...quoteToSave,
                  general_infos: e.target.value,
                })
              }
              value={quoteToSave.general_infos}
            ></textarea>
          </div>
          <div>
            <label htmlFor="global_discount">Remise générale (%)</label>
            <input
              type="number"
              name="global_discount"
              value={quoteToSave.global_discount}
              onChange={(e) =>
                setQuoteToSave({
                  ...quoteToSave,
                  global_discount: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div>
            <label htmlFor="expires_at">Date d'expiration</label>
            <input
              type="date"
              name="global_discount"
              defaultValue={quoteToSave.expires_at}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            <FontAwesomeIcon icon={faFloppyDisk} /> Enregistrer
          </button>
          {!isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
          {quotes.error && <p className="error">{quotes.error}</p>}
          {quotes.isSaving && <p>Saving...</p>}
        </form>
      </QuoteFormContext.Provider>
    </>
  );
};

export default QuoteForm;
