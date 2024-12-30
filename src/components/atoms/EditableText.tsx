import { useEffect, useState } from "react";

interface EditableTextProps<T> {
  isEditMode: boolean;
  onModeSwitch: (a: T) => void;
  startValue: T;
  children: React.ReactNode;
  type?: T extends string
    ? "text" | "select"
    : T extends boolean
      ? "checkbox"
      : T extends number
        ? "date" | "number"
        : never;
  selectOptions?: string[];
}

function EditableText<T extends string | number | boolean>({
  isEditMode = false,
  onModeSwitch,
  startValue,
  children,
  type,
  selectOptions = [],
}: EditableTextProps<T>) {
  const [value, setValue] = useState(startValue);
  const [inputType, setInputType] = useState("text");

  // set input type
  useEffect(() => {
    if (type) {
      setInputType(type);
      return;
    }
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
  }, [startValue, type]);

  // set value to parent component
  useEffect(() => {
    onModeSwitch(value);
    if (!isEditMode) {
      setValue(startValue);
    }
  }, [isEditMode, startValue, value, onModeSwitch]);

  // change handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (inputType) {
      case "date":
        if (typeof startValue !== "number") {
          throw new Error("value is not a number when input type is date");
        }
        setValue(new Date(e.target.value).getTime() as T);
        break;
      case "checkbox":
        if (typeof startValue !== "boolean") {
          throw new Error("value is not a boolean when input type is checkbox");
        }
        setValue(e.target.checked as T);
        break;
      default:
        setValue(e.target.value as T);
    }
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value as T);
  };

  // utility to format value into string
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

  if (!isEditMode) {
    return <>{children}</>;
  }
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
}
export default EditableText;
