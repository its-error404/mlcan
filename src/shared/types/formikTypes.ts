import React from 'react';

export interface FormikValues {
  hours?: string;
  mat_cost?: string;
  cont_sec?: string;
  dmg_area?: string;
  type?: string;
  desc?: string;
  COMP?: string;
  DAM?: string;
  REP?: string;
  component?: string;
  event?: string;
  location?: string;
  area1?: string;
  area2?: string;
  id?: string;
}

export interface FormikProps {
  values: FormikValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  errors: {
    hours?: string;
    mat_cost?: string;
    cont_sec?: string;
    dmg_area?: string;
    type?: string;
    desc?: string;
    COMP?: string;
    DAM?: string;
    REP?: string;
    component?: string;
    event?: string;
    location?: string;
    area1?: string;
    area2?: string;
    id?: string;
  };
  touched: {
    hours?: boolean;
    mat_cost?: boolean;
    cont_sec?: boolean;
    dmg_area?: boolean;
    type?: boolean;
    desc?: boolean;
    COMP?: boolean;
    DAM?: boolean;
    REP?: boolean;
    component?: boolean;
    event?: boolean;
    location?: boolean;
    area1?: boolean;
    area2?: boolean;
    id?: boolean;
  };
}

export interface FormikValuesSectionZero {
  uid?: string;
  repArea?: string;
  dmgArea?: string;
  type?: string;
}

export interface FormikPropsSectionZero {
  values: FormikValuesSectionZero;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  errors: {
    uid?: string;
    repArea?: string;
    dmgArea?: string;
    type?: string;
  };
  touched: {
    uid?: boolean;
    repArea?: boolean;
    dmgArea?: boolean;
    type?: boolean;
  };
}
