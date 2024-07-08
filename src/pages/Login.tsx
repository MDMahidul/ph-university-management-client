import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    try {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">ID: </label>
          <input type="text" id="id" {...register("userId")} />
        </div>
        <div>
          <label htmlFor="">Password: </label>
          <input type="text" id="password" {...register("password")} />
        </div>
        <Button htmlType="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
