import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });

  const [login, { data, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit =async (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res=await login(userInfo).unwrap(); // unwrap() to exclude the parent layer and the data

    // now pass the res data to verifyToken
    const user=verifyToken(res.data.accessToken);
    console.log(user);

    // set user data to redux state
    dispatch(setUser({user:user,token:res.data.accessToken}))
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
