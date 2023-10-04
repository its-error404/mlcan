import React, { useEffect, useState } from "react";
import './activity.scss'
import { ReactComponent as QuoteIcon } from '../../../../assets/single color icons - SVG/quote.svg';
import { ReactComponent as RepairIcon } from '../../../../assets/single color icons - SVG/repair.svg'
import { fetchActivityData, toggleExpandedQuoteCard } from "../../../../services/ContainersService/viewcontainer.service";
import { Space } from "antd";
import ActivityCard from "./ActivityCard";
import 'antd/dist/antd.css';

const ActivitySection: React.FC = () => {
  
  const [repairData, setRepairData] = useState({docs: [],})
  const [quoteData, setQuoteData] = useState(null);
  const [inspectionData, setInspectionData] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRepairFormData, setExpandedRepairFormData] = useState(null)
  const [expandedQuoteFormData, setExpandedQuoteFormData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchActivityData();
        setInspectionData(response.inspectionJsonData.docs)
        setQuoteData(response.quoteJsonData)
        setPhotoData(response.photoJsonData)
        setRepairData(response.repairFormJsonData || { docs: [] })
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleExpandRepairCard = async (formId: string) => {
    try {
      const response = await toggleExpandRepairCard(formId);
      console.log(response);
      setExpandedRepairFormData(response)
    } catch (error) {
      console.error("Error fetching card details:", error);
    }
  };

  const toggleExpandedQuoteCardCall = async (formId: string) => {
    try {
      const response = await toggleExpandedQuoteCard(formId)
      console.log(response)
      setExpandedQuoteFormData(response)
    } catch (error) {}
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="activity-section">
    {isLoading ? (
     
      <div>Loading...</div>
    ) : (
      <Space direction="vertical" size={1}>
        {repairData &&
          repairData.docs.map((data) => (
            <ActivityCard
              key={data.id}
              formType="Repair Form" 
              formID={data.uid}
              date={formatDate(data.created_at)} 
              activityStatus={data.curr_status}
              icon={<RepairIcon width={20}/>}
              expanded={false} 
              toggleExpand={() => toggleExpandRepairCard(data.id)}
              expandedData={expandedRepairFormData}
              UniqueID = {data.id}
            />
          ))}
          {quoteData &&
          quoteData.docs.map((data) => (
            <ActivityCard
            key={data.id}
            formType="Quote Form"
            formID={data.uid}
            date={formatDate(data.created_at)} 
              activityStatus={data.curr_status}
              icon={<QuoteIcon width={20}/>}
              expanded={false} 
              toggleExpand={() => toggleExpandedQuoteCardCall(data.id)}
              expandedData={expandedQuoteFormData}
              UniqueID={data.id}
              />
          ))}
      </Space>
    )}
  </div>
);
};

export default ActivitySection;