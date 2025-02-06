import { useRef, useState, useEffect } from "react";
import "./Accordion.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { AccordionContext } from "../../contexts/AccordionContext";

const Accordion = ({
  elements,
  headers,
}: {
  elements: React.ReactElement[];
  headers: string[];
}) => {
  if (elements.length !== headers.length)
    throw new Error("Mismatching elements & headers count");

  return (
    <>
      {elements.map((el, id) => (
        <AccordionItem body={el} header={headers[id]} key={id} />
      ))}
    </>
  );
};

const AccordionItem = ({
  body,
  header,
}: {
  body: React.ReactElement;
  header: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [needsUpdate, setNeedsUpdate] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (needsUpdate) {
      setScrollHeight(contentRef?.current?.scrollHeight ?? 0);
      setNeedsUpdate(false);
    }
  }, [needsUpdate]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const update = () => {
    setNeedsUpdate(true);
  };

  return (
    <>
      <div className="accordion">
        <div className="header">
          <button onClick={() => toggleOpen()}>
            <span> {header}</span>
            <FontAwesomeIcon
              icon={faChevronUp}
              className={"arrow-up" + (isOpen ? " open" : "")}
            />
          </button>
        </div>
        <div
          className={"content" + (isOpen ? " open" : "")}
          style={{
            maxHeight: isOpen ? scrollHeight : "",
          }}
          ref={contentRef}
        >
          <AccordionContext.Provider value={update}>
            {body}
          </AccordionContext.Provider>
        </div>
      </div>
    </>
  );
};
export default Accordion;
