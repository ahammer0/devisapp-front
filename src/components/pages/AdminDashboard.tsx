import MainTemplate from "../templates/MainTemplate";
import TicketsOpenedList from "../organisms/TicketsOpenedList";
import AdminUsersList from "../organisms/AdminUsersList";

const AdminDashboard = () => {
  return (
    <>
      <MainTemplate>
        <h1>Admin dashboard</h1>
        <h2>Tickets ouverts</h2>
        <TicketsOpenedList />
        <h2>Liste des utilisateurs</h2>
        <AdminUsersList />
        <h2>Liste des Paiements</h2>
      </MainTemplate>
    </>
  );
};
export default AdminDashboard;
