import TicketsCreateForm from "../organisms/TicketCreateForm";
import TicketsList from "../organisms/TicketsList";
import MainTemplate from "../templates/MainTemplate";

const Tickets = () => {
  return (
    <MainTemplate>
      <h1>Tickets</h1>
      <TicketsCreateForm />
      <TicketsList />
    </MainTemplate>
  );
};
export default Tickets;
