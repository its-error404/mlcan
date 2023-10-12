import React, { useEffect, useState } from "react";
import './activity.scss'
import { ReactComponent as QuoteIcon } from '../../../../assets/single color icons - SVG/quote.svg';
import { ReactComponent as RepairIcon } from '../../../../assets/single color icons - SVG/repair.svg'
import { ReactComponent as InspectionIcon } from '../../../../assets/single color icons - SVG/inspection.svg'
import { Space, Spin } from "antd";
import { fetchActivityData, toggleExpandRepairCard, toggleExpandedQuoteCard } from "../../../../services/ContainersService/viewcontainer.service";
import ActivityCard from "./ActivityCard";
import 'antd/dist/antd.css';
import { QuoteData, RepairDataActivity } from "../../../../shared/types/formTypes";
import { formatDate } from "../../../../shared/utils/formatDate";

const ActivitySection: React.FC = () => {
  
  const [quoteData, setQuoteData] = useState<QuoteData>({ docs: [] });
  const [repairData, setRepairData] = useState<RepairDataActivity>({ docs: [] });  
  const [inspectionData, setInspectionData] = useState({docs: []});
  const [photoData, setPhotoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRepairFormData, setExpandedRepairFormData] = useState(null)
  const [expandedQuoteFormData, setExpandedQuoteFormData] = useState(null)

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
        <div className="loader-icon-activity"><Spin size="large"/><p>Loading Data....</p></div>
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
