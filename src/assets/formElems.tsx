import React, {FC} from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

type TTextField = {
  label: string
  input: any
  meta: {
    touched: boolean
    invalid: boolean
    error: string
  }
}

export const RenderTextField: FC<TTextField> = ({
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
    // autoFocus={true}
    {...input}
    {...custom}
  />
}

export const RenderTextarea = (props: TTextField) => RenderTextField({...props, ...{multiline: true, rowsMax: 4, autoFocus: false}})
export const RenderChangeMeaningsTextarea = (props: TTextField) => RenderTextField({...props, ...{multiline: true, rowsMax: 4}})


export const RenderCheckbox: FC<TTextField> = ({input, label}) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          checked={!!input.value}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)
