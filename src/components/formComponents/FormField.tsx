"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { set, useFormContext } from "react-hook-form";
import { differenceInYears } from 'date-fns';

const FormField = ({
  label,
  isRequired,
  fieldType,
  minLength,
  maxLength,
  registerName,
  multiline,
}: {
  label: string;
  isRequired: boolean;
  fieldType?: "numeric" | "postal-code" | "mail" | "date";
  minLength: number;
  maxLength: number;
  registerName: string;
  multiline?: boolean;
}) => {
  const { register, formState } = useFormContext();
  const [pattern, setPattern] = useState(/.*/g);
  const { errors } = formState;
  const { languageMode } = useLanguageModeContext();
  const [parsedFieldType, setParsedFieldType] = useState<string>("text");

  const isAtLeast18YearsOld = (value: string) => {
    const today = new Date();
    const birthDate = new Date(value);
    return differenceInYears(today, birthDate) >= 18 || (languageMode == "english" ? "You must be at least 18 years old" : "Musisz mieć co najmniej 18 lat");
  };

  useEffect(() => {
    if (fieldType == "mail") {
      setPattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      setParsedFieldType("email");
    } else if (fieldType == "numeric") {
      setPattern(/^[0-9,]*$/g);
      setParsedFieldType("text");
    } else if (fieldType == "postal-code") {
      setPattern(/^[0-9]{2}-[0-9]{3}$/g);
      setParsedFieldType("text");
    } else if (fieldType == "date") {
      setParsedFieldType("date");
    }
    else {
      setPattern(/.*/g);
    }
  }, [fieldType]);

  return (
    <div className="flex flex-col w-auto m-4 gap-1">
      <Typography variant="subtitle1">
        {label} {isRequired && <span className="text-primary-color">*</span>}
      </Typography>
      <TextField
        type={parsedFieldType}
        helperText={errors[registerName]?.message?.toString()}
        error={!!errors[registerName]}
        id={`outlined-basic-${label}`}
        variant="outlined"
        fullWidth
        multiline={multiline}
        rows={multiline ? 8 : 1}
        {...register(registerName, {
          required: isRequired,
          minLength: {
            value: minLength,
            message:
              languageMode == "english"
                ? `min ${minLength} letters`
                : `min. ${minLength} znaki`,
          },
          maxLength: {
            value: maxLength,
            message:
              languageMode == "english"
                ? `max ${maxLength} letters`
                : `maks. ${maxLength} znaków`,
          },
          pattern: {
            value: pattern,
            message:
              languageMode == "english"
                ? "invalid format"
                : "niepoprawny format",
          },
          validate: fieldType === "date" ? isAtLeast18YearsOld : undefined,
        })}
      />
    </div>
  );
};

export default FormField;



