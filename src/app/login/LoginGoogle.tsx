import { useAppDispatch } from "@/core/services/hook";
import { AuthActions } from "@/modules/auth/slice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
function LoginGoogle() {
  const dispatch = useAppDispatch();

  const clientId =
    "458973661783-mtt3pldt4g152ng9cb2d07ge1srprrv8.apps.googleusercontent.com";

  const onSuccess = (rs: any) => {
    dispatch(
      AuthActions.googleSignIn({
        googleToken: rs.credential,
        onSuccess: (rs: any) => {
          window.location.href = "/order";
        },
        onFail: (rs: any) => {},
      })
    );
  };

  return (
    <div className="flex justify-center w-full">
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={onSuccess} />
      </GoogleOAuthProvider>
    </div>
  );
}

export default LoginGoogle;
