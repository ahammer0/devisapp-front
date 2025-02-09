import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/adminApi";
import { user } from "../../types/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

const AdminUsersList = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<
    "id" | "account_status" | "expires_at" | "company_name"
  >("id");

  useEffect(() => {
    getAllUsers()
      .then((users) => setUsers(users))
      .catch(() => setError("Une erreur est survenue"));
  }, []);

  const handleSortByKey = (key: typeof sortField) => {
    if (sortField === key && sortMode === "desc") {
      setUsers(users.sort((a, b) => (a[key] > b[key] ? 1 : -1)));
      setSortMode("asc");
      setSortField(key);
    } else {
      setUsers(users.sort((a, b) => (a[key] < b[key] ? 1 : -1)));
      setSortMode("desc");
      setSortField(key);
    }
  };
  return (
    <div className="">
      <p>Vous pouvez consulter la liste des utilisateurs</p>
      {error && <p className="text-danger">{error}</p>}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortByKey("id")}>
              Id
              {sortField === "id" &&
                (sortMode === "asc" ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                ))}
            </th>
            <th onClick={() => handleSortByKey("company_name")}>
              Entreprise
              {sortField === "company_name" &&
                (sortMode === "asc" ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                ))}
            </th>
            <th onClick={() => handleSortByKey("account_status")}>
              Statut
              {sortField === "account_status" &&
                (sortMode === "asc" ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                ))}
            </th>
            <th onClick={() => handleSortByKey("expires_at")}>
              Date d' expiration
              {sortField === "expires_at" &&
                (sortMode === "asc" ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                ))}
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.company_name}</td>
                <td>{user.account_status}</td>
                <td>{user.expires_at.toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminUsersList;
