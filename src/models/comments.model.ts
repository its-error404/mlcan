import { list, object, alias, serializable } from 'serializr';

class Commenter {
  @serializable(alias('name'))
  name?: string;

  @serializable(alias('id'))
  id?: string;
}

class Comment {
  @serializable(alias('comment'))
  comment?: string;

  @serializable(alias('container'))
  container?: string;

  @serializable(alias('deleted'))
  deleted?: boolean;

  @serializable(alias('commenter', object(Commenter)))
  commenter?: Commenter;

  @serializable(alias('created_at'))
  createdAt?: string;

  @serializable(alias('updated_at'))
  updatedAt?: string;

  @serializable(alias('id'))
  id?: string;
}

export class CommentsData {
  @serializable(list(object(Comment)))
  docs?: Comment[];

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
