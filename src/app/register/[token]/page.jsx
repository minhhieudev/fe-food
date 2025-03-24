import MSTFetch from "../../../core/services/fetch";
import dynamic from "next/dynamic";

// Temporarily removed import for dynamic component
// const ConfirmTokenComponent = dynamic(() => import("@/app-pages/auth/register"), {
//   ssr: false,
// });

async function fetchData(token) {
  const res = await MSTFetch.post(`frontend-api/customer-auth/register/verify-email`, { token });

  if (res.success) {
    return true;
  } else {
    return false;
  }
}

const BioPage = async ({ params }) => {
  const data = await fetchData(params.token);

  // Temporarily removed component rendering
  // return <ConfirmTokenComponent isConfirmToken={true} isVerify={data} />;
};

export default BioPage;
