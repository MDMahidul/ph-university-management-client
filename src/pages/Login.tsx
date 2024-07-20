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
    const toastId = toast.loading("Logging in...");
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
      
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
      
      navigate(`/${user.role}/dashboard`);

    } catch (error) {

      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    
    }
  };
  
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="ID: " />
        <PHInput type="text" name="password" label="Password: " />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
