import { useEffect, useState } from "react";
import { getFromCache, isExpired, saveToCache } from "../utils/cache";

function useSmartCache(key, fetcher, ttl = 300000) { // 5 minutos
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = getFromCache(key);

    if (cached && !isExpired(cached.timestamp, ttl)) {
      setData(cached.data);
      return;
    }
    // Fetch si no hay cache válido
    setLoading(true);
    fetcher()
      .then(result => {
        setData(result);
        saveToCache(key, result);
        setError(null);
      })
      .catch(err => {
        setError(err);
        // Usar cache stale si existe
        if (cached) setData(cached.data);
      })
      .finally(() => setLoading(false));
  }, [key, fetcher, ttl]);

  return { data, loading, error };
}

export default useSmartCache;