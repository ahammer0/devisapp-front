import { useId } from "react";
import "./RadioCard.scss";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons/faCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RadioCard = ({
  children,
  checked = false,
  label,
  value,
  name,
}: {
  children: React.ReactNode;
  checked?: boolean;
  label: string;
  value: string;
  name?: string;
}) => {
  const id = useId();
  return (
    <label htmlFor={id} className="radioCard">
      <input
        type="radio"
        id={id}
        name={name ?? "radio-card"}
        defaultChecked={checked}
        value={value}
      />
      <div className="cardWrapper">
        <div className="check">
          <span className="checked">
            <FontAwesomeIcon icon={faCircleCheck} />
          </span>
          <span className="unchecked">
            <FontAwesomeIcon icon={faCircle} />
          </span>{" "}
          <span className="label">{label}</span>
        </div>
        {children}
      </div>
    </label>
  );
};
export default RadioCard;
