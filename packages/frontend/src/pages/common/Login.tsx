import { notification, Input } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { z, ZodError } from 'zod';
import { login } from '../../service/AdminService';

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password is too short" }),
  });
  
  const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  
      // Clear the error for the field if it exists
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    };
  
    const handleSubmit = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        // Validate form data using Zod schema
        const result = loginSchema.safeParse(formData);
  
        if (!result.success) {
          const fieldErrors: { [key: string]: string } = {};
          result.error.errors.forEach((err) => {
            fieldErrors[err.path[0]] = err.message;
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }
  
        // Proceed with login if validation passes
        login(formData)
          .then((response) => {
            setLoading(false);
            if (response.status === 200) {
              const { accessToken, refreshToken, user } = response.data;
              useAuthStore.getState().login(accessToken, user, refreshToken);
              if (user.role === "admin") {
              navigate("/admin/dashboard");
              } else if (user.role === "organization") {
                navigate("/organization/home");
              } else {
                navigate("/home");
              }
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error.response) {
              notification.error({
                message: "Login failed",
                description: error.response.data.message,
              });
            } else {
              console.error("Login error:", error.message);
            }
          });
      } catch (error) {
        setLoading(false);
        if (error instanceof ZodError) {
          const fieldErrors: { [key: string]: string } = {};
          error.errors.forEach((err) => {
            fieldErrors[err.path[0] as string] = err.message;
          });
          setErrors(fieldErrors);
        } else {
          console.error("Validation error during login:", error);
        }
      }
    };
    return (
        <main className="w-full h-auto flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 flex justify-center">
                <img
                    src={logo}
                    className="h-[90px] w-[90px] lg:absolute lg:top-0 lg:left-64 lg:h-[150px] lg:w-[150px]"
                    alt=""
                />
                <div className="w-full lg:w-8/12 h-[300px] border flex items-center flex-col mt-2 rounded-2xl border-gray-200 lg:mt-24">
                    <div className="w-9/12 lg:mt-6">
                        <label
                            htmlFor="email"
                            className="text-base text-customGrey font-semibold"
                        >
                            Email*
                        </label>
                        <div className="flex items-center gap-2 mt-2">
                            <Input
                                id="email"
                                name="email"
                                className=" p-2 "
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && (
                            <span className="text-red-500">{errors.email}</span>
                        )}
                    </div>

                    <div className="w-9/12 lg:mt-2">
                        <label
                            htmlFor="password"
                            className="text-base text-customGrey font-semibold"
                        >
                            Password*
                        </label>
                        <Input.Password
                            id="password"
                            name="password"
                            className="p-2 mt-2"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <span className="text-red-500">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div className="w-9/12 lg:mt-4 flex justify-center items-center flex-col">
                        <button
                            className="bg-customOrange w-full p-2 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-customOrangeLite"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            Sign In
                        </button>
                        <span className="text-sm mt-2 font-semibold">
                            <a
                                className="hover:text-customOrange transition delay-50 ease-in-out"
                                href="/user/forgotPassword"
                            >
                                Forgot Password ?
                            </a>
                        </span>
                        <span className="text-sm  font-semibold">
                            New to Trend Gully?{' '}
                            <a
                                className="hover:text-customOrange transition delay-50 ease-in-out"
                                href="/register"
                            >
                                Register
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 h-screen bg-black flex justify-center items-center">
                <div className="h-[300px] w-[300px]">{/* Placeholder */}</div>
            </div>
        </main>
    );
};

export default Login;
