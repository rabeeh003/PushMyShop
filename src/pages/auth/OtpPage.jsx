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
            axios.post("https://lewoffy.infineur.com/send-otp", { phone: mobileNumber, contry: contry })
                .then((response) => {
                    if (response.data.success === true) {
                        setStep(2)
                    } else {
                        toast.error("Please enter a valid phone number");
                    }
                })
        } else {
            toast.error("Please enter a valid phone number");
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
        axios.post("https://lewoffy.infineur.com/verify-otp", { phone: mobileNumber, otp: otp.join("") }).then((response) => {
            if (response.data.status === "success") {
                setStep(2);
                dispatch(setUserData(response.data))
                toast.success("OTP verified successfully");
                if (response.data.new - user === true) {
                    setStep(3)
                } else {
                    navigate(-1);
                }
            } else {
                toast.error("Invalid OTP");
            }
        }).catch((error) => {
            toast.error("Error verifying OTP:", error);
        });
    };

    const handleNameSubmit = () => {
        axios.post("https://lewoffy.infineur.com/update-user", { name: name, user: selectUserData }).then((response) => {
            if (response.data.status === "success") {
                dispatch(setUserData(response.data))
                toast.success("Name updated successfully");
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
                                    <option value="+971">+971 (UAE)</option>
                                    <option value="+966">+966 (Saudi Arabia)</option>
                                    <option value="+91">+91 (India)</option>
                                    <option value="+92">+92 (Pakistan)</option>
                                    <option value="+249">+249 (Sudan)</option>
                                    <option value="+20">+20 (Egypt)</option>
                                    <option value="+965">+965 (Kuwait)</option>
                                    <option value="+974">+974 (Qatar)</option>
                                    <option value="+973">+973 (Bahrain)</option>
                                    <option value="+968">+968 (Oman)</option>
                                    <option value="+964">+964 (Iraq)</option>
                                    <option value="+962">+962 (Jordan)</option>
                                    <option value="+963">+963 (Syria)</option>
                                    <option value="+961">+961 (Lebanon)</option>
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
                    <div>
                        <h2 className="text-xl font-semibold text-center mb-4">
                            Enter Your Name
                        </h2>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border bg-white text-gray-500 rounded-md input"
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
