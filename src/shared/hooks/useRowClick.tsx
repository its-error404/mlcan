import { useState } from 'react';
import { RepairData } from '../../models/repairList.model';

export function useRowClick() {
  const [selectedEntry, setSelectedEntry] = useState<RepairData | null>(null);

  const handleRowClick = (entry: RepairData | null) => () => {
    console.log(selectedEntry)
    console.log(entry)
    setSelectedEntry(entry);
    console.log(selectedEntry)
  };

  return {
    selectedEntry,
    handleRowClick,
  };
}