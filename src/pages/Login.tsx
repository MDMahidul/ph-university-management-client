import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
   const defaultValues= {
      userId: "A-0001",
      password: "admin123",
    }

  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...", {
      style: { padding: "10px" },
    });
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap(); // unwrap() to exclude the parent layer and the data

      // now pass the res data to verifyToken
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user);

      // set user data to redux state
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      
      toast.success("Logged in successfully!", {
        id: toastId,
        duration: 2000,
        style: { padding: "10px" },
      });
      
      navigate(`/${user.role}/dashboard`);

    } catch (error) {

      toast.error("Something went wrong!", { id: toastId, duration: 2000,style:{padding:'10px'} });
    
    }
  };
  
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        backgroundImage: "url('/images/uni.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          backgroundColor: "#F5F7F8",
          padding: "50px 100px",
          zIndex: "2",
        }}
      >
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput
            type="text"
            name="userId"
            label="ID: "
            placeholder="user id"
          />
          <PHInput
            type="text"
            name="password"
            label="Password: "
            placeholder="******"
          />
          <Button htmlType="submit">Login</Button>
        </PHForm>
      </div>
    </Row>
  );
};

export default Login;
