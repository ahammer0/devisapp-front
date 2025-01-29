import { useActionState, useState } from "react";
import MainTemplate from "../templates/MainTemplate";
import RadioCard from "../atoms/RadioCard";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser, setUser } from "../../redux/userSlice";
import { addMonths, isPast, toFrenchDate } from "../../helpers/dateFormat";
import { addCredit } from "../../api/userApi";
import "./ChangePlan.scss";

const ChangePlan = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [displayedItem, setDisplayedItem] = useState<"select" | "pay">(
    "select",
  );
  const [choosedPlan, setChoosedPlan] = useState<number | null>();

  // form action for second form, the payment one
  type payState = "unpaid" | "error" | "success";
  const payAction = async (_cs: payState, fd: FormData) => {
    if (!fd.has("plan")) {
      return "error";
    }
    const plan = fd.get("plan");
    if (typeof plan !== "string") {
      return "error";
    }
    const planInt = parseInt(plan);
    if (planInt !== 3 && planInt !== 12) {
      return "error";
    }
    try {
      const newUser = await addCredit(planInt);
      dispatch(setUser({ user: newUser, role: "user" }));
      return "success";
    } catch {
      return "error";
    }
  };
  const [state, formPayAction, isPending] = useActionState(payAction, "unpaid");

  // submit handler for forst form
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

  if (!user) return;

  const getNextExpirationDate = (choosedPlan: number) => {
    if (isPast(user.expires_at)) {
      return toFrenchDate(addMonths(new Date(), choosedPlan));
    } else {
      return toFrenchDate(addMonths(user.expires_at, choosedPlan));
    }
  };

  return (
    <MainTemplate>
      {displayedItem === "select" && (
        <>
          <h1>Changer d'abonnement</h1>
          {isPast(user.expires_at) && (
            <p className="text-danger">
              Votre abonnement à expiré le : {toFrenchDate(user.expires_at)}
            </p>
          )}
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
          {choosedPlan !== 0 && choosedPlan && (
            <>
              <p>Vous avez choisit de payer pour {choosedPlan} mois.</p>
              <p>Prix :{choosedPlan === 3 ? "30€" : "100€"}</p>
              <p>
                Votre abonnement sera valide jusqu'au :{" "}
                {getNextExpirationDate(choosedPlan)}
              </p>
              <form action={formPayAction}>
                <input type="hidden" name="plan" value={choosedPlan} />
                <button className="btn btn-primary" type="submit">
                  Payer
                </button>
              </form>
              {isPending && <p>Paiement en cours...</p>}
              {state === "success" && <p>Succès</p>}
            </>
          )}
          {choosedPlan === 0 && (
            <>
              <p>
                Vous avez choisit le plan gratuit, pas de paiememt pour cette
                fois ;)
              </p>
              {isPast(user.expires_at) && (
                <p className="text-danger">
                  Votre abonnement à expiré le : {toFrenchDate(user.expires_at)}
                </p>
              )}
              <p></p>
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
