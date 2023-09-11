import { useState } from "react";
import { RepairData } from "../../models/repairList.model";

export const useRowClick = () => {
    const [selectedEntry, setSelectedEntry] = useState<RepairData | null>(null)
    const handleRowClick = (selectedRow: RepairData | null) => {
      setSelectedEntry(selectedRow);
    };
  
    return { selectedEntry, handleRowClick}
  };