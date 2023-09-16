import { serializable, alias, primitive } from "serializr";

export class RepairDetails {
    @serializable(alias('repair_id', primitive()))
    uid?: string

    @serializable(alias('Container_Repair_Area', primitive()))
    rep_area?:string

    @serializable(alias('Container_Damaged_Area', primitive()))
    dmg_area?:string

    @serializable(alias('Repair Type', primitive()))
    type?:string

}

export class NonMaerskDetails {

    @serializable(alias('Hours', primitive()))
    hours?: string

    @serializable(alias('Material Cost', primitive()))
    mat_cost?: string

    @serializable(alias('Container Section', primitive()))
    cont_section?: string

    @serializable(alias('Damaged Area', primitive()))
    dmg_area?: string

    @serializable(alias('Repair Type', primitive()))
    type?: string

    @serializable(alias('Description', primitive()))
    desc?: string

    @serializable(alias('COMP', primitive()))
    comp?: string

    @serializable(alias('DAM', primitive()))
    dam?: string

    @serializable(alias('REP', primitive()))
    rep?: string

    @serializable(alias('Component', primitive()))
    component?: string

    @serializable(alias('Event', primitive()))
    event?: string

    @serializable(alias('Location', primitive()))
    location?: string

    @serializable(alias('LGTH/QTY/AREA', primitive()))
    area1?: string

    @serializable(alias('LGTH/QTY/AREA2', primitive()))
    area2?: string

    @serializable(alias('ID Source', primitive()))
    id?: string

    @serializable(alias('N/A', primitive()))
    na_1?: boolean
}

export class MercPlusDetails {
    @serializable(alias('Max. Mat. Cost', primitive()))
    max_mat_cost?: number

    @serializable(alias('Unit. Mat. Cost', primitive()))
    unit_mat_cost?: number

    @serializable(alias('Hours Per Unit', primitive()))
    unit_hours?: number

    @serializable(alias('Max Pieces', primitive()))
    max_pcs?: number

    @serializable(alias('Units', primitive()))
    unit?: string

    @serializable(alias('Repair Mode', primitive()))
    rep_mode?: number

    @serializable(alias('Mode Number', primitive()))
    mode?: string

    @serializable(alias('Repair Code', primitive()))
    rep_code?: string

    @serializable(alias('Combined', primitive()))
    comb?: string

    @serializable(alias('Description', primitive()))
    desc?: string

    @serializable(alias('ID Source', primitive()))
    id?: string
 
    @serializable(alias('N/A', primitive()))
    na_1?: boolean
}

export const initialRepairFormValues = {
    ...new RepairDetails(),
    ...new MercPlusDetails(),
    ...new NonMaerskDetails()
};
