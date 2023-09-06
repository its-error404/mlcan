export interface Repair {
    uid: string;
    category: string;
    created_at: string;
    deleted: boolean;
    dmg_area: string;
    id: string;
    merc: {
      max_mat_cost: number;
      unit_mat_hours: number;
      unit_hours: number;
      max_pcs: number;
      unit: string;
      
    };
    nmaersk: any; 
    rep_area: string;
    type: string;
    updated_at: string;
  }
  
  export interface RepairData {
    data: {
      docs: Repair[]
    }
  }