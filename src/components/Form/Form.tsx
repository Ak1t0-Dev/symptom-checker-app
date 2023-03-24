import { useState } from "react";
import "./Form.css";

export const Form = () => {
  const gender = ["Male", "Female"];
  const [val, setVal] = useState(gender[0]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  return (
    <form>
      <label className="input-label" htmlFor="birth-year">
        Birth Year
      </label>
      <input className="text" type="number" />
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
                id={item}
                value={item}
                onChange={handleChange}
                checked={item === val}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })}
      </div>
      {/* <input className="form-button" type="submit" value="START" /> */}
      <input className="form-button" type="submit" value="START" />
    </form>
  );
};
