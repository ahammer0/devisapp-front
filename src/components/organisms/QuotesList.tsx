import useQuotes from "../../hooks/useQuotes";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const QuotesList = () => {
  const quotes = useQuotes();
  const navigate = useNavigate();

  const onEdit = (id: number) => {
    console.log("edit", id);
  }
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
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button className="btn btn-danger" onClick={() => quotes.rm(quote.id)}>
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
    </div>
  );
};
export default QuotesList;
