import { useContext, useEffect, useState } from "react";

import "../css/AboutZigma.css";
import "../css/ClickInfo.css";
import { MyContext } from "./Context";
import HeaderComponentPage from "./HeaderComponent";

const AboutPage = () => {
  const [accessToken, setAccessTOken]: any = useState("");
  const { patientInfo, setPatientInfo }: any = useContext(MyContext);
  const [patientFirstLetter, setPatientFirstLetter]: any = useState("");

  const getToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    setAccessTOken(accessToken);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <div>
        <HeaderComponentPage />
      </div>

      {/* body part */}
      <div>
        <div className="flex mt-4 justify-center">
          <div className="flex w-[90%]  ">
            <div className="w-[60%] bg-building  h-[25rem] relative  bg-red-400">
              <div className="w-[40%] h-[50%] absolute flex items-center  rounded-xl   right-0 bottom-10 bg-[#2380c7]">
                <p className=" text-white text-center">
                  Zigma Medical Clinic is a nonprofit organization committed to
                  clinical practice, education and research, providing expert,
                  whole-person care to everyone who needs healing.
                </p>
              </div>
            </div>
            <div className="w-[40%] flex justify-center items-center  ">
              <div className="w-[50%] text-center bg-[#E43E76] rounded-lg pt-3 pl-2 pb-3 pr-2 text-[whitesmoke]">
                <p className="text-2xl font-semibold ">Find a doctor</p>
                <p className="pt-3">
                  Browse or search our list of specialists, and request and
                  appointment.
                </p>
                <p className="text-xl pt-2 font-semibold">
                  Locate a Mayo Clinic physician
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-500 font-bold text-2xl m-4"> </p>
      <div className="flex justify-center">
        <div className=" p-5 flex flex-col w-[60%]">
          <p className="text-gray-500 text-2xl font-bold">
            About Zigma Medical Clinic
          </p>
          <p className=" text-[17px] font-medium pt-2">
            Zigma Medical Clinic is a nonprofit organization dedicated to the
            advancement of clinical practice, education, and research. Our
            mission is to provide expert, whole-person care to everyone in need
            of healing. We are committed to delivering the highest standards of
            medical care, driven by a passion for innovation and a deep sense of
            responsibility towards our community. At Zigma Medical Clinic, our
            clinical practice is centered around the patient. We offer a wide
            range of specialties, ensuring that each individual receives
            comprehensive and personalized care. Our team of skilled physicians,
            nurses, and healthcare professionals work collaboratively to address
            the unique needs of every patient, promoting health and well-being
            at every stage of life.Education is at the core of our mission. We
            are devoted to training the next generation of healthcare providers
            through our residency and fellowship programs. By fostering a
            culture of continuous learning, we ensure that our practitioners are
            equipped with the latest knowledge and skills to provide exceptional
            care. Additionally, we offer educational resources and programs for
            patients and the community, empowering individuals to take charge of
            their health.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
