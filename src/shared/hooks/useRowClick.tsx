import { useState } from "react";
import { Repair } from "../../models/repairList.model";

export const useRowClick = () => {
    const [selectedEntry, setSelectedEntry] = useState<Repair | null>(null)
    const handleRowClick = (selectedRow: Repair | null) => {
      setSelectedEntry(selectedRow);
    };
  
    return { selectedEntry, handleRowClick}
  };