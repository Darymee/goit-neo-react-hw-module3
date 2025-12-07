import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const yupField = label =>
  Yup.string()
    .trim()
    .min(3, 'Мінімум 3 символи')
    .max(50, 'Максимум 50 символів')
    .required(`Поле ${label} обовʼязкове`);

const validationSchema = Yup.object({
  name: yupField('Name').matches(
    /[A-Za-zА-Яа-яЁёІіЇїЄє]/,
    'Імʼя має містити хоча б одну букву'
  ),
  number: yupField('Number').matches(
    /^\d{3}-\d{2}-\d{2}$/,
    'Формат номера має бути 123-45-67'
  ),
});

const ContactForm = ({ addContact }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        addContact(values);
        resetForm();
      }}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form noValidate className={styles.form}>
          <h2 className={styles.title}>Add new contact</h2>

          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <Field
              id="name"
              name="name"
              placeholder="Enter name"
              aria-invalid={touched.name && !!errors.name}
              className={`${styles.input} ${
                touched.name && errors.name ? styles.invalid : ''
              }`}
            />
            <ErrorMessage name="name">
              {message => <div className={styles.error}>{message}</div>}
            </ErrorMessage>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="number" className={styles.label}>
              Number
            </label>
            <Field
              id="number"
              name="number"
              type="text"
              placeholder="123-45-67"
              aria-invalid={touched.number && !!errors.number}
              className={`${styles.input} ${
                touched.number && errors.number ? styles.invalid : ''
              }`}
            />
            <ErrorMessage name="number">
              {message => <div className={styles.error}>{message}</div>}
            </ErrorMessage>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.button}
            >
              Add contact
            </button>
            <span className={styles.hint}>Format: 123-45-67</span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
