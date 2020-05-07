import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export const RenderTextField = ({
                                  label,
                                  input,
                                  meta: {touched, invalid, error},
                                  ...custom
                                }) => {
  return <TextField
    fullWidth
    variant="filled"
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
}

export const RenderTextarea = (props) => RenderTextField({...props, ...{multiline: true}})

export const RenderCheckbox = ({input, label}) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)
