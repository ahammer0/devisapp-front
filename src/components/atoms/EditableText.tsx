import { useEffect, useState } from "react";

const EditableText = ({
  isEditMode = false,
  onModeSwitch,
  startValue,
  children,
  type = "",
  selectOptions = [],
}: {
  isEditMode: boolean;
  onModeSwitch: (a: typeof startValue) => void;
  startValue: string | number | boolean;
  children: React.ReactNode;
  type?: "" | "date" | "text" | "number" | "checkbox" | "select";
  selectOptions?: string[];
}) => {
  const [value, setValue] = useState(startValue);
  const [inputType, setInputType] = useState("text");

  useEffect(() => {
    switch (type) {
      case "date":
        setInputType("date");
        break;
      case "text":
        setInputType("text");
        break;
      case "number":
        setInputType("number");
        break;
      case "checkbox":
        setInputType("checkbox");
        break;
      case "select":
        setInputType("select");
        break;
      default:
        switch (typeof startValue) {
          case "string":
            setInputType("text");
            break;
          case "number":
            setInputType("number");
            break;
          case "boolean":
            setInputType("checkbox");
            break;
        }
        break;
    }
  }, [startValue]);

  useEffect(() => {
    onModeSwitch(value);
    if (!isEditMode) {
      setValue(startValue);
    }
  }, [isEditMode, startValue, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (inputType) {
      case "date":
        setValue(new Date(e.target.value).getTime());
        break;
      case "checkbox":
        setValue(e.target.checked);
        break;
      default:
        setValue(e.target.value);
    }
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const formatValue = (value: typeof startValue) => {
    switch (inputType) {
      case "date":
        return new Date(value as number).toISOString().split("T")[0];
      case "text":
        return value.toString();
      case "number":
        return value.toString();
      default:
        return value.toString();
    }
  };

  if (isEditMode) {
    if (inputType === "select") {
      return (
        <select value={value.toString()} onChange={handleChangeSelect}>
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
    return (
      <input
        value={formatValue(value)}
        type={inputType}
        onChange={handleChange}
        checked={inputType === "checkbox" && value === true}
      />
    );
  } else {
    return <>{children}</>;
  }
};
export default EditableText;
