import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import validationSchema from '../Validations';
const useFormFields = (initialState, onFormDataChange) => {
  const [fields, setFields] = useState(initialState);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const fieldValue = type === 'file' ? event.target.files[0] : value;
    

    setFields((prevFields) => ({
      ...prevFields,
      [name]: fieldValue,
    }));
    

    // Call the onFormDataChange prop with the updated form data
    if (onFormDataChange) {
      onFormDataChange({
        ...fields, // This will ensure the previous values are retained.
        [name]: fieldValue,
      });
    }
    
  };

  return { fields, register, handleSubmit, errors, handleChange };
};

export default useFormFields;
