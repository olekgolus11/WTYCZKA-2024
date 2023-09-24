"use client";
import Typography from "@mui/material/Typography";
import FormSelect from "../formComponents/FormSelect";
import FormField from "../formComponents/FormField";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { DegreeOptions, FacultyOptions, SessionOptions } from "./selectOptions";

const StudentDetailsSection = () => {
  const { languageMode } = useLanguageModeContext();

  return (
    <>
      <Typography
        variant="h6"
        className="text-primary-color "
        sx={{ margin: "1rem" }}
      >
        {languageMode == "english" ? "Student details" : "Dane studenta"}
      </Typography>
      <div className="flex flex-col md:grid md:grid-cols-3">
        <FormSelect
          label={languageMode == "english" ? "Faculty" : "Wydział"}
          registerName="faculty"
          isRequired={true}
          options={
            languageMode == "english" ? FacultyOptions.EN : FacultyOptions.PL
          }
        />
        <FormField
          label={languageMode == "english" ? "Index number" : "Numer indeksu"}
          registerName="indexNumber"
          isRequired={true}
          minLength={6}
          maxLength={6}
        />
        <FormSelect
          label={languageMode == "english" ? "Degree" : "Stopień studiów"}
          registerName="degree"
          isRequired={true}
          options={
            languageMode == "english" ? DegreeOptions.EN : DegreeOptions.PL
          }
        />
        <FormSelect
          label={languageMode == "english" ? "Session" : "Semestr"}
          registerName="session"
          isRequired={true}
          options={SessionOptions.PL}
        />
      </div>
    </>
  );
};

export default StudentDetailsSection;
