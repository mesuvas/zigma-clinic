import { useContext, useState } from "react";
import "../css/ClickInfo.css";
import clinicImage from "../images/wound-care.jpg";
import { FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import { MyContext } from "./Context";

const ClinicInfo = () => {
  const { Option } = Select;
  const navigate = useNavigate();

  const { patientInfo, accessToken, doctorInfo }: any = useContext(MyContext);

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

  return (
    <>
      <div className="clinic-container">
        <div className="clinic-content">
          <h2 className="clinic-title">Your Health is Our Priority</h2>
          <p className="clinic-description">
            Whether you’re a tourist or a local resident, we’re here to take
            care of you. We’re open every day, and you can receive services on a
            walk-in basis or by appointment. Our team of experts is ready to
            provide consultation and care, supported by modern equipment and
            fast service.
          </p>

          <div className="clinic-info">
            <div className="clinic-detail">
              <FaClock className="icon" />
              <div>
                <strong>Opens Everyday</strong>
                <p>09:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="clinic-detail">
              <FaMapMarkerAlt className="icon" />
              <div>
                <strong>Address</strong>
                <p>Bennelong Point, NSW 2000, Australia</p>
              </div>
            </div>
          </div>

          <div className="clinic-buttons">
            <button className="btn booking" onClick={showModal}>
              <FaPhone className="btn-icon" /> Booking Now
            </button>
            <button
              className="btn line"
              onClick={() => {
                navigate("/service");
              }}
            >
              View Our Sevices
            </button>
          </div>
        </div>

        <div className="clinic-image">
          <img src={clinicImage} alt="Family at clinic" />
        </div>
      </div>

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
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Appoinment Time"
                name="appointmentTime"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item className="w-[100%] flex justify-center">
                <Button type="primary" htmlType="submit" className="w-[500%]">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ClinicInfo;
