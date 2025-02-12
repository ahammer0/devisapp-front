import MainTemplate from "../templates/MainTemplate";
import TicketsOpenedList from "../organisms/TicketsOpenedList";
import AdminUsersList from "../organisms/AdminUsersList";
import AdminPaymentsList from "../organisms/AdminPaymentsList";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  return (
    <>
      <MainTemplate className="adminDashboard">
        <h1>Admin dashboard</h1>
        <div className="content">
          <div>
            <h2>Tickets ouverts</h2>
            <TicketsOpenedList />
          </div>
          <div>
            <h2>Liste des utilisateurs</h2>
            <AdminUsersList />
          </div>
          <div>
            <h2>Liste des Paiements</h2>
            <AdminPaymentsList />
          </div>
        </div>
      </MainTemplate>
    </>
  );
};
export default AdminDashboard;
