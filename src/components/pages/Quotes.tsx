import QuotesList from "../organisms/QuotesList";
import MainTemplate from "../templates/MainTemplate";
import { Link } from "react-router-dom";
const Quotes = () => {
  return (
    <MainTemplate>
      <h1>Devis</h1>
      <QuotesList />
      <Link to="/add-quote" className="btn btn-primary">
        Ajouter un devis
      </Link>
    </MainTemplate>
  );
};

export default Quotes;
