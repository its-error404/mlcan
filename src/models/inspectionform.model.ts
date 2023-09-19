import { alias, list, object, serializable } from "serializr";

class Photos {

    @serializable(alias('key'))
    key?: string;

    @serializable(alias('media_type'))
    mediaType?: Uint8Array;

    @serializable(alias('size'))
    size?: number;
}

class Status {
    @serializable(alias('id'))
    id?: string;

    @serializable(alias('status'))
    status?: string;
}

export class InspectionFormDetails {
    @serializable(alias('active'))
    active?: boolean;

    @serializable(alias('comment'))
    comment?: string;

    @serializable(alias('container'))
    container?: string;

    @serializable(alias('created_at'))
    createdAt?: string;

    @serializable(alias('id'))
    id?: string;

    @serializable(alias('uid'))
    uid?: string;

    @serializable(list(object(Photos)))
    photos?: Photos[];

    @serializable(list(object(Status)))
    status?: Status[];
}


export class InspectionForm {
    @serializable(list(object(InspectionFormDetails)))
    docs?: InspectionFormDetails[];
  
    @serializable(alias('total_docs'))
    totalDocs?: number;
  
    @serializable(alias('offset'))
    offset?: number;
  
    @serializable(alias('limit'))
    limit?: number;
  
    @serializable(alias('total_pages'))
    totalPages?: number;
  
    @serializable(alias('page'))
    page?: number;
  
    @serializable(alias('paging_counter'))
    pagingCounter?: number;
  
    @serializable(alias('has_prev_page'))
    hasPrevPage?: boolean;
  
    @serializable(alias('has_next_page'))
    hasNextPage?: boolean;
  
    @serializable(alias('prev_page'))
    prevPage?: number | null;
  
    @serializable(alias('next_page'))
    nextPage?: number | null;
  }