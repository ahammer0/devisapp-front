import { useState } from "react";
import { Link } from "react-router-dom";

import {
  faPen,
  faRotateBack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useQuotes from "../../hooks/useQuotes";
import useWorks from "../../hooks/useWorks";
import Popup from "../atoms/Popup";

import { quote_element } from "../../types/quotes";

const QuotesList = () => {
  const quotes = useQuotes();
  const works = useWorks();
  const [quoteToDelete, setQuoteToDelete] = useState<number | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleClickDelete = (id: number) => {
    setQuoteToDelete(id);
    setIsDeletePopupOpen(true);
  };
  const handleDelete = () => {
    if (quoteToDelete) {
      quotes.rm(quoteToDelete);
      setIsDeletePopupOpen(false);
    }
  };

  const getQuoteTotal = (
    quote_elements: quote_element[],
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
          total + ((el.quantity * (100 - el.discount)) / 100) * work.unit_price
        );
      }, 0.0);
    return total;
  };
  return (
    <div>
      <h2>Liste des devis</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Total</th>
            <th>status</th>
            <th className="actions">actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.quotes.map((quote) => (
            <tr key={quote.id}>
              <td>{quote.id}</td>
              <td>
                {getQuoteTotal(quote.quote_elements, quote.global_discount)}€
              </td>
              <td>{quote.status}</td>
              <td className="actions">
                <Link
                  className="btn btn-primary"
                  to={`/edit-quote/${quote.id}`}
                >
                  <FontAwesomeIcon icon={faPen} />
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleClickDelete(quote.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
          {quotes.quotes.length === 0 && (
            <tr>
              <td colSpan={4}>Aucun devis</td>
            </tr>
          )}
        </tbody>
      </table>
      <Popup isActive={isDeletePopupOpen} setIsActive={setIsDeletePopupOpen}>
        <h3>Supprimer ?</h3>
        <div className="flex-row justify-center">
          <button className="btn btn-danger" onClick={() => handleDelete()}>
            <FontAwesomeIcon icon={faTrash} /> Oui
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsDeletePopupOpen(false)}
          >
            <FontAwesomeIcon icon={faRotateBack} /> Non
          </button>
        </div>
      </Popup>
    </div>
  );
};
export default QuotesList;
