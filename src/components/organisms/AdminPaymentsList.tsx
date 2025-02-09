import { useState, useEffect } from "react";
import { getAllPayments } from "../../api/adminApi";
import { payment } from "../../types/payments";
import ArrayWSort from "../atoms/ArrayWSort";

const AdminPaymentsList = () => {
  const [payments, setPayments] = useState<payment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPayments()
      .then((paymentsRes) => setPayments(paymentsRes))
      .catch(() => setError("Une erreur est survenue"));
  }, []);

  return (
    <div className="">
      <p>Vous pouvez consulter la liste des paiements</p>
      {error && <p className="text-danger">{error}</p>}
      <ArrayWSort
        array={payments}
        keys={["id", "company_name", "amount", "date"]}
        headers={["id", "Entreprise", "montant", "Date"]}
      />
    </div>
  );
};
export default AdminPaymentsList;
