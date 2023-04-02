import "./Check.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Symptons {
  ID: number;
  Name: String;
}

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export const Check = () => {
  const [symptonsData, setSymptonsData] = useState<Symptons[]>([]);
  const [checkedSymptoms, setcheckedSymptoms] = useState({
    ID: [] as number[],
  });
  const generalSymptoms = [11, 16, 9, 207, 13, 15, 29, 44, 101, 10, 50];
  const navigate = useNavigate();
  const params = useQueryParams();

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setcheckedSymptoms((prevCheckedSymptoms) => ({
          ...prevCheckedSymptoms,
          ID: [...prevCheckedSymptoms.ID, Number(value)],
        }));
      } else {
        setcheckedSymptoms((prevCheckedSymptoms) => ({
          ...prevCheckedSymptoms,
          ID: prevCheckedSymptoms.ID.filter((id) => id !== Number(value)),
        }));
      }
    } else {
      setcheckedSymptoms((prevCheckedSymptoms) => ({
        ...prevCheckedSymptoms,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    // const { search } = useLocation();
    const birthYear = params.get("birthYear");
    const gender = params.get("gender");
    const queryParams = new URLSearchParams({
      ID: checkedSymptoms.ID.join(","),
    }).toString();
    navigate(
      `/diagnosis?birthYear=${birthYear}&gender=${gender}&${queryParams}`
    );
  };

  useEffect(() => {
    const getSymptonData = async () => {
      const response = await fetch(
        "https://healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InQwYml0YWtpdG8uMDAxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTM3NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjMtMDMtMjIiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2Nzk3MTQ1OTIsIm5iZiI6MTY3OTcwNzM5Mn0.9-zm3_oCHJcbK4gDhliWhNu6ElN8E23-wUimJkdzYK8&format=json&language=en-gb"
      );
      const data = await response.json();
      setSymptonsData(data);
    };

    getSymptonData();
  }, []);

  return (
    <div id="main-container">
      <h2>Choose your symptoms below</h2>
      {/* <div className="symptoms">
        {symptonsData.map((item) => (
          <label className="symptoms-label" key={item.ID}>
            <input className="symptoms-input" type="checkbox" />
            <span className="symptoms-span">{item.Name}</span>
          </label>
        ))}
      </div> */}
      <div className="symptoms">
        {generalSymptoms.map((id) => {
          const item = symptonsData.find((item) => item.ID === id);
          if (item) {
            return (
              <label className="symptoms-label" key={item.ID}>
                <input
                  className="symptoms-input"
                  type="checkbox"
                  name="ids"
                  value={item.ID.toString()}
                  id={item.ID.toString()}
                  checked={checkedSymptoms.ID.includes(item.ID)}
                  onChange={handleInputChange}
                />
                <span className="symptoms-span">{item.Name}</span>
              </label>
            );
          }
          return null;
        })}
      </div>
      <div className="button-field">
        <button className="button" onClick={handleBack}>
          BACK
        </button>
        <button className="button" onClick={handleNext}>
          DIAGNOSE
        </button>
      </div>
    </div>
  );
};
