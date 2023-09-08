import { serializable, alias, primitive } from 'serializr';

export class Repair {
  @serializable(alias('uid', primitive()))
  uid?: string;

  @serializable(alias('category', primitive()))
  category?: string;

  @serializable(alias('created_at', primitive()))
  created_at?: string;

  @serializable(alias('deleted', primitive()))
  deleted?: boolean;

  @serializable(alias('dmg_area', primitive()))
  dmg_area?: string;

  @serializable(alias('id', primitive()))
  id?: string;

  @serializable(alias('merc', primitive()))
  merc?: {
    max_mat_cost: number;
    unit_mat_hours: number;
    unit_hours: number;
    max_pcs: number;
    unit: string;
    desc: string;
    id:string;
    unit_mat_cost: string;
    rep_mode:number;
    mode_num:number;
    rep_code:string;
    combined:string;
  };

  @serializable(alias('nmaersk', primitive()))
  nmaersk?: any;

  @serializable(alias('rep_area', primitive()))
  rep_area?: string;

  @serializable(alias('type', primitive()))
  type?: string;

  @serializable(alias('updated_at', primitive()))
  updated_at?: string;
}

export class RepairData {
  @serializable(alias('data', primitive()))
  data?: {
    docs: Repair[];
  };
}
