// src/hooks/useServiceCareJobs.js
import { useState, useEffect } from 'react';
import { getPublicJobs, getServiceCareCategories, normalizeJob } from '../lib/jobs';

export function useServiceCareJobs(query = {}) {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryKey = JSON.stringify(query);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [rawJobs, rawCats] = await Promise.all([
          getPublicJobs(query),
          getServiceCareCategories(),
        ]);
        if (active) {
          const normalized = (rawJobs || []).map(j => normalizeJob(j, rawCats));
          setJobs(normalized);
          setCategories(rawCats || []);
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
    fetchData();
    return () => {
      active = false;
    };
  }, [queryKey]);

  return { jobs, categories, loading, error };
}
