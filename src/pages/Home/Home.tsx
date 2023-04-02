import "./Home.css";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import { Form } from "../../components/Form/Form";

export const Home = () => {
  return (
    <div id="main-container">
      <div id="main-title">
        <h1>SYMPTOM CHECKER</h1>
        <MedicalServicesOutlinedIcon style={{ fontSize: "40px" }} />
      </div>
      <Form />
    </div>
  );
};
