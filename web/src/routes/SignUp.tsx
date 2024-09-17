import { ChangeEventHandler, useState } from "react";
import { API_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
interface SignUpSuccess {
  message: string;
}
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    // setErrorMessage("");
  };
  const onSignUpClick = async () => {
    if (!email) return;

    try {
      const response = await fetch(`${API_URL}/newsletter/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const payload = (await response.json()) as SignUpSuccess;
      const isOkRequest = response.status === 200 || response.status === 201;
      if (!isOkRequest) {
        if (typeof payload === "string") {
          return setErrorMessage(payload);
        }
        return setErrorMessage("Invalid Mail");
      }
      navigate("/confirm-email-sent");
    } catch (error: unknown) {
      console.log(error);
      setErrorMessage("An unexpected error occurred");
      setEmail("");
    }
    console.log("SignUp clicked");
  };
  return (
    <>
      <div className="m-4 mb-10 text-center text-3xl font-bold">
        <h1>
          Welcone to the{" "}
          <span className="text-orange-600">Newsletter service</span>
        </h1>
        <h2> Please signup bellow to be the first to get notified!</h2>
      </div>

      <div className="flex flex-col text-center justify-center">
        <div className="flex mt-1 justify-center items-end">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm text-start mb-1 text-opacity-70">
              Signup with your email address
            </span>
            <span className="text-gray-500 text-sm text-start mb-1 text-opacity-70">
              {errorMessage}
            </span>
            <div className="flex">
              <input
                value={email}
                placeholder="Email"
                onChange={onEmailChange}
                className="border p-2 rounded mr-4"
              />
              <button
                onClick={onSignUpClick}
                className="border rounded p-2 flex justify-center items-center"
              >
                Sign Up
              </button>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
