import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  quote_full_create,
  full_quote,
  quote_element,
  quote_element_create,
} from "../../types/quotes";
import { work } from "../../types/works";
import EditableSelect from "../atoms/EditableSelect";
import WorkTapCards from "../molecules/WorkTapCards";
import QuoteDetails from "../molecules/QuoteDetails";
import CustomerForm from "../molecules/CustomerForm";
import useQuotes from "../../hooks/useQuotes";
import useWorks from "../../hooks/useWorks";
import QuoteFormContext from "./../../contexts/QuoteFormContext";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toFormDateString } from "../../helpers/dateFormat";
import Accordion from "../atoms/Accordion";
import MediaForm from "../organisms/MediaForm";

const QuoteForm = ({ quoteId }: { quoteId?: number }) => {
  const initialQuote: quote_full_create = {
    global_discount: 0,
    general_infos: "",
    status: "draft",
    quote_elements: [],
    quote_medias: [],
    customer: null,
    expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  };
  ////////////////////////////////////////////////////////
  //                                                    //
  //               STATES                               //
  //                                                    //
  ////////////////////////////////////////////////////////
  const quotes = useQuotes();
  const isEditing = useMemo(() => quoteId !== undefined, [quoteId]);
  const [quoteToSave, setQuoteToSave] = useState<
    quote_full_create | full_quote
  >(initialQuote);
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
  const works = useWorks();

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
          ...state.quote_elements.filter((_el, id) => id !== elId),
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
          vat: 10,
          quantity: 1,
          discount: 0,
        },
      ],
    });
  };
  const getQuoteTotalTTC = (
    quote_elements: quote_element[] | quote_element_create[],
    global_discount = 0,
  ) => {
    const total =
      ((100 - global_discount) / 100) *
      quote_elements.reduce((total, el) => {
        const work = works.works.find((el2) => el2.id === el.work_id);
        if (!work) {
          return total;
        }
        return (
          total +
          ((el.quantity * (100 - el.discount)) / 100) *
            work.unit_price *
            (1 + el.vat / 100)
        );
      }, 0.0);
    return total;
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
  }, [isEditing]);
  useEffect(() => {
    if (isEditing) return;
    if (!isFirstRender.current) {
      localStorage.setItem("quote", JSON.stringify(quoteToSave));
    }
  }, [quoteToSave, isEditing]);

  // Redirect on success
  useEffect(() => {
    if (quotes.success) {
      navigate("/quotes");
    }
  }, [quotes.success, navigate]);

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
        <EditableSelect
          values={categories}
          defaultValue={currentSection}
          onChange={setCurrentSection}
        />

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

        <p className="quoteDetails total">
          TOTAL GÉNÉRAL TTC:{" "}
          {getQuoteTotalTTC(
            quoteToSave.quote_elements,
            quoteToSave.global_discount,
          ).toFixed(2)}{" "}
          €
        </p>
        {/*customer info form*/}
        <Accordion
          elements={[
            <CustomerForm
              customer={quoteToSave.customer}
              setCustomer={(customer) =>
                setQuoteToSave({
                  ...quoteToSave,
                  customer: customer,
                  customer_id: undefined,
                })
              }
            />,
          ]}
          headers={["Informations du client"]}
        />

        {/*general quotes infos form*/}
        <Accordion
          elements={[
            <fieldset>
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
                  name="expires_at"
                  value={toFormDateString(quoteToSave.expires_at)}
                  onChange={(e) => {
                    setQuoteToSave({
                      ...quoteToSave,
                      expires_at: new Date(e.target.value),
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="status">Statut</label>
                <select
                  name="status"
                  value={quoteToSave.status}
                  onChange={(e) =>
                    setQuoteToSave({
                      ...quoteToSave,
                      status: e.target.value as quote_full_create["status"],
                    })
                  }
                >
                  <option value="quote">Quote</option>
                  <option value="draft">Draft</option>
                  <option value="invoice">Invoice</option>
                  <option value="validated">Validated</option>
                </select>
              </div>
            </fieldset>,
            <MediaForm />,
          ]}
          headers={["informations générales", "Médias"]}
        />
        <form onSubmit={handleSubmit}>
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
