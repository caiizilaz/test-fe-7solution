import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { User, GroupedData, FilterCriteria } from '../types/user';
import { transformData, filterData } from '../utils/transformData';

interface UseUserDataReturn {
  loading: boolean;
  error: string | null;
  transformedData: GroupedData;
  filteredData: GroupedData;
  filters: FilterCriteria;
  setFilters: React.Dispatch<React.SetStateAction<FilterCriteria>>;
}

export const useUserData = (): UseUserDataReturn => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<User[]>([]);
  const [filters, setFilters] = useState<FilterCriteria>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setRawData(response.data.users);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const transformedData = useMemo(() => transformData(rawData), [rawData]);
  const filteredData = useMemo(() => filterData(transformedData, filters), [transformedData, filters]);

  return {
    loading,
    error,
    transformedData,
    filteredData,
    filters,
    setFilters,
  };
}; 