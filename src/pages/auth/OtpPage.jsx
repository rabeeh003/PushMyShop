import axios from "axios";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectUserData, setUserData } from "../../store/appSlice";

const OTPPage = () => {
    const [step, setStep] = useState(1); // 1: Enter mobile, 2: Enter OTP
    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [contry, setContry] = useState("");
    const [name, setName] = useState("");
    const inputRefs = useRef([]); // To manage focus on OTP inputs
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSendOtp = () => {
        if (mobileNumber.length >= 8) {
            axios.post("https://lewoffy.infineur.com/public/api/custom-otp-user", { phone: (contry + mobileNumber.toString()) })
                //exsame : https://lewoffy.infineur.com/public/api/custom-otp-user?phone=+919001234567
                .then((response) => {
                    if (response.data.otp === true) {
                        setStep(2)
                    } else {
                        toast.error("OTP not sent");
                    }
                })
        } else {
            if (error.response) {
                // Server returned a response
                toast.error(`Unvalid Number: ${error?.response.data?.message}`);
            } else if (error.request) {
                // No response received
                toast.error("Network Error: Please check your connection.");
            } else {
                // Other errors
                toast.error(`Error: ${error.message}`);
            }
        }
    };

    const handleChangeOtp = (value, index) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value.slice(0, 1);
        setOtp(updatedOtp);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleOtpSubmit = () => {
        axios.post(`https://lewoffy.infineur.com/public/api/login-otp-user`, { phone: (contry + mobileNumber.toString()), otp: otp.join("") }) // exsample : https://lewoffy.infineur.com/public/api/login-otp-user?phone=+919001234567&otp=123456
            .then((response) => {
                if (response.data.success === true) {
                    setStep(2);
                    toast.success("OTP verified successfully");
                    dispatch(setUserData(response.data))
                    navigate("/");
                } else {
                    if (response.data.data === 'NEWUSER') {
                        setStep(3)
                    } else if (error.response) {
                        toast.error(`Invalid otp Error: ${error?.response.data?.message}`);
                    } else if (error.request) {
                        toast.error("Network Error: Please check your connection.");
                    } else {
                        toast.error(`Error: ${error.message}`);
                    }
                }
            }).catch((error) => {
                toast.error("Error verifying OTP:", error);
            });
    };

    const handleNameSubmit = () => {
        axios.post("https://lewoffy.infineur.com/public/api/register-otp-user", { phone: (contry + mobileNumber.toString()), otp: otp.join(""), name: name }) // exsample : https://lewoffy.infineur.com/public/api/register-otp-user?phone=+919001234567&otp=123456&name=John+Doe
            .then((response) => {
                if (response.data.success === true) {
                    dispatch(setUserData(response.data))
                    toast.success("Verified successfully");
                    navigate(-1);
                } else {
                    toast.error("Error updating name");
                }
            }).catch((error) => {
                toast.error("Error updating name:", error);
            });
    };

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center">
            <div className="w-full h-[50vh] bg-orange-200 relative overflow-hidden">
                <img
                    src="/login-img.jpg"
                    alt="Header Graphic"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>
            <div className="w-full max-w-sm p-4">
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-black">
                            Enter your mobile number to get OTP
                        </h2>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                                Mobile Number
                            </label>
                            <div className="flex">
                                <select onChange={(e) => setContry(e.target.value)} className="p-2 max-w-20 border rounded-l-md bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-warning">
                                    <option value="971">+971 (UAE)</option>
                                    <option value="966">+966 (Saudi Arabia)</option>
                                    <option value="91">+91 (India)</option>
                                    <option value="92">+92 (Pakistan)</option>
                                    <option value="249">+249 (Sudan)</option>
                                    <option value="20">+20 (Egypt)</option>
                                    <option value="965">+965 (Kuwait)</option>
                                    <option value="974">+974 (Qatar)</option>
                                    <option value="973">+973 (Bahrain)</option>
                                    <option value="968">+968 (Oman)</option>
                                    <option value="964">+964 (Iraq)</option>
                                    <option value="962">+962 (Jordan)</option>
                                    <option value="963">+963 (Syria)</option>
                                    <option value="961">+961 (Lebanon)</option>
                                </select>

                                <input
                                    type="number"
                                    placeholder="Enter Phone Number"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="flex-grow p-2 border bg-white text-gray-500 rounded-r-md focus:outline-none focus:ring-2 focus:ring-warning"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                        >
                            Send OTP
                        </button>
                        <p className="text-xs text-center mt-20 text-gray-500">
                            By continuing, you agree to our{" "}
                            <span className="underline">Terms of Service</span>,{" "}
                            <span className="underline">Privacy Policy</span>, and{" "}
                            <span className="underline">Content Policy</span>.
                        </p>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <button
                            onClick={() => setStep(1)}
                            className="text-gray-500 mb-4 hover:underline"
                        >
                            &larr; Back
                        </button>
                        <h2 className="text-xl font-semibold text-center mb-4">
                            OTP Verification
                        </h2>
                        <p className="text-sm text-gray-500 text-center mb-4">
                            We have sent a verification code to <br />
                            <span className="font-bold">{contry} {mobileNumber}</span>
                        </p>
                        <div className="flex gap-2 justify-center mb-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={digit}
                                    ref={(el) => (inputRefs.current[index] = el)} // Store ref
                                    onChange={(e) => handleChangeOtp(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-10 h-10 text-center bg-white text-black border border-gray-300 rounded text-xl focus:outline-none focus:border-orange-500"
                                    maxLength="1"
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleOtpSubmit}
                            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                        >
                            Continue
                        </button>
                    </div>
                )}
                {step === 3 && (
                    <div className="flex flex-col items-center gap-3 justify-center">
                        <h2 className="text-xl font-semibold text-center mb-4">
                            Enter Your Name
                        </h2>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input min-w-full p-2 border bg-white text-gray-500 rounded-md "
                        />
                        <button
                            onClick={handleNameSubmit}
                            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default OTPPage;
