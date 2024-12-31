import { useState, useEffect } from "react";
import { getAllWorks } from "../api/worksApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setWorks, selectWorks } from "../redux/worksSlice";

const useWorks = () => {
  const works = useAppSelector(selectWorks);
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetching works if store is empty
  useEffect(() => {
    if (works.length === 0) {
      setIsLoading(true);
    }
  }, [works]);

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

    getAllWorks()
      .then((works) => {
        dispatch(setWorks(works));
      })
      .catch(() => {
        setError("Une erreur est survenue");
      });
  }, [isLoading, dispatch]);

  function doRefresh() {
    setIsLoading(true);
  }

  return {
    works,
    error,
    isLoading,
    doRefresh,
  };
};
export default useWorks;
