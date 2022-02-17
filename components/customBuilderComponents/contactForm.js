import {Formik} from "formik";
import {Card, CardContent, Grid, TextField } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import {builder, Builder} from "@builder.io/react";
import SendIcon from '@mui/icons-material/Send';

builder.init(process.env.BUILDER_API_KEY)

function ContactForm(props) {
  return (
    <Formik
      initialValues={{ name: '', email: '', confirmEmail: '', message: ''}}
      validate={values => {
        const errors = {};
        if (!values.name) errors.name = 'Name is required';
        if (!values.email) errors.email = 'Email is required';
        if (values.email != values.confirmEmail || !values.confirmEmail) errors.confirmEmail = "Emails must match";
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))  errors.email = 'Invalid email address';
        if (!values.message) errors.message = "Message is required"

        return errors;
      }}
      onSubmit={ async (values, { setSubmitting, resetForm }) => {
        try {
          const resp = await fetch('/api/send-email', {
            method: "POST",
            body: JSON.stringify({
              "from": "contactform@beelineparks.com",
              "to": "admin@beelineparks.com",
              "replyTo": values.email,
              "subject": `Contact Form - ${values.name}`,
              "html": `
                <p>From Name: ${values.name}</p>
                <p>From Email: ${values.email}</p>
                <br/>
                ${values.message}
              `
            })
          });
          const respJson = await resp.json()

          if (resp.status > 200) {
            console.error('bad response', respJson)
            throw new Error("Bad Response");
          }

          resetForm();
          setSubmitting(false);
          alert('Successfully sent message!');
        } catch (err) {
          console.error(err);
          alert('Failed to send message. Please try again.')
        }
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
          /* and other goodies */
        }) => (
        <form onSubmit={handleSubmit}>

          <Card>
            <CardContent>

              <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Name"
                        variant="outlined"
                        type="text"
                        name="name"
                        value={values.name}
                        error={errors.name && touched.name}
                        helperText={errors.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={values.email}
                        error={errors.email && touched.email}
                        helperText={errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm Email"
                        variant="outlined"
                        type="email"
                        name="confirmEmail"
                        value={values.confirmEmail}
                        error={errors.confirmEmail && touched.confirmEmail}
                        helperText={errors.confirmEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Message"
                    variant="outlined"
                    type="text"
                    name="message"
                    value={values.message}
                    error={errors.message && touched.message}
                    helperText={errors.message}
                    multiline
                    rows={8}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />

                </Grid>

                <Grid item xs={12} sx={{textAlign: 'right'}}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loadingPosition="start"
                    startIcon={<SendIcon />}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    Send Message
                  </LoadingButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
}


Builder.registerComponent(ContactForm, {
  name: "ContactForm",
});

export default ContactForm;