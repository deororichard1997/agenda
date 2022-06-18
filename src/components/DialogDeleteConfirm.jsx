import React, {useState} from 'react';
import {Button, Tooltip, IconButton} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from "@mui/icons-material/Delete";
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

    const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton onClick={() => handleClickOpenDelete()}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <DialogTitle>¿Desea eliminar el registro?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete}>No</Button>
          <Button onClick={() => {handleCloseDelete(); props.executeFunction(props.itemId)}}>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
