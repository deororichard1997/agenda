import React, { useState, useEffect } from "react";
import axios from "axios";

const getDataContact = async (base_url) => {
  await axios
    .get(base_url)
    .then((response) => {
      const data = response.data;
      return data;
      //success response
      // setData(data);
    })
    .catch((error) => {
      return error;
    });
};

const postDataContact = async (base_url, data) => {
  //envio de dats por axios al servidor
  await axios
    .post(base_url, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
      // handle error
      console.log(error.message);
    });
};

const deleteDataContact = async (base_url, id) => {
  await axios
    .delete(`${base_url}/${id}`)
    .then((response) => {
      //success response
      getDataContact();
    })
    .catch((error) => {
      // handle error
      console.log(error.message);
    });
};

const objExport = {
  getDataContact,
  postDataContact,
  deleteDataContact
};

export default objExport;
