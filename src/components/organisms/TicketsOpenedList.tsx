import { ticket } from "../../types/tickets";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TicketsList.scss";
import { getOpenedTickets } from "../../api/adminApi";

const TicketsOpenedList = () => {
  const navigate = useNavigate();
  const [ticketsOpen, setTicketsOpen] = useState<ticket[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getOpenedTickets()
      .then((tickets) => setTicketsOpen(tickets))
      .catch(() => setError("Une erreur est survenue"));
  }, []);

  return (
    <div className="ticketsList">
      {error && <p className="text-danger">{error}</p>}
      <p>Vous pouvez consulter et modifier les tickets en cours</p>
      <table>
        <thead>
          <tr>
            <th>Objet</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {ticketsOpen &&
            ticketsOpen.map((ticket) => (
              <tr
                key={`ticket-${ticket.id}`}
                onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
              >
                <td>
                  <Link to={`/admin/tickets/${ticket.id}`}>
                    {ticket.object === "" ? "Sans Objet" : ticket.object}
                  </Link>
                </td>
                <td>{ticket.created_at.toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default TicketsOpenedList;
