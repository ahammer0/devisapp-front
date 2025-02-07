import MainTemplate from "../templates/MainTemplate";
import TicketsOpenedList from "../organisms/TicketsOpenedList";

const AdminDashboard = () => {
  return (
    <>
      <MainTemplate>
        <h1>Admin dashboard</h1>
        <h2>Tickets ouverts</h2>
        <TicketsOpenedList />
      </MainTemplate>
    </>
  );
};
export default AdminDashboard;
