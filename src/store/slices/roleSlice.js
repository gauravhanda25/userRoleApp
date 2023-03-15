import { createSlice, current } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "role",
  initialState: {
    columns: [
      { field: "id", headerName: "ID" },
      {
        field: "roleLabel",
        headerName: "Role Name",
      },
      {
        field: "actions",
        headerName: "Actions",
      },
    ],
    rows: [
      { id: 1, roleLabel: "Admin", roleKey: "admin" },
      { id: 2, roleLabel: "Employee", roleKey: "employee" },
      { id: 3, roleLabel: "HR", roleKey: "hr" },
    ],
  },
  reducers: {
    deleteRow: (state, action) => {
      const index = state.rows.findIndex((row) => row.id === action.payload);
      state.rows.splice(index, 1);
    },
    saveRole: (state, action) => {
      const { id, roleLabel } = action.payload;
      if (id) {
        const userIndex = state.rows.findIndex((role) => role.id === id);
        state.rows[userIndex].roleLabel = roleLabel;
      } else {
        let newRole = {
          id: state.rows.length + 1,
          roleKey: roleLabel.replace(" ", "").toLowerCase(),
          roleLabel,
        };
        state.rows.push(newRole);
      }
    },
  },
});

export const { deleteRow, saveRole } = roleSlice.actions;

export default roleSlice.reducer;
