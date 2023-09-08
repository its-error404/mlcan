import { useState, useEffect } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { RepairData, Repair } from '../../models/repairList.model';

export const useFetchData = () => {
  const [repairListData, setRepairListData] = useState<RepairData | null>(null);
  const [totalEntries, setTotalEntries] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(ApiRoutes.ALL_REPAIRS);
        setRepairListData(response.data);
        setTotalEntries(response.data.data.docs.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return { repairListData, totalEntries };
};

export const useRowClick = () => {
  const [selectedEntry, setSelectedEntry] = useState<Repair | null>(null)
  const handleRowClick = (selectedRow: Repair | null) => {
    setSelectedEntry(selectedRow);
  };

  return { selectedEntry, handleRowClick}
};

export const useSectionClick = () => {
  const handleSectionClick = (index: number, setSectionIndex: React.Dispatch<React.SetStateAction<number>>) => {
    setSectionIndex(index);
  };

  return handleSectionClick;
};
