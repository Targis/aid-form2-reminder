import React from 'react'
import { Formik, Form } from 'formik'
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Typography
} from '@mui/material'
import Swal from 'sweetalert2'

import { useWindowSize } from 'hooks'
import { action } from 'api'

function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = React.useState(0)
  const [completed, setCompleted] = React.useState(false)

  const currentChild = childrenArray[step]
  const isLastStep = () => step === childrenArray.length - 1
  const { width } = useWindowSize()
  const isMobile = width <= 576

  const handleSubmit = async (values, helpers) => {

    const params = {
      phoneNumber: values?.phoneNumber,
      inn: values?.inn
    }
    try {
      await fetch(action + '?' + new URLSearchParams(params), {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === 'different') {
            Swal.fire('Ой...', 'Такі дані є в базі, але номер телефону та податковий номер не співпадають!', 'warning')
          }
          if (data.result === 'notfound') {
            Swal.fire('Ой...', 'Номер телефону або податковий номер не знайдено!', 'error')
          }
          if (data.result === 'success') {
            Swal.fire({
              title: `${data.number}`,
              text: `Ваш номер в черзі`,
              icon: 'success',
              confirmButtonText: 'Дякую'
            })
          }
          if (data.result === 'error') {
            Swal.fire({
              title: 'Упс...',
              text: `Помилка на сервері: ${data.error}`,
              icon: 'error',
              confirmButtonText: 'Спробувати ще'
            })

          }
        }).finally(() => {
          helpers?.resetForm()
          setStep(0)
        })
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleReset = async (resetForm) => {
    Swal.fire({
      title: 'Ви впевнені?',
      text: "Всі поля форми будуть очищені.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Так, очистити форму',
      cancelButtonText: 'Ні'
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm()
        setStep(0)
        Swal.fire({
          icon: 'success',
          title: 'Форму очищено',
          toast: true,
          position: 'bottom-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      }
    })
  }

  const adaptiveStepper = isMobile ? (<Typography sx={{ mb: 3 }}>Крок {step + 1} / {childrenArray.length}. {currentChild?.props?.label}</Typography>) : (
    <Stepper
      alternativeLabel
      activeStep={step}
      sx={{ mb: 4 }}
    // orientation="vertical"
    >
      {childrenArray.map((child, index) => (
        <Step
          key={child.props.label}
          completed={step > index || completed}
        >
          <StepLabel>{child.props.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, resetForm }) => (

        <Form autoComplete="off">

          {currentChild}

          <div className="form-nav__container">

            {isSubmitting ? <CircularProgress size="3rem" sx={{ margin: "1em auto" }} /> : (
              <>
                <Button
                  disabled={isSubmitting}
                  color="error"
                  variant="outlined"
                  size="large"
                  onClick={() => handleReset(resetForm)}
                  sx={{ mr: 1.5, mb: 2 }}
                >
                  Очистити
                </Button>

                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  sx={{ mb: 2 }}
                >
                  Перевірити
                </Button>
              </>
            )}


          </div>

        </Form>
      )}
    </Formik>
  )
}

export default FormikStepper