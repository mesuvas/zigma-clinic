import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";
import "../css/SignUpPage.css";

import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import HeaderComponentPage from "./HeaderComponent";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Success:", values);

    try {
      const response = await axios.post(
        "http://localhost:3000/patient/login",
        values
      );

      console.log(response.data);
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      message.success("login successful");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (e: any) {
      console.log(e.message);
      message.error("login failed!");
    }
  };

  return (
    <>
      <div className="h-max">
        <HeaderComponentPage />
      </div>
      <div className="body-part  ">
        <div className=" h-[40rem]    flex gap-4 justify-center items-center  ">
          <Form
            className=" rounded-lg form-div h-max pt-5 pb-5 flex justify-center flex-col gap-3  bg-[#546E7A]  w-[25%]"
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
              Please Login!
            </p>

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

            <p className="text-end pl-4 pr-5  text-gray-300 text-u font-bold mb-2 ">
              {" "}
              New to Zigma Medical Clinic !{" "}
              <div
                className="inline underline  text-red-400 hover:cursor-pointer  hover:text-red-900   "
                onClick={() => {
                  navigate("/register");
                }}
              >
                {" "}
                Register
              </div>
            </p>
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
export default LoginPage;
