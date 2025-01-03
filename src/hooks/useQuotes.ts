import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { quote_full_create } from "../types/quotes";
import { selectQuotes, setQuotes } from "../redux/quotesSlice";
import { getAllQuotes, addQuote, deleteQuote } from "../api/quotesApi";

const useQuotes = () => {
  const quotes = useAppSelector(selectQuotes);
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState("");

  const [quoteToSave, setQuoteToSave] = useState<quote_full_create|null>()
  const [quoteIdToDelete, setQuoteIdToDelete] = useState<number|null>(null);

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

  // Success display handling
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => {
      setSuccess("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [success]);

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
  // data saving
  useEffect(() => {
    if (isSaving && quoteToSave) {
      addQuote(quoteToSave)
        .then(() => {
          doRefresh();
          setIsSaving(false);
        })
        .catch(() => {
          setError("Une erreur est survenue");
          setIsSaving(false);
        });
    }
  }, [isSaving]);

  // data deleting
  useEffect(() => {
    if (isDeleting && quoteIdToDelete) {
      deleteQuote(quoteIdToDelete)
        .then(() => {
          doRefresh();
          setIsDeleting(false);
        })
        .catch(() => {
          setError("Une erreur est survenue");
          setIsDeleting(false);
        });
    }
  }, [isDeleting]);

  function doRefresh() {
    setIsLoading(true);
  }
  function saveQuote(quote: quote_full_create) {
    setIsSaving(true);
    setQuoteToSave(quote)
  }
  function rm(id: number) {
    setIsDeleting(true);
    setQuoteIdToDelete(id)
  }

  return {
    quotes,
    error,
    isLoading,
    isSaving,
    isDeleting,
    doRefresh,
    saveQuote,
    rm,
  };
};
export default useQuotes;
