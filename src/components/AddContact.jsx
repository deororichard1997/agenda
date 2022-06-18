import {
  Grid,
  Tooltip,
  Button,
  Fab,
  Stack,
  Box,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import React, { useState } from "react";
import { styled } from "@mui/system";
import { base_url } from "../setup/BaseUrl";
import axios from "axios";
import AlertConfirmation from "./AlertConfirmation";

const Form = styled("form")(() => ({
  paddingLeft: "16px",
  paddingRight: "16px",
}));

const fabGreenStyle = {
  color: "#FFFFFF",
  bgcolor: "#1976D2",
  "&:hover": {
    bgcolor: "#1976D2",
  },
};

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "10px",
}));

const AddContact = (props) => {
  //variable de estado para el dialog
  const [open, setOpen] = useState(false);
  //variable de estado para el alert
  const [openAlert, setOpenAlert] = useState(false);

  //funcion para abrir el dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //funcion para abrir el alert
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  //funcin para cerrar el dialog
  const handleClose = () => {
    setOpen(false);;
  };

  //funcion para el envio del formulario
  const handleSubmit = async (values, { isSubmitting }) => {
    if (props.type === "edit") {
      updateNewContact(props.item.id, values);
    }
    if (props.type === "create") {
      postNewContact(values);
    }
  };

  //envio de dats por axios al servidor
  const postNewContact = async (data) => {
    await axios
      .post(base_url, data)
      .then((response) => {
        //success response
        props.getDataContact();
        handleClickOpenAlert();
        handleClose();
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
      });
  };

  //envio de dats por axios al servidor
  const updateNewContact = async (id, data) => {
    await axios
      .put(`${base_url}/${id}`, data)
      .then((response) => {
        //success response
        props.getDataContact();
        handleClickOpenAlert();
        handleClose();
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
      });
  };

  //valores iniciales del formulario
  const initialValues = {
    name: props.type === "edit" ? props.item?.name : "",
    phone: props.type === "edit" ? parseInt(props.item?.phone) : "",
    dateOfBirth: props.type === "edit" ? props.item?.dateOfBirth : "",
    address: props.type === "edit" ? props.item?.address : "",
    email: props.type === "edit" ? props.item?.email : "",
  };

  return (
    <Grid
    //   sm={10}
    //   xs={12}
    //   sx={{ flexGrow: 1, justifyContent: "end", display: "flex" }}
    >
      {props.type === "create" ? (
        <Box
            sx={{ justifyContent: "end", display: "flex" }}
        >
            <Tooltip 
                title="Agregar Contacto"
            >
                <Fab
                    color="inherit"
                    sx={fabGreenStyle}
                    aria-label="add"
                    onClick={handleClickOpen}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Box>
      ) : (
        <IconButton onClick={handleClickOpen}>
          <ModeEditIcon />
        </IconButton>
      )}
      <Dialog open={open} maxWidth="sm" onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Agregar Contacto</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={productSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setSubmitting,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid sx={{ mt: 2 }}>
                  <StyledTextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <StyledTextField
                    name="phone"
                    label="Telefono"
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone || ""}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <StyledTextField
                    name="dateOfBirth"
                    label=""
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="date"
                    defaultValue={""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dateOfBirth || ""}
                    error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                  >
                  </StyledTextField>
                  <StyledTextField
                    name="address"
                    label="Direcion"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address || ""}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <StyledTextField
                    name="email"
                    label="Correo Electronico"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email || ""}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Stack
                  mt={3}
                  mb={2}
                  spacing={2}
                  direction="row"
                  justifyContent="end"
                >
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    // sx={{ mb: 2, px: 6 }}
                  >
                    {props.type === "edit" ? "Update" : "Agregar"}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <AlertConfirmation
        open={openAlert}
        setOpen={setOpenAlert}
        message={
          props.type === "edit"
            ? "Contacto actualizado exitosamente!"
            : "Contacto agregado exitosamente!"
        }
      />
    </Grid>
  );
};

const productSchema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  phone: yup.number().required("Telefono es requerido"),
  dateOfBirth: yup.string().required("Fecha de nacimiento es requerido"),
  address: yup.string().required("Direcion es requerida"),
  email: yup.string().required("Correo Electronico es requerido"),
});

export default AddContact;
