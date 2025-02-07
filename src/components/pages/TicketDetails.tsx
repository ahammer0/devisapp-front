import MainTemplate from "../templates/MainTemplate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ticket } from "../../types/tickets";
import { getOneTicket } from "../../api/ticketsApi";
import { Link } from "react-router-dom";

const TicketDetails = () => {
  const params = useParams();
  const [ticket, setTicket] = useState<ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  if (!params.id) return;
  useEffect(() => {
    getOneTicket(parseInt(params.id ?? "0"))
      .then((ticket) => setTicket(ticket))
      .catch(() => setError("Une erreur est survenue"));
  }, []);
  if (!ticket) return;
  return (
    <MainTemplate>
      <h1>Details du ticket</h1>
      {error && <p>{error}</p>}
      <Link to="/tickets" className="btn btn-primary">
        Retour aux tickets
      </Link>
      <h2>Objet: {ticket.object}</h2>
      <p>
        Statut: <strong>{ticket.status}</strong>
      </p>

      <p>Message: {ticket.text_content}</p>
    </MainTemplate>
  );
};
export default TicketDetails;
