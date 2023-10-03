import { alias, list, object, serializable } from "serializr";

export class PhotoDocs {
    @serializable(alias('created_at'))
    createdAt?: string;

    @serializable(alias('id'))
    id?: string;

    @serializable(alias('key'))
    key?: string;

    @serializable(alias('media_type'))
    mediaType?: Uint8Array;

    @serializable(alias('size'))
    size?: number;
}

export class PhotoDetails {
    @serializable(list(object(PhotoDocs)))
    photo?: PhotoDocs[];
}