import { useState, useEffect } from "react";
import { ticket } from "../../types/tickets";
import { getAllTickets } from "../../api/ticketsApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TicketsList.scss";

const TicketsList = () => {
  const [tickets, setTickets] = useState<ticket[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTickets()
      .then((res) => setTickets(res))
      .catch(() => setError("Une erreur est survenue"));
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="ticketsList">
      <h2>Liste des tickets</h2>
      <p>Vous pouvez consulter et modifier les tickets en cours</p>
      <table>
        <thead>
          <tr>
            <th>Objet</th>
            <th>Etat</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {tickets &&
            tickets.map((ticket) => (
              <tr
                key={`ticket-${ticket.id}`}
                onClick={() => navigate(`/tickets/${ticket.id}`)}
              >
                <td>
                  <Link to={`/tickets/${ticket.id}`}>
                    {ticket.object === "" ? "Sans Objet" : ticket.object}
                  </Link>
                </td>
                <td>{ticket.status}</td>
                <td>{ticket.created_at.toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default TicketsList;
