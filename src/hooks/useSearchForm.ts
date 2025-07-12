import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useSearchForm = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        navigate(`movies/search?q=${encodeURIComponent(query.trim())}`);
        return true;
      }
      return false;
    },
    [query, navigate]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    navigate("/");
  }, [navigate]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  return {
    query,
    handleSubmit,
    handleClear,
    handleQueryChange,
  };
};
