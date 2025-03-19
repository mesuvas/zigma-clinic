import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";
import "../css/ServicesPage.css";
import { useContext, useEffect } from "react";
import axios from "axios";
import { MyContext } from "./Context";
import HeaderComponentPage from "./HeaderComponent";

import vaccination from "../images/vaccination.jpg";
import generalMedicine from "../images/general-medicine.jpg";
import bloodTest from "../images/blood-test.jpg";
import woundCare from "../images/wound-care.jpg";
import allergy from "../images/allergy.jpg";
import teethSurgery from "../images/teethCheckUp.jpg";
import ClinicInfo from "./ClinicInfo";

const HomePage = () => {
  const navigate = useNavigate();

  const {
    patientInfo,
    setPatientInfo,
    setAccessToken,
    setPatientFirstLetter,
    patientFirstLetter,
    doctorInfo,
    setDoctorInfo,
  }: any = useContext(MyContext);

  const items: any["items"] = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            localStorage.setItem("accessToken", "");
            navigate("/");
          }}
        >
          Sign Out
        </p>
      ),
    },
  ];

  const services = [
    { name: "Vaccination", image: vaccination },
    {
      name: "General Medicine & Check-up",
      image: generalMedicine,
    },
    { name: "Blood Test", image: bloodTest },
    { name: "Wound Care Services", image: woundCare },
    { name: "Chest, Respiratory, Allergy", image: allergy },
    { name: "Annual Check-up Programme", image: teethSurgery },
  ];

  const getToken = async () => {
    const accessToken = localStorage.getItem("accessToken");

    console.log(accessToken);
    setAccessToken(accessToken);

    try {
      const response = await axios.get(
        "http://localhost:3000/patient/profile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setPatientInfo(response.data.patientInfo);
      const patientName = response.data.patientInfo.patientName;
      setPatientFirstLetter(patientName.charAt(0));
    } catch (e: any) {
      console.log(e.message);
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/patient/doctor/getDetails"
      );

      console.log(response.data.doctorList);
      setDoctorInfo(response.data.doctorList);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  console.log(patientFirstLetter);
  useEffect(() => {
    getToken();
  }, []);
  return (
    <>
      <div>
        <HeaderComponentPage />
      </div>
      <div className="body-part  ">
        <div className=" h-[40rem]  flex gap-4 justify-center items-center  ">
          <div className="w-[50%] h-[70%] flex flex-col gap-4  ">
            <div className=" p-2 w-max  rounded-md bg-[#c4dfeb]">
              <p className="text-[#435b7b] font-semibold">
                Zigma Medical Group | Outpatient Care & Speciality Surgery
              </p>
            </div>
            <div>
              <p className="font-extrabold text-[4rem]  text-gray-500">
                {" "}
                Zigma Medical is
              </p>
              <p className="font-extrabold text-[4rem]  text-gray-500">
                here for you{" "}
              </p>
            </div>

            <p className="font-extrabold text-center text-gray-500">
              With more than 42+ specialties and Primary Care, Zigma Medical
              Group is here to take care of you and your family.
            </p>
          </div>
          <div className="w-[30%] relative  font-extrabold text-[50px] h-[70%] nurse-image  rounded-[50%]   ">
            <div
              className="w-[200px] rounded-md h-max absolute   bottom-0
      right-0 bg-[#0d214f]"
            >
              <p className="text-[15px] text-gray-300 p-4">
                {" "}
                Get a discount for first time visit
              </p>
              <div className="flex items-center">
                <p className="text-[15px] text-gray-300 p-2"> 20%</p>
                <div className="w-max p-1 h-[20px] bg-[whitesmoke]">
                  <p className="text-[9px] text-gray-600">
                    {" "}
                    request an appointment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="services-container">
          <h2 className="services-title">
            Our <span>Service</span>
          </h2>
          <p className="services-description">
            With fast and standardized services, we aim to provide the highest
            quality and comprehensive healthcare.
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-image"
                />
                <div className="service-name">{service.name}</div>
              </div>
            ))}
          </div>
        </div>

        <ClinicInfo />
      </div>
    </>
  );
};

export default HomePage;
