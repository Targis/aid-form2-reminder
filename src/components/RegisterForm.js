import React, {useCallback, useEffect, useState} from 'react'
import { Typography} from '@mui/material'
import FormikStepper from './FormikStepper'
import {StepCheck ,checkSchema} from './steps/StepCheck'

// async function stall(stallTime = 3000) {
//   await new Promise(resolve => setTimeout(resolve, stallTime));
// }

const initialValues = {
  inn: '',
  phoneNumber: '',
}

const RegisterForm = () => {

  return (
    <div style={{ marginBottom: '2em' }}>

      <Typography color="inherit" variant="h6" component="div" sx={{ mb: 1 }}>
        Пошук в базі
      </Typography>
      <Typography color="inherit" variant="caption" component="div" sx={{ mb: 3 }}>
        Ця форма допоможе знайти ваш номер в базі громади, якщо ви реєструвались.
      </Typography>

      <FormikStepper
        initialValues={initialValues}
        // validateOnChange={false}
        // validateOnBlur={false}
        onSubmit={async (values) => {
          console.log(values)
        }}
      >
          <StepCheck label="Перевірка" validationSchema={checkSchema} isDisabled={(values) => values.checked} />
      </FormikStepper>
      
    </div>
  )
}

export default RegisterForm