import MainTemplate from "../templates/MainTemplate";
import { Link } from "react-router-dom";
import QuoteForm from "../organisms/QuoteForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditQuote = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate("/quotes");
  } 

  return (
    <MainTemplate>
      <h1>Modification du Devis: {id}</h1>
      <Link to="/quotes" className="btn btn-primary">
        Retour aux Devis
      </Link>
      <QuoteForm quoteId={parseInt(id!)}/>
    </MainTemplate>
  );
};

export default EditQuote;
