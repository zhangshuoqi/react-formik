import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./App.css";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 1 without formik
// const App = () => {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')

//   const handleChangeName = e => {
//     setName(e.target.value)
//   }

//   const handleChangeEmail = e => {
//     setEmail(e.target.value)
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     await sleep(500)
//     alert(JSON.stringify({ name, email }, null, 'fox'))
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="">Name:</label>
//       <input type="text" value={name} onChange={handleChangeName}/>
//       <label htmlFor="">Email:</label>
//       <input type="text" value={email} onChange={handleChangeEmail}/>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// 2 with own formik
//   const useFormik = props => {
//     console.log(props);
//     const [values, setValues] = useState(props.initialValues || {})
//     const handleChange = name => event => {
//       event.persist()
//       setValues(prev => ({ ...prev, [name]: event.target.value }))
//     }
//     const handleSubmit = async e => {
//       e.preventDefault()
//       props.onSubmit(values)
//     }
//     return { values, handleChange, handleSubmit}
//   }

//   const App = () => {
//   const { values, handleChange, handleSubmit } = useFormik({
//     initialValues: { name:'', email:'' },
//     onSubmit: async values => {
//       await sleep(500)
//       alert(JSON.stringify(values, null, 2))
//     }
//   })
//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="">Name:</label>
//       <input type="text" value={values.name} onChange={handleChange('name')}/>
//       <label htmlFor="">Email:</label>
//       <input type="text" value={values.email} onChange={handleChange('email')}/>
//       <button type="submit">Submit</button>
//       <pre>{JSON.stringify(values, null, 2)}</pre>
//     </form>
//   );
// }

// 3 with Formik
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Must have a character")
    .max(255, "Must be shorter than 255")
    .required("Must enter a name"),
  email: Yup.string()
    .email("Must be a valid email address")
    .max(255, "Must be shorter than 255")
    .required("Must enter an email"),
});
const App = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          resetForm()
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && errors.email ? "input-error" : null}
            />
            {errors.name && touched.name && (
              <div style={{ color: "red" }}>{errors.name}</div>
            )}
          </div>

          <label htmlFor="email">Email</label>
          <div>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? "input-error" : null}
            />
            {errors.email && touched.email && (
              <div style={{ color: "red" }}>{errors.email}</div>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(touched, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <pre>{JSON.stringify(isSubmitting, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default App;
