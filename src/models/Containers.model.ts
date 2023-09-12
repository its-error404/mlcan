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

    @serializable(alias('customer_name', primitive()))
    customerName?: string;

    @serializable(alias('activity_type', primitive()))
    activityType?: string;

    @serializable(alias('activity_id', primitive()))
    activityId?: string;

    @serializable(alias('activity_uid', primitive()))
    activityUid?: string;

    @serializable(alias('activity_status', primitive()))
    activityStatus?: string;

    @serializable(alias('activity_date', primitive()))
    activityDate?: string;

}

export class AllContainersData {
    @serializable(alias('data', primitive()))
    data?: {
      docs: ContainersData[];
    };
  }
  