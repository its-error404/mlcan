import { serializable, alias, primitive } from 'serializr';

export class ContainersData {

    @serializable(alias('uid', primitive()))
    uid?: string;

    @serializable(alias('id', primitive()))
    id?: string;

    @serializable(alias('yard', primitive()))
    yard?: string;

    @serializable(alias('owner', primitive()))
    owner?: string;

    @serializable(alias('customer name', primitive()))
    customer_name?: string;

    @serializable(alias('activity type', primitive()))
    activity_type?: string;

    @serializable(alias('activity ID', primitive()))
    activity_id?: string;

    @serializable(alias('activity uid', primitive()))
    activity_uid?: string;

    @serializable(alias('activitiy status', primitive()))
    activity_status?: string;

    @serializable(alias('activity date', primitive()))
    activity_date?: string;

}

export class AllContainersData {
    @serializable(alias('data', primitive()))
    data?: {
      docs: ContainersData[];
    };
  }
  