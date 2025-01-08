import { useEffect, useState, useRef,useMemo } from "react";

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
  /////////////////////////////////////////////////////////
  //                                                     //
  //             STATES                                  //
  //                                                     //
  /////////////////////////////////////////////////////////
  const [value, setValue] = useState(startValue);
  const inputType = useMemo(()=>{
    if (type) {
      return type;
    }
    switch (typeof startValue) {
      case "string":
        return "text";
      case "number":
        return "number";
      case "boolean":
        return "checkbox";
    }
  },[type,startValue]);
  const isPreviousModeEdit = useRef(false);

  /////////////////////////////////////////////////////////
  //                                                     //
  //             EFFECTS                                 //
  //                                                     //
  /////////////////////////////////////////////////////////
  // set value to parent component when exiting edit mode
  useEffect(() => {
    //trigger callback on editModeexit
    if (isPreviousModeEdit.current && !isEditMode && value !== startValue) {
      onModeSwitch(value);
    }
    
    //to synchronize the value with the parent component
    if (!isPreviousModeEdit.current && isEditMode) {
      setValue(startValue);
    }
    isPreviousModeEdit.current = isEditMode;
  }, [isEditMode, startValue, onModeSwitch, value]);

  /////////////////////////////////////////////////////////
  //                                                     //
  //             HANDLERS                                //
  //                                                     //
  /////////////////////////////////////////////////////////
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

  /////////////////////////////////////////////////////////
  //                                                     //
  //             RETURNS                                 //
  //                                                     //
  /////////////////////////////////////////////////////////
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

  /////////////////////////////////////////////////////////
  //                                                     //
  //             RETURNS                                 //
  //                                                     //
  /////////////////////////////////////////////////////////
  if (!isEditMode) {
    return <>{children}</>;
  }
  if (inputType === "select") {
    return (
      <div className="editableText">
        <select
          value={value.toString()}
          onChange={handleChangeSelect}
          className="editableText"
          autoFocus
        >
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className="editableText">
      <input
        value={formatValue(value)}
        type={inputType}
        onChange={handleChange}
        checked={inputType === "checkbox" && value === true}
        autoFocus
      />
    </div>
  );
}
export default EditableText;
