import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./ArrayWSort.scss";
import Fuse from "fuse.js";

type values = number | string | Date;
interface objectWithId {
  id: number;
  [key: string]: values;
}
const ArrayWSort = <T extends objectWithId>({
  keys,
  searchKeys,
  headers,
  array,
  nElementsByPage = 10,
}: {
  keys: (keyof T)[];
  searchKeys: (keyof T)[];
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
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  const needsPagination = array.length > nElementsByPage;
  const numberOfPages = Math.ceil(array.length / nElementsByPage);
  const displayedElements = elements.slice(
    nElementsByPage * (page - 1),
    nElementsByPage * page - 1,
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search.length === 0) {
      setElements(array);
      return;
    }
    const fuseOptions = {
      isCaseSensitive: false,
      keys: searchKeys as string[],
    };
    const fuse = new Fuse(array, fuseOptions);
    const results = fuse.search(search);
    const items = results.map((result) => result.item);
    setElements(items);
  };
  const handleClickSearch = () => {
    if (displaySearchBar) {
      setDisplaySearchBar(false);
      setElements(array);
    } else {
      setDisplaySearchBar(true);
    }
  };
  const handleEscapeSearchBar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setDisplaySearchBar(false);
      setElements(array);
    }
  };

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
              <th>
                <div className="flex justify-between">
                  <span onClick={() => handleSortByKey(keys[index])}>
                    {header}
                    {sortField === keys[index] &&
                      (sortMode === "asc" ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                      ))}
                  </span>{" "}
                  {index === headers.length - 1 && (
                    <button type="button" onClick={handleClickSearch}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
          {displaySearchBar && (
            <tr>
              <td colSpan={keys.length} className="searchBar">
                <input
                  type="search"
                  placeholder="Votre Recherche..."
                  onChange={onSearchChange}
                  onKeyDown={handleEscapeSearchBar}
                  autoFocus
                />
              </td>
            </tr>
          )}
        </thead>
        <tbody>
          {displaySearchBar && displayedElements.length === 0 && (
            <tr>
              <td colSpan={keys.length}>Aucun resultat</td>
            </tr>
          )}
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
