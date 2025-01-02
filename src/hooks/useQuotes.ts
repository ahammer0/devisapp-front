import { useState, useEffect } from "react";
import { getAllWorks } from "../api/worksApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { quote_full_create } from "../types/quotes";
import { selectQuotes, setQuotes } from "../redux/quotesSlice";
import { getAllQuotes } from "../api/quotesApi";

const useQuotes = () => {
  const quotes = useAppSelector(selectQuotes);
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetching works if store is empty
  useEffect(() => {
    if (quotes.length === 0) {
      setIsLoading(true);
    }
  }, [quotes]);

  // Error display handling
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  // Data fetching
  useEffect(() => {
    if (!isLoading) {
      return;
    }

    getAllQuotes()
      .then((quotes) => {
        dispatch(setQuotes(quotes));
        setIsLoading(false);
      })
      .catch(() => {
        setError("Une erreur est survenue");
        setIsLoading(false);
      });
  }, [isLoading, dispatch]);

  function doRefresh() {
    setIsLoading(true);
  }
  function saveQuote(quote: quote_full_create) {}

  return {
    quotes,
    error,
    isLoading,
    doRefresh,
  };
};
export default useQuotes;
