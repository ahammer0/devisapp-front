import { quote_element_create, quote_full_create } from "../../types/quotes";
import useWorks from "../../hooks/useWorks";

const QuoteDetails = ({
  quoteElements,
}: {
  quoteElements: quote_element_create[];
}) => {
  const works = useWorks();

  return (
    <table>
      <tbody>
        <tr>
          <th>Designation</th>
          <th>Quantité</th>
        </tr>
        {quoteElements.map((quoteElement) => (
          <tr key={`${quoteElement.work_id}-${quoteElement.quote_section}`}>
            <td>
              {
                works.works.find((work) => work.id === quoteElement.work_id)
                  ?.name
              }
            </td>
            <td>{quoteElement.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuoteDetails;
