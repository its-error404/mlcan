export interface QuoteData {
    docs: Array<{
        id: string;
        uid: string;
        date: string;
        activitystatus: string;
        currStatus: string
        createdAt:string
    }>;
}

export interface RepairDataActivity {
    docs: Array<{
        id: string;
        uid: string;
        date: string;
        activitystatus: string;
        currStatus: string
        createdAt:string
    }>;
}
