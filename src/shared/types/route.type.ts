import { FC, ReactElement, ComponentClass } from "react";

export interface RouterProps {
    exact: boolean,
    path: string,
    component: FC | ReactElement  | ComponentClass
}

