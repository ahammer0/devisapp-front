import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

type values = number | string | Date;
interface objectWithId {
  id: number;
  [key: string]: values;
}
const ArrayWSort = <T extends objectWithId>({
  keys,
  headers,
  array,
}: {
  keys: (keyof T)[];
  headers: string[];

  array: T[];
}) => {
  if (keys.length !== headers.length)
    throw new Error("Mismatching keys & headers count");
  const [elements, setElements] = useState<typeof array>(array);
  const [sortMode, setSortMode] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<keyof T>("id");

  const handleSortByKey = (key: typeof sortField) => {
    if (sortField === key && sortMode === "desc") {
      setElements(elements.sort((a, b) => (a[key] > b[key] ? 1 : -1)));
      setSortMode("asc");
      setSortField(key);
    } else {
      setElements(elements.sort((a, b) => (a[key] < b[key] ? 1 : -1)));
      setSortMode("desc");
      setSortField(key);
    }
  };
  const toString = (el: values) => {
    if (typeof el === "number") {
      return el.toString();
    } else if (typeof el === "string") {
      return el;
    } else if (el instanceof Date) {
      return el.toLocaleDateString();
    } else if (el === null) {
      return "";
    } else {
      throw new Error("Unknown type");
    }
  };
  //keeping elemeents up to date
  useEffect(() => {
    setElements(array);
  }, [array, keys, headers]);
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th onClick={() => handleSortByKey(keys[index])}>
              {header}
              {sortField === keys[index] &&
                (sortMode === "asc" ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                ))}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {elements &&
          elements.map((el) => (
            <tr key={el.id}>
              {keys.map((key) => (
                <td>{toString(el[key])}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default ArrayWSort;
