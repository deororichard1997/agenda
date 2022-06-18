import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/system";
import {
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { base_url } from "../setup/BaseUrl";
import moment from "moment";
import AddContact from "./AddContact";
import AlertConfirmation from "./AlertConfirmation";
import DialogDeleteConfirm from "./DialogDeleteConfirm"

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const DataTableList = () => {
  //seteamos la data
  const [dataContacts, setDataContacts] = useState([]);
  //variable para esperar la respuesta del servcicio
  const [loading, setLoading] = useState(false);
  //variable para el alert
  const [openAlert, setOpenAlert] = useState(false);

  // obtener la data del servidor
  const getDataContact = async () => {
    await axios
      .get(base_url)
      .then((response) => {
        const data = response.data;
        //success response
        setDataContacts(data);
        setLoading(true);
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
      });
  };

  //funcion para abrir el alert
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  //Eliminar registro
  const deleteDataContact = async (id) => {
    await axios
      .delete(`${base_url}/${id}`)
      .then((response) => {
        //success response
        getDataContact();
        handleClickOpenAlert();
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
      });
  };

  //funcion para hallat la edad
  function getAge(date) {
    //Debe estar en formato YYYY-MM-DD
    let birth = moment(date);
    let today = moment();
    let age = 0;
    if (birth < today) {
        //Calculamos la diferencia en años
      age = today.diff(birth, "years"); 
    } else {
        age = "Fecha es mayor a la actual";
    }
    return age;
  }

  //ejecutamos la funcion para obtener la data
  useEffect(() => {
    getDataContact();
  }, []);

  //declaramos las columndas de la tabla
  const columns = [
    {
      name: "name",
      label: "NOMBRE",
      options: {
        filter: true,
      },
    },
    {
      name: "email",
      label: "EMAIL",
      options: {
        filter: true,
      },
    },
    {
      name: "phone",
      label: "TELEFONO",
      options: {
        filter: true,
      },
    },
    {
      name: "dateOfBirth",
      label: "EDAD",
      options: {
        filter: true,
        customBodyRenderLite: (index) => {
        let ageUser = getAge(dataContacts[index].dateOfBirth)
          return(
            <span>{ageUser}</span>
          )
        },
      },
    },
    {
      name: "address",
      label: "DIRECION",
      options: {
        filter: true,
      },
    },
    {
      name: "",
      label: "",
      options: {
        customBodyRenderLite: (index) => {
          return (
            <FlexBox>
              <AddContact
                type={"edit"}
                item={dataContacts[index]}
                getDataContact={getDataContact}
              />
              <DialogDeleteConfirm
                executeFunction={deleteDataContact}
                itemId={dataContacts[index].id}
              />
            </FlexBox>
          );
        },
      },
    },
  ];

  //Obciones del componente mui-datatables, filtrado
  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    elevation: 4,
  };

  return (
    <div>
      {/* <Grid> */}
        <Box mt={4} display="block">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold', justifyContent: "center", display: "flex" }}
          >
            LISTA DE CONTACTOS
          </Typography>
        </Box>
        {loading && (
          <AddContact type={"create"} getDataContact={getDataContact} />
        )}
      {/* </Grid> */}
      <Box mt={1}>
        {loading ? (
          <Box minWidth={650}>
            <MUIDataTable
              title={""}
              data={dataContacts}
              columns={columns}
              options={options}
            />
          </Box>
        ) : (
          <Box
            sx={{
              mt: 4,
              display: "flex",
              aligCenter: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      <AlertConfirmation
        open={openAlert}
        setOpen={setOpenAlert}
        message={"Contacto eliminado exitosamente!"}
      />
    </div>
  );
};
