import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormSelect = ({
  label,
  options,
  isRequired,
  registerName,
}: {
  label: string;
  options: string[];
  isRequired: boolean;
  registerName: string;
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const { languageMode } = useLanguageModeContext();

  return (
    <div className="flex flex-col w-auto m-4 gap-1">
      <Typography variant="subtitle1">
        {label} {isRequired && <span className="text-primary-color">*</span>}
      </Typography>
      <Controller
        control={control}
        name={registerName}
        rules={{ required: isRequired }}
        render={({ field }) => (
          <Select
            error={!!errors[registerName]}
            variant="outlined"
            color="primary"
            {...field}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
};

export default FormSelect;
