import { useState } from "react";
import MainTemplate from "../templates/MainTemplate";
import RadioCard from "../atoms/RadioCard";
import { Link } from "react-router-dom";

const ChangePlan = () => {
  const [displayedItem, setDisplayedItem] = useState<"select" | "pay">(
    "select",
  );
  const [choosedPlan, setChoosedPlan] = useState<number | null>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const subscriptionTime = formdata.get("subscriptionTime");
    if (!subscriptionTime || typeof subscriptionTime !== "string") {
      return;
    }
    setChoosedPlan(parseInt(subscriptionTime));
    setDisplayedItem("pay");
  };
  return (
    <MainTemplate>
      {displayedItem === "select" && (
        <>
          <h1>Changer d'abonnement</h1>
          <form onSubmit={handleSubmit} className="subscribeForm">
            <RadioCard
              label="Gratuit"
              name="subscriptionTime"
              value="0"
              checked={choosedPlan === 0}
            >
              Vous continuez d'utiliser l'appli gratuitement.
              <br />
              <small>
                En revanche, les devis que vous générez portent un filigrane
              </small>{" "}
              <div className="price">
                <strong>Gratuit</strong>
              </div>
            </RadioCard>
            <RadioCard
              label="Ajouter 3 Mois"
              name="subscriptionTime"
              value="3"
              checked={choosedPlan ? choosedPlan === 3 : true}
            >
              Vous Achetez 3 mois d'utilisation <br />
              <em>Idéal pour essayer en entier!</em>
              <div className="price">
                <strong>30€</strong>
              </div>
            </RadioCard>
            <RadioCard
              label="Ajouter 12 Mois"
              name="subscriptionTime"
              value="12"
              checked={choosedPlan === 12}
            >
              Vous achetez un an d'utilisation
              <br />
              <em>Pour les utilisateurs convaincus !</em>
              <div className="price">
                <strong>100€</strong>
              </div>
            </RadioCard>

            <input
              type="submit"
              className="btn btn-primary btn-cta submitButton"
              value="Payer"
            />
          </form>
        </>
      )}
      {displayedItem === "pay" && (
        <>
          <h1>Paiement</h1>
          <button className="btn" onClick={() => setDisplayedItem("select")}>
            Retour
          </button>
          {choosedPlan !== 0 && (
            <>
              <p>Vous avez choisit de payer pour {choosedPlan} mois.</p>
              <form onSubmit={handleSubmit} className="subscribeForm"></form>
            </>
          )}
          {choosedPlan === 0 && (
            <>
              <p>
                Vous avez choisit le plan gratuit, pas de paiememt pour cette
                fois ;)
              </p>
              <Link to="/profile" className="btn btn-primary">
                Retour au profil
              </Link>
            </>
          )}
        </>
      )}
    </MainTemplate>
  );
};
export default ChangePlan;
