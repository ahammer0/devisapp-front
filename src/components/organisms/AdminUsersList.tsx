import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/adminApi";
import { user } from "../../types/users";
import ArrayWSort from "../atoms/ArrayWSort";

const AdminUsersList = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllUsers()
      .then((users) => setUsers(users))
      .catch(() => setError("Une erreur est survenue"));
  }, []);

  return (
    <div className="">
      <p>Vous pouvez consulter la liste des utilisateurs</p>
      {error && <p className="text-danger">{error}</p>}
      <ArrayWSort
        array={users}
        keys={["id", "company_name", "account_status", "expires_at"]}
        headers={["id", "Entreprise", "Statut", "Date d'expiration"]}
      />
    </div>
  );
};
export default AdminUsersList;
