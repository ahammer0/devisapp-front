import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/userSlice";
import { customer_create, customer } from "../../types/customers";
import { useMemo } from "react";

const CustomerForm = ({
  customer,
  setCustomer,
}: {
  customer?: customer | customer_create | null;
  setCustomer: (customer: customer | customer_create) => void;
}) => {
  const user = useAppSelector(selectUser);
  const defaultCustomer = useMemo(() => {
    if (customer) return customer;
    const t: customer_create = {
      user_id: user?.id ?? -1,
      first_name: "",
      last_name: "",
      street: "",
      city: "",
      zip: 0,
      phone: "",
      email: "",
    };
    return t;
  }, [customer, user]);

  //not usable if user is not connected, should not happen
  if (!user) return;

  return (
    <fieldset>
      {"id" in defaultCustomer && typeof defaultCustomer.id === "number" && (
        <input type="hidden" name="id" value={defaultCustomer?.id} />
      )}
      <label htmlFor="first_name">Nom</label>
      <input
        type="text"
        name="first_name"
        maxLength={50}
        onChange={(e) =>
          setCustomer({ ...defaultCustomer, first_name: e.target.value })
        }
        value={defaultCustomer.first_name ?? undefined}
      />
      <label htmlFor="last_name">Prénom</label>
      <input
        type="text"
        name="last_name"
        maxLength={50}
        onChange={(e) =>
          setCustomer({ ...defaultCustomer, last_name: e.target.value })
        }
        value={defaultCustomer.last_name ?? undefined}
      />
      <label htmlFor="street">Rue</label>
      <input
        type="text"
        name="street"
        maxLength={40}
        onChange={(e) =>
          setCustomer({ ...defaultCustomer, street: e.target.value })
        }
        value={defaultCustomer.street ?? undefined}
      />
      <label htmlFor="city">Ville</label>
      <input
        type="text"
        name="city"
        maxLength={50}
        onChange={(e) =>
          setCustomer({ ...defaultCustomer, city: e.target.value })
        }
        value={defaultCustomer.city ?? undefined}
      />
      <label htmlFor="zip">Code postal</label>
      <input
        type="text"
        name="zip"
        maxLength={5}
        minLength={5}
        onChange={(e) =>
          setCustomer({ ...defaultCustomer, zip: parseInt(e.target.value) })
        }
        value={defaultCustomer.zip ?? undefined}
      />
      <label htmlFor="phone">Tel</label>
      <input
        type="text"
        name="phone"
        maxLength={20}
        onChange={(e) =>
          setCustomer({ ...defaultCustomer, phone: e.target.value })
        }
        value={defaultCustomer.phone ?? undefined}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        maxLength={30}
        onChange={(e) =>
          setCustomer({ ...defaultCustomer, email: e.target.value })
        }
        value={defaultCustomer.email ?? undefined}
      />
    </fieldset>
  );
};
export default CustomerForm;
