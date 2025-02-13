import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainTemplate from "../templates/MainTemplate";
import { useState } from "react";
import "./DeleteAccountConfirmation.scss";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "../../api/userApi";
import useLogout from "../../hooks/useLogout";

const DeleteAccountConfirmation = () => {
  const [error, setError] = useState<string | null>(null);
  const logout = useLogout();
  const handleDeleteAccount = () => {
    deleteUser()
      .then(() => {
        logout();
      })
      .catch(() => setError("Une erreur est survenue"));
  };
  return (
    <MainTemplate className="deleteAccountConfirmation">
      <h1>Suppression de votre compte</h1>
      <p>
        <strong>
          Etes-vous certain de vouloir supprimer votre compte ?
          <br /> Cette action est irréversible.
        </strong>
      </p>
      <p>
        Nous supprimerons toutes les information relatives aux devis, éléments
        de devis et les informations relatives à vos clients conformomément à la
        réglementation générale de la protection des données ( RGPD ). En
        revanche, conformément à la fiscalité française nous conserverons la
        liste de vos paiements ainsi que les informations suivantes pour une
        durée de 10 ans:
      </p>
      <div className="flex-center">
        <ul>
          <li>Montant payé</li>
          <li>Date du paiement</li>
          <li>Nom du payeur</li>
          <li>Adresse du payeur</li>
          <li>Email du payeur</li>
        </ul>
      </div>
      <p>
        Cliquez sur le bouton ci-dessous pour confirmer la suppression de votre
        compte.
        <br />
        <button
          className="btn btn-danger btn-cta"
          onClick={handleDeleteAccount}
        >
          <FontAwesomeIcon icon={faTrash} />
          Supprimer mon compte
        </button>
        {error}
      </p>
    </MainTemplate>
  );
};
export default DeleteAccountConfirmation;
