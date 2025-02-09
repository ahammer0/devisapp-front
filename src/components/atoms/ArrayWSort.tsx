import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./ArrayWSort.scss";

type values = number | string | Date;
interface objectWithId {
  id: number;
  [key: string]: values;
}
const ArrayWSort = <T extends objectWithId>({
  keys,
  headers,
  array,
  nElementsByPage = 10,
}: {
  keys: (keyof T)[];
  headers: string[];

  array: T[];
  nElementsByPage?: number;
}) => {
  if (keys.length !== headers.length)
    throw new Error("Mismatching keys & headers count");
  const [elements, setElements] = useState<typeof array>(array);
  const [sortMode, setSortMode] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<keyof T>("id");
  const [page, setPage] = useState(1);

  const needsPagination = array.length > nElementsByPage;
  const numberOfPages = Math.ceil(array.length / nElementsByPage);
  const displayedElements = elements.slice(
    nElementsByPage * (page - 1),
    nElementsByPage * page - 1,
  );

  const nextPage = () => {
    if (page + 1 > numberOfPages) return;
    setPage(page + 1);
  };
  const previousPage = () => {
    if (page - 1 <= 0) return;
    setPage(page - 1);
  };
  const goToPage = (page: number) => {
    setPage(page);
  };

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
    <div className="arrayWSort">
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
          {displayedElements &&
            displayedElements.map((el) => (
              <tr key={el.id}>
                {keys.map((key) => (
                  <td>{toString(el[key])}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {needsPagination && (
        <div className="flex-center">
          <button className="btn btn-secondary" onClick={() => previousPage()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {[...Array(numberOfPages).keys()].map((_el, id) => (
            <>
              {id + 1 === page ? (
                <button type="button" key={id} className="pageNumber selected">
                  {id + 1}
                </button>
              ) : (
                <button
                  type="button"
                  key={id}
                  className="pageNumber"
                  onClick={() => goToPage(id + 1)}
                >
                  {id + 1}
                </button>
              )}
            </>
          ))}

          <button className="btn btn-secondary" onClick={() => nextPage()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  );
};
export default ArrayWSort;
