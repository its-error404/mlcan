import { alias, primitive, serializable, object } from "serializr";

export class ContainerForm {
  @serializable(alias('uid', primitive()))
  uid?: string;

  @serializable(alias('yard', primitive()))
  yard?: string;

  @serializable(alias('customer', primitive()))
  customer?: string;

  @serializable(alias('owner', primitive()))
  owner?: string;

  @serializable(alias('submitter', primitive()))
  submitter?: string;

  @serializable(alias('length', primitive()))
  length?: number;

  @serializable(alias('height', primitive()))
  height?: number;

  @serializable(alias('type', primitive()))
  type?: string;

  @serializable(alias('year', primitive()))
  year?: number;

  @serializable(alias('location', primitive()))
  location?: string;

  @serializable(alias('door_photo', primitive()))
  doorPhoto?: string;

  @serializable(alias('left_side_photo',  primitive()))
  leftSidePhoto?: string;

  @serializable(alias('right_side_photo',  primitive()))
  rightSidePhoto?: string;

  @serializable(alias('front_side_photo',  primitive()))
  frontSidePhoto?: string;

  @serializable(alias('interior_photo', primitive()))
  interiorPhoto?: string;

  @serializable(alias('roof_photo',  primitive()))
  roofPhoto?: string;

  @serializable(alias('under_side_photo',  primitive()))
  under_side_photo?: string;

  @serializable(alias('plate_photo',  primitive()))
  plate_photo?: string;
}

export class ContainerData {
    @serializable(alias('container', object(ContainerForm)))
    container?: ContainerForm;
}