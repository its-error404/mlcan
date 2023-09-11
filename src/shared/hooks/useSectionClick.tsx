export const useSectionClick = () => {
    const handleSectionClick = (index: number, setSectionIndex: React.Dispatch<React.SetStateAction<number>>) => {
      setSectionIndex(index);
    };
  
    return handleSectionClick;
  };