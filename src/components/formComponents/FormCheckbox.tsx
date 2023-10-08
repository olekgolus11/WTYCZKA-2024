import { maxCheckboxContentLength } from "@/constants/maxValues";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormCheckbox = ({
  name,
  label,
  onClick,
}: {
  name: string;
  label: string;
  onClick?: (e: any) => void;
}) => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center py-1" onClick={onClick}>
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
            label={
              label.length > maxCheckboxContentLength
                ? label.slice(0, maxCheckboxContentLength) + "..."
                : label
            }
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
