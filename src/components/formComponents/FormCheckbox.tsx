import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormCheckbox = ({ name, label }: { name: string; label: string }) => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center">
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value, onBlur } }) => (
          <FormControlLabel
            value="end"
            sx={{ marginRight: "5px" }}
            control={
              <div>
                <Checkbox
                  onChange={onChange}
                  checked={value}
                  id={`checkbox-${label}`}
                />
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
