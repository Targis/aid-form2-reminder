import FormikStep from 'components/FormikStep'
import SelectInput from 'components/inputs/SelectInput'
import TextInput from 'components/inputs/TextInput'
import StreetField from 'components/inputs/StreetField'
import { Grid } from '@mui/material'
import { streets, cities } from 'helpers/toponyms'

import * as yup from 'yup'

const addressSchema = yup.object({
  city: yup.string().required("Це поле обов'язкове"),
  street: yup.string().required("Це поле обов'язкове"),
  addrNum: yup.string().required("Це поле обов'язкове"),
})

const StepAddress = () => {
  return (
    <FormikStep
    // validationSchema={yup.object({
    //   city: yup.string().required("Це поле обов'язкове"),
    //   street: yup.string().required("Це поле обов'язкове"),
    //   addrNum: yup.string().required("Це поле обов'язкове"),
    // })}
    >
      <SelectInput
        name="city"
        label="Населений пункт"
        options={cities}
        fullWidth
      />

      <StreetField name="street" label="Вулиця" streets={streets} />

      <Grid container columnSpacing={2} columns={11}>
        <Grid item xs={12} sm={4}>
          <TextInput name="addrNum" label="Номер будинку" type="number" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextInput name="addrCorp" label="Корпус" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextInput name="addrRoom" label="Квартира" type="number" />
        </Grid>
      </Grid>
    </FormikStep>
  )
}

export {
  addressSchema,
  StepAddress
}