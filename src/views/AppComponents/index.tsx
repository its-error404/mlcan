import { Button, Col, Row } from "antd";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import InputField from "../../shared/components/InputField";
import "./appComponents.scss";

const options = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange" },
];

interface AppComponentsProps { }

const AppComponents: FC<AppComponentsProps> = (props) => {
  const { } = props;
  return (
    <div className="app-components">
      <h1 className="text-center text-decoration">App Components</h1>
      <Formik initialValues={{}} onSubmit={() => { }}>
        <Form>
          <InputField type="text" name="input" placeholder="Enter some text" />
          <div className="mt-5">
            <Button type="primary" className="mr-4">
              Primary Button
            </Button>
            <Button>Default Button</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AppComponents;
