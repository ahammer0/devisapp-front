import { useState, useEffect, useMemo, useRef } from "react";
import { quote_full_create, quote_element_create } from "../../types/quotes";
import WorkTapCards from "../molecules/WorkTapCards";
import QuoteDetails from "../molecules/QuoteDetails";
import useQuotes from "../../hooks/useQuotes";
import { work } from "../../types/works";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
  if(quoteId) {
    console.log("on édite le devis no:", quoteId)
  }
  ////////////////////////////////////////////////////////
  //                                                    //
  //               STATES                               //
  //                                                    //
  ////////////////////////////////////////////////////////
  const [quoteToSave, setQuoteToSave] =
    useState<quote_full_create>(initialQuote);
  const [currentSection, setCurrentSection] = useState<string>("Sans Section");
  const categories: string[] = useMemo(() => {
    return quoteToSave.quote_elements.reduce((acc, el) => {
      if (!acc.includes(el.quote_section)) {
        return [...acc, el.quote_section];
      }
      return acc;
    }, [] as string[]);
  }, [quoteToSave]);
  const quotes = useQuotes();
  const isFirstRender = useRef(true);

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
    if (isFirstRender.current) {
      const ls = localStorage.getItem("quote");
      if(ls){
        setQuoteToSave(JSON.parse(ls));
      }
      isFirstRender.current = false;
    }
  },[])
  useEffect(() => {
    if(!isFirstRender.current){
      localStorage.setItem("quote", JSON.stringify(quoteToSave));
    }
  }, [quoteToSave]);

  ////////////////////////////////////////////////////////
  //                                                    //
  //               EVENT HANDLERS                       //
  //                                                    //
  ////////////////////////////////////////////////////////
  const handleSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    quotes.saveQuote(quoteToSave);
    console.log(quoteToSave);
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
      <div>QuoteForm</div>
      <WorkTapCards handleTap={(work) => addWork(work)} />

      {/*select existing sections*/}
      <div>
        <select onChange={handleChangeSection} value={currentSection}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          {!categories.includes(currentSection)&&
          <option key={currentSection} value={currentSection}>
            {currentSection}
          </option>}
        </select>
      </div>

      {/*add new section*/}
      <form onSubmit={handleAddSection}>
        <input type="text" name="section" placeholder="Nouvelle section" />
        <button className="btn btn-primary" type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>

      {/*display quotes elements by sections*/}
      {categories.map((category) => (
        <div key={category}>
          <h3>Section: {category ?? "sans section"}</h3>
          <QuoteDetails
            quoteElements={quoteToSave.quote_elements.filter(
              (el) => el.quote_section === category,
            )}
          />
        </div>
      ))}

      {/*general quotes infos form*/}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="general_infos">Infos gérérales</label>
          <textarea name="general_infos" ></textarea>
        </div>
        <div>
          <label htmlFor="global_discount">Remise générale</label>
          <input type="number" name="global_discount" />
        </div>
        <div>
          <label htmlFor="expires_at">Date d'expiration</label>
          <input
            type="date"
            name="global_discount"
            value={quoteToSave.expires_at}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
        {quotes.error && <p className="error">{quotes.error}</p>}
        {quotes.isSaving && <p>Saving...</p>}
      </form>
    </>
  );
};

export default QuoteForm;
