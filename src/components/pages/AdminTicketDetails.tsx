import MainTemplate from "../templates/MainTemplate";
import { useState, useEffect, useActionState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ticket } from "../../types/tickets";
import { closeTicket, getOneTicket, respondTicket } from "../../api/adminApi";
import { Link, useNavigate } from "react-router-dom";

const AdminTicketDetails = () => {
  const params = useParams();
  const [ticket, setTicket] = useState<ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const ticketId = parseInt(params.id ?? "0");

  const loadTicket = useCallback(
    function () {
      getOneTicket(ticketId)
        .then((ticket) => setTicket(ticket))
        .catch(() => setError("Une erreur est survenue"));
    },
    [ticketId],
  );

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  const handleCloseTicket = () => {
    if (!params.id) return;
    closeTicket(parseInt(params.id))
      .then(() => {
        setSuccess(
          "Le ticket a bien été cloturé, vous alles etre redirigé vers la page des tickets",
        );
        setInterval(() => {
          navigate("/admin/dashboard");
        }, 3000);
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  if (!params.id) return;
  if (!ticket) return;
  console.log(ticket);
  return (
    <MainTemplate>
      <h1>Details du ticket</h1>
      <div>
        {error && <p className="text-danger">{error}</p>}
        <Link to="/admin/dashboard" className="btn btn-primary">
          Retour aux tickets
        </Link>
      </div>
      <h2>Objet: {ticket.object}</h2>
      <p>
        Statut: <strong>{ticket.status}</strong>
      </p>

      <p>Message: {ticket.text_content}</p>
      <RespondForm
        id={ticket.id}
        placeholder={ticket.response}
        onSubmitSuccess={loadTicket}
      />
      <button
        type="button"
        onClick={() => handleCloseTicket()}
        className="btn btn-danger"
      >
        Cloturer le ticket
      </button>

      {success && <p>{success}</p>}
    </MainTemplate>
  );
};
const RespondForm = ({
  id,
  placeholder,
  onSubmitSuccess,
}: {
  id: number;
  placeholder: string | null;
  onSubmitSuccess: () => void;
}) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const respond = async (_state: void, formdata: FormData) => {
    const response = formdata.get("response");
    if (!response) return;
    try {
      await respondTicket(id, response.toString());
      onSubmitSuccess();
      setSuccess("Votre réponse a bien étée envoyée");
    } catch {
      setError("Une erreur est survenue");
    }
  };
  const [_state, formAction, isPending] = useActionState(respond, undefined);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <form action={formAction}>
      <textarea
        name="response"
        rows={5}
        cols={50}
        defaultValue={placeholder ?? ""}
        placeholder="Votre réponse"
        required
      ></textarea>
      <button type="submit" className="btn btn-primary" disabled={isPending}>
        Envoyer
      </button>
      {error && <p className="text-danger">{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};
export default AdminTicketDetails;
