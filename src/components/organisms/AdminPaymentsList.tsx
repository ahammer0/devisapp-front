import { useState, useEffect } from "react";
import { getAllPayments } from "../../api/adminApi";
import { payment } from "../../types/payments";
import ArrayWSort from "../atoms/ArrayWSort";

const AdminPaymentsList = () => {
  const [payments, setPayments] = useState<payment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const totalYear = payments
    .filter((a) => a.date > new Date(new Date().setMonth(0, 1)))
    .reduce((acc, el) => acc + el.amount, 0);
  const totalMonth = payments
    .filter((a) => a.date > new Date(new Date().setDate(0)))
    .reduce((acc, el) => acc + el.amount, 0);

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
        searchKeys={["company_name"]}
      />
      <div>
        <p>Total Année : {totalYear.toFixed(2)}€</p>
        <p>Total Mois: {totalMonth.toFixed(2)}€</p>
      </div>
    </div>
  );
};
export default AdminPaymentsList;
