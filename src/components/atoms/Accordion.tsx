import { useRef, useState } from "react";
import "./Accordion.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

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
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
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
            maxHeight: isOpen ? contentRef?.current?.scrollHeight : "",
          }}
          ref={contentRef}
        >
          {body}
        </div>
      </div>
    </>
  );
};
export default Accordion;
