import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export const Form = () => {
  const navigate = useNavigate();
  const gender = ["Male", "Female"];
  const [formData, setFormData] = useState({
    birthYear: 0,
    gender: gender[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    const inputValue = type === "radio" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: inputValue }));
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      birthYear: String(formData.birthYear),
      gender: formData.gender,
    }).toString();
    navigate(`/check?${queryParams}`);
  };

  return (
    <form onSubmit={handleNext}>
      <label className="input-label" htmlFor="birth-year">
        Birth Year
      </label>
      <input className="text" type="number" placeholder="1991" />
      <span id="birth-year-error" className="error"></span>
      <label className="input-label" htmlFor="gender">
        Gender
      </label>
      <div>
        {gender.map((item) => {
          return (
            <div className="radio-group" key={item}>
              <input
                className="text"
                type="radio"
                name="gender"
                value={item}
                checked={item === formData.gender}
                onChange={handleChange}
              />
              <label className="radio-label" htmlFor={item}>
                {item}
              </label>
            </div>
          );
        })}
      </div>
      <input className="form-button" type="submit" value="START" />
    </form>
  );
};
