import { useState, useEffect } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { ContainersData, AllContainersData } from '../../models/Containers.model';

export const useFetchData = (searchQuery='') => {
    const [containersData, setContainersData] = useState<AllContainersData | null>(null)
    const [totalEntries, setTotalEntries] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(ApiRoutes.CONTAINERS)
            const allData = response.data.data.docs

            const converToLowerCase = searchQuery.toLowerCase() 
            const filteredData = allData.filter((container: ContainersData) =>
                container.uid?.toLowerCase().includes(converToLowerCase)
            )

            setContainersData({ data: {docs: filteredData}})
            setTotalEntries(filteredData.length)
          } catch (error) {
            console.log(error)
          }
        }
        fetchData()
    }, [searchQuery])

    return { containersData, totalEntries }
}

export const useRowClick = () => {
  const [selectedEntry, setSelectedEntry] = useState<AllContainersData | null>(null)
  const handleRowClick = () => (selectedRow: AllContainersData | null) => {
    setSelectedEntry(selectedRow)
  }
  return {selectedEntry, handleRowClick}
}

export const useSectionClick = () => {
  const handleSectionClick = (index: number, setSectionIndex: React.Dispatch<React.SetStateAction<number>>) => {
    setSectionIndex(index);
  };

  return handleSectionClick;
};
