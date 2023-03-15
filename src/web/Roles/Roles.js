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
import { deleteRow } from "../../store/slices/roleSlice";
import ManageRole from "./ManageRole";

const Roles = () => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [rowToDelete, setRowToDelete] = useState(0);
  const rows = useSelector((state) => state.role.rows);
  const columns = useSelector((state) => state.role.columns);

  const handleEdit = (obj) => {
    setEditRowData(obj);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setRowToDelete(id);
    setShowConfirmBox(true);
    //dispatch(deleteRow(id));
  };

  const addRole = () => {
    setEditRowData({});
    setShowForm(true);
  };

  const confirmDelete = () => {
    setShowConfirmBox(false);
    dispatch(deleteRow(rowToDelete));
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
            <Typography>Roles</Typography>
            <Button onClick={addRole} sx={{}}>
              Add New Role
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
                  <TableCell>{row.roleLabel}</TableCell>
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

        <Dialog open={showForm} onClose={() => setShowForm(false)}>
          <DialogTitle>
            {editRowData?.id ? "Edit Role" : "Add Role"}
          </DialogTitle>
          <DialogContent>
            <ManageRole roleData={editRowData} setShowForm={setShowForm} />
          </DialogContent>
        </Dialog>

        <Dialog open={showConfirmBox} onClose={() => setShowConfirmBox(false)}>
          <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this role?
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
              Delete Role
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Layout>
  );
};

export default Roles;
