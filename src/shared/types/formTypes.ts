export interface QuoteData {
    docs: Array<{
        id: string;
        uid: string;
        date: string;
        activitystatus: string;
        curr_status: string
        created_at:string
    }>;
}

export interface RepairDataActivity {
    docs: Array<{
        id: string;
        uid: string;
        date: string;
        activitystatus: string;
        curr_status: string
        created_at:string
    }>;
}
