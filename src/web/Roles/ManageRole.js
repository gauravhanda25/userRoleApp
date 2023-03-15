import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, DialogActions, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveRole } from "../../store/slices/roleSlice";
const ManageRole = (props) => {
  const { setShowForm, roleData } = props;
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    roleLabel: Yup.string().required("Role Name is required"),
  });

  return (
    <Formik
      initialValues={roleData}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        setShowForm(false);
        dispatch(saveRole(values));
        // Your code to submit the form goes here
      }}
    >
      {(props) => {
        const isSubmitting = props.isSubmitting;
        return (
          <Form>
            <Field
              variant="standard"
              name="roleLabel"
              type="text"
              label="Role Name"
              as={TextField}
              fullWidth
              required
            />
            <ErrorMessage name="roleLabel" component="p" />

            <DialogActions>
              <Button onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </DialogActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(ManageRole);
