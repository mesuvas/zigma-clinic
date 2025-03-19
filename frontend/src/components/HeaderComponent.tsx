import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "./Context";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { Modal } from "antd";
import axios from "axios";
import "../css/Header.css";

const HeaderComponentPage = () => {
  const { accessToken, patientFirstLetter }: any = useContext(MyContext);
  const [appointmentInfo, setAppoinmentInfo]: any = useState([]);
  const [open, setOpen] = useState(false);
  const showModal = async () => {
    setOpen(true);

    try {
      const response = await axios.get(
        "http://localhost:3000/patient/appointment/getDetails",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setAppoinmentInfo(response.data.appointmentInfo);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      disabled: true,
      key: "1",
      label: <p>My ACCOUNT</p>,
    },
    {
      key: "2",
      label: <p onClick={showModal}>Appointment Details</p>,
    },
    {
      key: "3",
      label: (
        <Button
          type="primary"
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.location.reload();
            navigate("/");
          }}
        >
          Sign Out
        </Button>
      ),
    },
  ];

  return (
    <>
      <div>
        {!accessToken ? (
          <>
            {" "}
            <div className="navbar">
              <div className="logo flex items-center gap-4">
                <div className="logo-div w-[40px] h-[40px] rounded-[50%] bg-red-500"></div>
                <p>Zigma Medical Clinic</p>
              </div>
              <ul className="nav-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/service">Services</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="navbar h-[10%]">
              <div className="logo flex items-center gap-4">
                <div className="logo-div w-[40px] h-[40px] rounded-[50%] bg-red-500"></div>
                <p>Zigma Medical Clinic</p>
              </div>
              <ul className="nav-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/service">Services</Link>
                </li>

                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <div className="w-[30px] flex justify-center items-center h-[30px] hover:cursor-pointer bg-white rounded-[50%]">
                    <p className=" text-red-600 font-semibold ">
                      {patientFirstLetter}
                    </p>
                  </div>
                </Dropdown>
              </ul>
            </div>
          </>
        )}
      </div>
      <div>
        <Modal
          width={800}
          title="Appointment History"
          open={open}
          footer={[]}
          onCancel={handleCancel}
        >
          <div>
            {appointmentInfo.map((appointment): any => (
              <li key={appointment._id}>
                <p>
                  <strong>Doctor:</strong> {appointment.doctorID.doctorName}
                </p>
                <p>
                  <strong>Specialty:</strong> {appointment.doctorID.specialty}
                </p>
                <p>
                  <strong>Appointment Date:</strong>{" "}
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.appointmentTime}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>
                <hr className="mt-4" />
              </li>
            ))}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default HeaderComponentPage;
