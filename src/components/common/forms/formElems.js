import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/core/styles";
import {Field} from "redux-form";

export const createField = (label, name, type, component, validators, className) => {
  return (
    <div className={className ? className : null}>
      <Field label={label} name={name} type={type} component={component} validate={validators}/>
    </div>
  )
}

// -------------------for Material-UI-----------------------

// При данном варианте текстовые поля поля неконтролиремо теряют фокус
// export const renderTextField = (custom) => ({
//                                   label,
//                                   input,
//                                   meta: {touched, invalid, error},
//                                 }) => (
//   <TextField
//     fullWidth
//     label={label}
//     placeholder={label}
//     error={touched && invalid}
//     helperText={touched && error}
//     {...input}
//     {...custom}
//   />
// )

const useStyles = makeStyles({
  underline: {
    "&::before": {
      borderBottom: "1px solid #90caf9"
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #90caf9"
    },
    "&::after": {
      borderBottom: "2px solid #90caf9"
    }
  },
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #424242 inset",
      WebkitTextFillColor: '#fff',
      caretColor: '#fff'
    }
  }
})

export const RenderTextField = ({
                                  label,
                                  input,
                                  meta: {touched, invalid, error},
                                  // classes,
                                  ...custom
                                }) => {
  const classes = useStyles(); // styles for chrome autofill

  return <TextField
    fullWidth
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    InputProps={{classes: {input: classes.input, underline: classes.underline}}}
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
