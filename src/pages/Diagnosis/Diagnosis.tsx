import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Diagnosis.css";

interface Result {
  Issue: {
    ID: number;
    Name: string;
    Accuracy: number;
    Icd: string;
    IcdName: string;
    ProfName: string;
    Ranking: number;
  };
  Specialisation: {
    ID: number;
    Name: string;
    SpecialistID: number;
  }[];
}

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export const Diagnosis = () => {
  const [diagnosisData, setDiagnosisData] = useState<Result[]>([]);
  const [diagnosisCount, setDiagnosisCount] = useState(0);
  const params = useQueryParams();
  useEffect(() => {
    const birthYear = params.get("birthYear");
    const gender = params.get("gender");
    const symptoms = params.get("ID");
    const getDiagnosisData = async () => {
      const response = await fetch(
        `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[${symptoms}]&gender=${gender}&year_of_birth=${birthYear}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InQwYml0YWtpdG8uMDAxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTIwMDkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjMtMDMtMjIiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY3OTcxNTAzNSwibmJmIjoxNjc5NzA3ODM1fQ.eieGSzHtD-K8xPW-hfUcO-nI9Ccj5DH_Y1y5uqI-DlY&format=json&language=en-gb`
        // `https://healthservice.priaid.ch/diagnosis?symptoms=[${symptoms}]&gender=${gender}&year_of_birth=${birthYear}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InQwYml0YWtpdG8uMDAxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTM3NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjMtMDMtMjIiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2Nzk3MDU0NDgsIm5iZiI6MTY3OTY5ODI0OH0.JXR9LnYCITtq_J35_PmMYkNrs--RL4QrJQPmLTcxZ54&format=json&language=en-gb`
      );
      const data = await response.json();
      setDiagnosisData(data);
      setDiagnosisCount(data.length);
    };

    getDiagnosisData();
  }, []);

  return (
    <div id="main-container">
      <div id="result-title">
        <h1>RESULT: {diagnosisCount} diseases</h1>
        {diagnosisCount > 0 ? (
          <p className="guess">You could have...</p>
        ) : (
          <p className="guess">No result</p>
        )}
        {diagnosisData.map((item) => {
          return (
            <div className="diagnosis" key={item.Issue.ID}>
              <h3>{item.Issue.Name}</h3>
              <p>Accuracy:{item.Issue.Accuracy}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
