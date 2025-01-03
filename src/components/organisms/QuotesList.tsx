import useQuotes from "../../hooks/useQuotes";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const QuotesList = () => {
  const quotes = useQuotes();
  const navigate = useNavigate();

  const onEdit = (id: number) => {
    const quote = quotes.quotes.find((quote) => quote.id === id);
    const str = JSON.stringify(quote);
    localStorage.setItem("quoteEdit", str);
    navigate("/add-quote");
  }
  return (
    <div>
      <h2>QuotesList</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>global_discount</th>
            <th>status</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.quotes.map((quote) => (
            <tr key={quote.id}>
              <td>{quote.id}</td>
              <td>{quote.global_discount}</td>
              <td>{quote.status}</td>
              <td>
                <button className="btn btn-secondary">
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button className="btn btn-danger" onClick={() => quotes.rm(quote.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default QuotesList;
