import { useFormik ,Field, Formik, FieldProps } from "formik"
import * as Yup from "yup"
import { Input, FormControl, FormLabel, FormErrorMessage, Divider } from "@chakra-ui/react"
import { ReactElement } from "react"

const FormikChakra = () => {

    const schema = Yup.object({
        handphone: Yup.string()
          .min(10, 'Min 10')
          .required('Required'),
      })

    return(
        <Formik
            initialValues={{
                handphone:""
            }}
            onSubmit={(values, actions) => {
                (values)
                console.log(actions)
            }}
            validationSchema={schema}
        >
        {
            ()=>(
                <Field name="handphone" >
                    {({ field, form }:FieldProps)=>(
                        <FormControl >
                            <FormLabel htmlFor='handphone'>Handphone</FormLabel>
                            <Input {...field} id='handphone' placeholder='handphone' />
                            {form.errors.handphone? <div>{form.errors.handphone}</div> : null}
                        </FormControl>
                    )}
                </Field>
            )
        }
        </Formik>
    )
}

const FormikChakraHooks = () => {

    const schema = Yup.object({
        handphone: Yup.string()
          .min(10, 'Min 10')
          .required('Required'),
      })

    const formik = useFormik({
        initialValues:{
            handphone: ""
        },
        validationSchema:schema,
        onSubmit: values => console.log(values)
    })

    console.log(formik.errors.handphone)

    return(
        <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="handphone"
                onChange={(e)=>{
                    console.log(e.target.value)
                    formik.handleChange(e)
                }}
                onBlur={formik.handleBlur}
                value={formik.values.handphone}
            />
            {formik.errors.handphone && formik.touched.handphone ? <span>{formik.errors.handphone}</span> : null}
        </form>
    )

}

FormikChakraHooks.getLayout = function getLayout(page: ReactElement) {
    return(
        <>
            <div>JANCOK KOWE</div>
            {page}
        </>
    )
}

export default FormikChakraHooks