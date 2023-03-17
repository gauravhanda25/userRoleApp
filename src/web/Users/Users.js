import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout/Layout";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  IconButton,
  Paper,
  TableContainer,
  Dialog,
  Toolbar,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteRow } from "../../store/slices/userSlice";
import ManageUser from "./ManageUser";

const Users = () => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [rowToDelete, setRowToDelete] = useState(0);
  const roles = useSelector((state) => state.role.rows);
  const rows = useSelector((state) => state.user.rows);
  const columns = useSelector((state) => state.user.columns);

  const handleEdit = (obj) => {
    setEditRowData(obj);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setRowToDelete(id);
    setShowConfirmBox(true);
    //dispatch(deleteRow(id));
  };

  const addUser = () => {
    setEditRowData({});
    setShowForm(true);
  };

  const confirmDelete = () => {
    setShowConfirmBox(false);
    dispatch(deleteRow(rowToDelete));
  };

  const getRoleName = (key) => {
    return roles.find((e) => e.roleKey === key)?.roleLabel;
  };

  return (
    <Layout>
      <>
        <TableContainer component={Paper}>
          <Toolbar
            sx={{
              px: "16px !important",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Users</Typography>
            <Button onClick={addUser} sx={{}}>
              Add New User
            </Button>
          </Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column, idx) => (
                  <TableCell key={`user-header-${idx}`}>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={`user-row-${row.id}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{getRoleName(row.roleKey)}</TableCell>
                  <TableCell>{`*******`}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={showForm}
          onClose={() => setShowForm(false)}
          fullWidth
          maxWidth={"md"}
        >
          <DialogTitle>
            {editRowData?.id ? "Edit User" : "Add User"}
          </DialogTitle>
          <DialogContent>
            <ManageUser userData={editRowData} setShowForm={setShowForm} />
          </DialogContent>
        </Dialog>

        <Dialog
          open={showConfirmBox}
          onClose={() => setShowConfirmBox(false)}
          fullWidth
          maxWidth={"sm"}
        >
          <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowConfirmBox(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={confirmDelete} autoFocus>
              Delete User
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Layout>
  );
};

export default React.memo(Users);
