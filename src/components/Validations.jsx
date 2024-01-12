import * as yup from 'yup';

const validationSchema = yup.object().shape({
  productName: yup.string().required('Product name is required'),
  category: yup.array().min(1, 'Please select at least one category').required('Please select at least one category'),
availablity: yup.array().min(1, 'Please select at least one availability').required('Please select at least one availability'),

  Price: yup.number().min(0, 'Price must be greater than or equal to 0').required(),
  Tax: yup.number().min(0, 'Tax must be greater than or equal to 0'),
  productDescription: yup.string().required("Product Description is required"),
  image: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      return !value || value.size <= 1024 * 1024 * 2; // 2 MB
    })
    .test('fileType', 'Unsupported file type', (value) => {
      return !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    }).required(),
}).required()
// ...

export default validationSchema;
