import useQuotes from "../../hooks/useQuotes";
import {
  faPen,
  faTrash,
  faRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "../atoms/Popup";
import { useState } from "react";
import { Link } from "react-router-dom";

const QuotesList = () => {
  const quotes = useQuotes();
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
  return (
    <div>
      <h2>Liste des devis</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>global_discount</th>
            <th>status</th>
            <th className="actions">actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.quotes.map((quote) => (
            <tr key={quote.id}>
              <td>{quote.id}</td>
              <td>{quote.global_discount}</td>
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
