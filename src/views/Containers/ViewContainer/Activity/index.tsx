import React, { useEffect, useState } from "react";
import './activity.scss'
import { ReactComponent as QuoteIcon } from '../../../../assets/single color icons - SVG/quote.svg';
import { ReactComponent as RepairIcon } from '../../../../assets/single color icons - SVG/repair.svg'
import { ReactComponent as InspectionIcon } from '../../../../assets/single color icons - SVG/inspection.svg'
import { fetchActivityData } from "../../../../services/ContainersService/viewcontainer.service";
import { Space } from "antd";
import ActivityCard from "./ActivityCard";
import { formatDate } from "../../../../shared/utils/dateFormat";
import { QuoteData, RepairData } from "../../../../shared/types/formTypes";

const ActivitySection: React.FC = () => {
  
  const [quoteData, setQuoteData] = useState<QuoteData>({ docs: [] });
  const [repairData, setRepairData] = useState<RepairData>({ docs: [] });  
  const [inspectionData, setInspectionData] = useState({ docs: [] });
  const [photoData, setPhotoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchActivityData();
        setInspectionData(response.inspectionJsonData);
        setQuoteData(response.quoteJsonData);
        setPhotoData(response.photoJsonData);
        setRepairData(response.repairFormJsonData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const combinedData = repairData.docs.concat(quoteData.docs);

  return (
    <div className="activity-section">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Space direction="vertical" size={1}>
          {combinedData.map((data, index: number) => (
            <ActivityCard
              key={data.id}
              formType={index % 2 === 0 ? "Repair Form" : "Quote Form"} 
              formID={data.uid}
              date={formatDate(data.created_at)}
              activityStatus={data.curr_status}
              icon={index % 2 === 0 ? <RepairIcon width={20} /> : <QuoteIcon width={20} />} 
              expanded={false}
              UniqueID={data.id}
            />
          ))}
        </Space>
      )}
    </div>
  );
};

export default ActivitySection;
