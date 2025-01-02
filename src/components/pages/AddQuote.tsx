import MainTemplate from "../templates/MainTemplate";
import { Link } from "react-router-dom";
import QuoteForm from "../organisms/QuoteForm";
const AddQuote = () => {
  return (
    <MainTemplate>
      <h1>Ajout d'un Devis</h1>
      <Link to="/quotes" className="btn btn-primary">
        Retour aux Devis
      </Link>
      <QuoteForm />
    </MainTemplate>
  );
};

export default AddQuote;
