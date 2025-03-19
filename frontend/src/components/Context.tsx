import { Alert } from "antd";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Create the context
export const MyContext = createContext();

const MyContextProvider = ({ children }: any) => {
  const [patientInfo, setPatientInfo] = useState([]);
  const [accessToken, setAccessToken]: any = useState("");
  const [patientFirstLetter, setPatientFirstLetter]: any = useState("");
  const [doctorInfo, setDoctorInfo]: any = useState([]);

  useEffect(() => {}, []);
  return (
    <MyContext.Provider
      value={{
        patientInfo,
        setPatientInfo,
        accessToken,
        setAccessToken,
        patientFirstLetter,
        setPatientFirstLetter,
        setDoctorInfo,
        doctorInfo,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
