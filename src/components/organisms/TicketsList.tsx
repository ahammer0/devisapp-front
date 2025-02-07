import { ticket } from "../../types/tickets";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TicketsList.scss";

const TicketsList = ({ tickets }: { tickets: ticket[] }) => {
  const navigate = useNavigate();

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
