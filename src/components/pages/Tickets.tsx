import TicketsCreateForm from "../organisms/TicketCreateForm";
import TicketsList from "../organisms/TicketsList";
import MainTemplate from "../templates/MainTemplate";
import { useEffect, useState } from "react";
import { getAllTickets } from "../../api/ticketsApi";
import { ticket } from "../../types/tickets";
import "./Tickets.scss";

const Tickets = () => {
  const [tickets, setTickets] = useState<ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  function ticketGetter() {
    getAllTickets()
      .then((res) => setTickets(res))
      .catch(() => setError("Une erreur est survenue"));
  }

  useEffect(() => {
    ticketGetter();
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  });
  return (
    <MainTemplate className="tickets">
      <h1>Tickets</h1>
      <div className="content">
        <TicketsCreateForm onSubmitSuccess={ticketGetter} />
        <TicketsList tickets={tickets} />
      </div>
    </MainTemplate>
  );
};
export default Tickets;
