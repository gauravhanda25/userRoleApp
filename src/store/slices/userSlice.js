import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    columns: [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "name",
        headerName: "Name",
      },
      {
        field: "email",
        headerName: "Email",
        type: "email",
      },
      {
        field: "username",
        headerName: "Username",
      },
      {
        field: "mobile",
        headerName: "Mobile",
      },
      {
        field: "roleKey",
        headerName: "Role",
      },
      {
        field: "password",
        headerName: "Password",
      },
      {
        field: "actions",
        headerName: "Actions",
      },
    ],
    rows: [
      {
        id: 1,
        name: "John",
        email: "john@gmail.com",
        mobile: "+91-9168117677",
        password: "password",
        username: "john007",
        roleKey: "admin",
      },
      {
        id: 2,
        name: "Jack",
        email: "jack@gmail.com",
        mobile: "+91-9168117677",
        password: "password",
        username: "jack007",
        roleKey: "hr",
      },
      {
        id: 3,
        name: "Ricky",
        email: "ricky@gmail.com",
        mobile: "+91-9168117677",
        password: "password",
        username: "Ricky007",
        roleKey: "admin",
      },
    ],
  },
  reducers: {
    deleteRow: (state, action) => {
      const index = state.rows.findIndex((row) => row.id === action.payload);
      state.rows.splice(index, 1);
    },
    saveUser: (state, action) => {
      const { id, name, email, mobile, password, username, roleKey } =
        action.payload;
      if (id) {
        const userIndex = state.rows.findIndex((role) => role.id === id);
        state.rows[userIndex].name = name;
        state.rows[userIndex].email = email;
        state.rows[userIndex].mobile = mobile;
        state.rows[userIndex].password = password;
        state.rows[userIndex].username = username;
        state.rows[userIndex].roleKey = roleKey;
      } else {
        let newRole = action.payload;
        newRole.id = state.rows.length + 1;
        state.rows.push(newRole);
      }
    },
  },
});

export const { deleteRow, saveUser } = userSlice.actions;

export default userSlice.reducer;
