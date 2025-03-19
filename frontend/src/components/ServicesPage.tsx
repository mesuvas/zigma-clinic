import React, { useContext, useState } from "react";
import "../css/ServicesPage.css";

import vaccination from "../images/vaccination.jpg";
import generalMedicine from "../images/general-medicine.jpg";
import bloodTest from "../images/blood-test.jpg";
import woundCare from "../images/wound-care.jpg";
import allergy from "../images/allergy.jpg";
import teethSurgery from "../images/teethCheckUp.jpg";
import HeaderComponentPage from "./HeaderComponent";

import { Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import { MyContext } from "./Context";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const navigate = useNavigate();
  const { patientInfo, accessToken, doctorInfo }: any = useContext(MyContext);
  const { Option } = Select;

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const onFinish: any["onFinish"] = async (values: any) => {
    const updatedValues = {
      ...values,
      status: "booked",
      patientID: patientInfo._id,
    };
    console.log("Success:", updatedValues);

    try {
      const response = await axios.post(
        "http://localhost:3000/patient/appointment/register",
        updatedValues,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);
      message.success("appointment create successfully");
    } catch (e: any) {
      console.log(e.message);
      message.error(e.message);
    }
  };

  const showModal = () => {
    if (!accessToken) {
      navigate("/register");
    }
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onGenderChange = (value: string) => {
    console.log("Selected Doctor ID:", value);
  };

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

  return (
    <>
      <div>
        <HeaderComponentPage />
      </div>

      {/* // body */}
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

      <div className="flex justify-center mb-4">
        <div className="w-[30%]">
          <button className=" bg-blue-600" onClick={showModal}>
            <p className="text-center ">Book Now</p>
          </button>
          <div>
            <Modal
              width={800}
              title="Create an appointment"
              open={open}
              footer={[]}
              onCancel={handleCancel}
            >
              <div>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="doctorID"
                    label="Doctor"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Select a option and change input text above"
                      onChange={onGenderChange}
                      allowClear
                    >
                      {doctorInfo.map((doctor) => {
                        return (
                          <>
                            {console.log(doctor.doctorName)}
                            <Option key={doctor._id} value={doctor._id}>
                              {doctor.doctorName} - {doctor.specialty}
                            </Option>
                          </>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Appointment Date"
                    name="appointmentDate"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Appoinment Time"
                    name="appointmentTime"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item className="w-[100%] flex justify-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-[500%]"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
