import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useField } from 'formik'

export default function AutocompleteField({ ...props }) {
  const { name, label, options } = props
  const [field, meta, helpers] = useField(name)
  return (
    <Autocomplete
      {...field}
      {...props}
      isOptionEqualToValue={(option, value) => option?.label === value}
      disablePortal
      onChange={(_, value) => helpers.setValue(value?.label || '')}
      id={'combo-box-' + name}
      options={options}
      renderInput={(props) => (
        <TextField
          {...props}
          name={name}
          label={label}
          helperText={(meta.touched && meta.error) || ' '}
          error={meta.touched && Boolean(meta.error)}
        />
      )}
      sx={{ mb: 2 }}
      // fullWidth
    />
  )
}
