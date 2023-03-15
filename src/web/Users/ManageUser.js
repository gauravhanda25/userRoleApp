import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../../store/slices/userSlice";
const ManageUser = (props) => {
  const dispatch = useDispatch();
  const { setShowForm, userData } = props;
  const roles = useSelector((state) => state.role.rows);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    roleKey: Yup.string().required("Role key is required"),
    mobile: Yup.string().required("Mobile number is required"),
  });

  const errorStyle = { fontSize: "10px", color: "red" };

  let tmpUserData = { ...userData };
  delete tmpUserData["password"];
  return (
    <Formik
      initialValues={tmpUserData}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        setShowForm(false);
        dispatch(saveUser(values));
      }}
    >
      {(props) => {
        const isSubmitting = props.isSubmitting;
        return (
          <Form noValidate>
            <Grid mb={2}>
              <Field
                name="name"
                type="text"
                label="Name"
                as={TextField}
                fullWidth
                required
                variant="standard"
              />
              <ErrorMessage name="name" component="span" style={errorStyle} />
            </Grid>
            <Grid mb={2}>
              <Field
                name="email"
                type="email"
                label="Email"
                as={TextField}
                fullWidth
                required
                variant="standard"
              />
              <ErrorMessage name="email" component="span" style={errorStyle} />
            </Grid>
            <Grid mb={2}>
              <Field
                name="username"
                type="text"
                label="Username"
                as={TextField}
                fullWidth
                required
                variant="standard"
              />
              <ErrorMessage
                name="username"
                component="span"
                style={errorStyle}
              />
            </Grid>
            <Grid mb={2}>
              <Field
                name="password"
                type="password"
                label="Password"
                as={TextField}
                fullWidth
                required
                variant="standard"
                sx={{ mb: 3 }}
              />
              <ErrorMessage
                name="password"
                component="span"
                style={errorStyle}
              />
            </Grid>
            <Grid mb={2}>
              <Field
                name="roleKey"
                type="text"
                label="Select Role"
                as={Select}
                fullWidth
                required
                variant="standard"
                sx={{ mb: 2 }}
              >
                {roles.map((role) => (
                  <MenuItem value={role.roleKey}>{role.roleLabel}</MenuItem>
                ))}
              </Field>
              <ErrorMessage
                name="roleKey"
                component="span"
                style={errorStyle}
                sx={{ m: 0 }}
              />
            </Grid>
            <Grid mb={2}>
              <Field
                name="mobile"
                type="text"
                label="Mobile"
                as={TextField}
                fullWidth
                required
                variant="standard"
              />
              <ErrorMessage name="mobile" component="span" style={errorStyle} />
            </Grid>

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

export default React.memo(ManageUser);
