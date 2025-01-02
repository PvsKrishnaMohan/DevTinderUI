import React,{ useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";


const Login = () => {
  const [emailId, setEmailId] = useState("pvskrishnamohan479@gmail.com");
  const [password, setPassword] = useState("Mohan479$");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async()=>{
    try{
        const resp = await axios.post(BASE_URL +"/login", {
        emailId,
        password
      },{withCredentials : true}) // if we dont use withCredentials while using axios we wont get token back from backend
      dispatch(addUser(resp.data));
      return navigate("/")
    } catch(err){
      console.error(err);
    }
  }
  return (
    <div className="flex items-center justify-center my-36">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                value = { emailId }
                onChange = {(e) => setEmailId(e.target.value)}
              />
              <div className="label">
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                value = { password }
                onChange = {(e) => setPassword(e.target.value)}
              />
              <div className="label">
              </div>
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
