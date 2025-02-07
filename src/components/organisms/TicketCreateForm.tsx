import { useActionState, useState, useEffect } from "react";
import { createTicket } from "../../api/ticketsApi";
import { ticketCreate } from "../../types/tickets";

const TicketsCreateForm = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleTicketSubmit = async (_prevState: void, formdata: FormData) => {
    if (!formdata.has("object") || !formdata.has("text_content")) return;
    const ticket: ticketCreate = {
      object: formdata.get("object")?.toString() ?? "",
      text_content: formdata.get("text_content")?.toString() ?? "",
    };
    try {
      await createTicket(ticket);
      setSuccess("Votre ticket a bien été envoyé");
    } catch {
      setError("Une erreur est survenue");
    }
  };
  const [_state, formAction, isPending] = useActionState(
    handleTicketSubmit,
    undefined,
  );

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  }, [error]);
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(null), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  return (
    <>
      <h2>Creer un ticket</h2>
      <form action={formAction}>
        <label>
          Objet du ticket
          <input type="text" placeholder="Ticket title" name="object" />
        </label>
        <label>
          Contenu du ticket
          <textarea placeholder="Ticket description" name="text_content" />
        </label>
        <div>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isPending}
          >
            Envoyer
          </button>
        </div>
      </form>
    </>
  );
};
export default TicketsCreateForm;
