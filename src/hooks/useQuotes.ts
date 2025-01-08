import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { full_quote, quote_full_create } from "../types/quotes";
import { selectQuotes, setQuotes } from "../redux/quotesSlice";
import {
  getAllQuotes,
  addQuote,
  deleteQuote,
  editQuote,
} from "../api/quotesApi";

const useQuotes = () => {
  const quotes = useAppSelector(selectQuotes);
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [quoteToSave, setQuoteToSave] = useState<quote_full_create | null>();
  const [quoteToUpdate, setQuoteToUpdate] = useState<full_quote | null>();
  const [quoteIdToDelete, setQuoteIdToDelete] = useState<number | null>(null);

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

  //reset success
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
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
          setSuccess(true);
        })
        .catch(() => {
          setError("Une erreur est survenue");
          setIsSaving(false);
        });
    }
  }, [isSaving, quoteToSave]);

  // data deleting
  useEffect(() => {
    if (isDeleting && quoteIdToDelete) {
      deleteQuote(quoteIdToDelete)
        .then(() => {
          doRefresh();
          setIsDeleting(false);
          setSuccess(true);
        })
        .catch(() => {
          setError("Une erreur est survenue");
          setIsDeleting(false);
        });
    }
  }, [isDeleting, quoteIdToDelete]);

  // data updating
  useEffect(() => {
    if (isUpdating && quoteToUpdate) {
      editQuote(quoteToUpdate.id, quoteToUpdate)
        .then(() => {
          doRefresh();
          setIsUpdating(false);
          setSuccess(true);
        })
        .catch(() => {
          setError("Une erreur est survenue");
          setIsUpdating(false);
        });
    }
  }, [isUpdating, quoteToUpdate]);

  function doRefresh() {
    setIsLoading(true);
  }
  function saveQuote(quote: quote_full_create) {
    setIsSaving(true);
    setQuoteToSave(quote);
  }
  function rm(id: number) {
    setIsDeleting(true);
    setQuoteIdToDelete(id);
  }
  function edit(quote: full_quote) {
    setIsUpdating(true);
    setQuoteToUpdate(quote);
  }

  return {
    quotes,
    error,
    success,
    isLoading,
    isSaving,
    isDeleting,
    doRefresh,
    saveQuote,
    rm,
    edit,
  };
};
export default useQuotes;
