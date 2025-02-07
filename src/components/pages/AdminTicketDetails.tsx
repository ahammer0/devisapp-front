import MainTemplate from "../templates/MainTemplate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ticket } from "../../types/tickets";
import { closeTicket, getOneTicket } from "../../api/adminApi";
import { Link, useNavigate } from "react-router-dom";

const AdminTicketDetails = () => {
  const params = useParams();
  const [ticket, setTicket] = useState<ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!params.id) return;
  const ticketId = parseInt(params.id ?? "0");
  useEffect(() => {
    getOneTicket(ticketId)
      .then((ticket) => setTicket(ticket))
      .catch(() => setError("Une erreur est survenue"));
  }, []);

  const handleCloseTicket = () => {
    if (!params.id) return;
    closeTicket(parseInt(params.id))
      .then(() => {
        setSuccess(
          "Le ticket a bien été cloturé, vous alles etre redirigé vers la page des tickets",
        );
        setInterval(() => {
          navigate("/admin/dashboard");
        }, 3000);
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  if (!ticket) return;
  return (
    <MainTemplate>
      <h1>Details du ticket</h1>
      <div>
        {error && <p className="text-danger">{error}</p>}
        <Link to="/admin/dashboard" className="btn btn-primary">
          Retour aux tickets
        </Link>
      </div>
      <h2>Objet: {ticket.object}</h2>
      <p>
        Statut: <strong>{ticket.status}</strong>
      </p>

      <p>Message: {ticket.text_content}</p>
      <button
        type="button"
        onClick={() => handleCloseTicket()}
        className="btn btn-danger"
      >
        Cloturer le ticket
      </button>

      {success && <p>{success}</p>}
    </MainTemplate>
  );
};
export default AdminTicketDetails;
