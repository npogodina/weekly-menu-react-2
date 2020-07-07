import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import { useAuth0 } from "@auth0/auth0-react";
import { Form } from "semantic-ui-react";

const NewMenuPage = (props) => {
  // const { user, isAuthenticated } = useAuth0();
  const [startDate, setStartDate] = useState(new Date());

  const onDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <Form.Field>
      <DatePicker selected={startDate} onChange={onDateChange} />
    </Form.Field>
  );
};

export default NewMenuPage;
