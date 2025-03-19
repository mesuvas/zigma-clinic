import { Link, useNavigate } from "react-router-dom";
import "../css/HomePage.css";
import "../css/SignUpPage.css";

import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
import HeaderComponentPage from "./HeaderComponent";

const RegisterPage = () => {
  const navigate = useNavigate();
  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Success:", values);

    try {
      const response = await axios.post(
        "http://localhost:3000/patient/register",
        values
      );

      alert(response.data.message);
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div>
        <HeaderComponentPage />
      </div>
      <div className="body-part  ">
        {/* body part */}

        <div className=" h-[40rem]  flex gap-4 justify-center items-center  ">
          <Form
            className=" rounded-lg form-div  bg-[#546E7A] pt-4  w-[30%]"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <p className="text-center text-gray-300 font-bold mb-2 text-[20px]">
              {" "}
              Register
            </p>
            <Form.Item
              label={<span style={{ color: "white" }}>Full Name</span>}
              name="patientName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "white" }}>Email</span>}
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "white" }}>Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "white" }}>Address</span>}
              name="patientAddress"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "white" }}>DOB</span>}
              name="dob"
              rules={[
                { required: true, message: "Please input your date of birth!" },
              ]}
            >
              <Input placeholder="yyyy-mm-dd" />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "white" }}>Phone Number</span>}
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item className="w-[100%] flex justify-center">
              <Button type="primary" htmlType="submit" className="w-max">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
