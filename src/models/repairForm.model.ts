import { serializable, alias, primitive } from "serializr";

export class RepairDetails {
    @serializable(alias('uid', primitive()))
    uid?: string

    @serializable(alias('rep_area', primitive()))
    repArea?:string

    @serializable(alias('dmg_area', primitive()))
    dmgArea?:string

    @serializable(alias('type', primitive()))
    type?:string

}

export class NonMaerskDetails {

    @serializable(alias('hours', primitive()))
    hours?: string

    @serializable(alias('mat_cost', primitive()))
    matCost?: string

    @serializable(alias('cont_section', primitive()))
    contSection?: string

    @serializable(alias('dmg_area', primitive()))
    dmgArea?: string

    @serializable(alias('type', primitive()))
    type?: string

    @serializable(alias('desc', primitive()))
    desc?: string

    @serializable(alias('ID Source', primitive()))
    id?: string
}

export class MercPlusDetails {
    @serializable(alias('max_mat_cost', primitive()))
    maxMatCost?: number

    @serializable(alias('unit_mat_cost', primitive()))
    unitMatCost?: number

    @serializable(alias('unit_hours', primitive()))
    unitHours?: number

    @serializable(alias('max_pcs', primitive()))
    maxPcs?: number

    @serializable(alias('unit', primitive()))
    unit?: string

    @serializable(alias('rep_mode', primitive()))
    repMode?: number

    @serializable(alias('mode', primitive()))
    mode?: string

    @serializable(alias('rep_code', primitive()))
    repCode?: string

    @serializable(alias('comb', primitive()))
    comb?: string

    @serializable(alias('desc', primitive()))
    desc?: string

    @serializable(alias('id', primitive()))
    id?: string

}

export const initialRepairFormValues = {
    ...RepairDetails,
    ...MercPlusDetails,
    ...NonMaerskDetails
}