import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormCheckbox = ({ name, label }: { name: string; label: string }) => {
  const { languageMode } = useLanguageModeContext();
  const { control } = useFormContext();

  return (
    <div className="flex items-center">
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControlLabel
            value="end"
            sx={{ marginRight: "5px" }}
            control={
              <div>
                <Checkbox {...field} />
              </div>
            }
            label={label}
            labelPlacement="end"
          />
        )}
      />
      <Typography variant="subtitle1" className="text-primary-color">
        *
      </Typography>
    </div>
  );
};

export default FormCheckbox;
