// src/hooks/useServiceCareCategories.js
import { useState, useEffect } from 'react';
import { getServiceCareCategories } from '../lib/jobs';

export function useServiceCareCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchCats = async () => {
      try {
        const data = await getServiceCareCategories();
        if (active) {
          setCategories(data || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchCats();
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading, error };
}
