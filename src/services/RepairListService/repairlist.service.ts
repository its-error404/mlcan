import { useState, useEffect } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { RepairData, Repair } from '../../models/repairList.model';

export const useFetchData = (searchQuery='') => {
  const [repairListData, setRepairListData] = useState<RepairData | null>(null);
  const [totalEntries, setTotalEntries] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(ApiRoutes.ALL_REPAIRS);
        const allData = response.data.data.docs

        const converToLowerCase = searchQuery.toLowerCase()
        const filteredData = allData.filter((repair: Repair) => 
          repair.uid?.toLowerCase().includes(converToLowerCase)
        )

        setRepairListData({data: {docs: filteredData}})
        setTotalEntries(filteredData.length)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [searchQuery]);

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

