import { ref } from 'vue';

export default function useProductValidation() {
  const errors = ref({});

  const validateProductForm = (form) => {
    errors.value = {};

    if (!form.name) {
      errors.value.name = 'Product name is required.';
    }
    if (!form.description) {
      errors.value.description = 'Description is required.';
    } else if (form.description.length > 255) {
      errors.value.description = 'Description cannot exceed 255 characters.';
    }
    if (form.price <= 0) {
      errors.value.price = 'Price must be greater than 0.';
    }
    if (form.stock < 0) {
      errors.value.stock = 'Stock must be 0 or greater.';
    }
    if (!form.category) {
      errors.value.category = 'Category is required.';
    }


    return Object.keys(errors.value).length === 0;
  };

  return {
    errors,
    validateProductForm,
  };
}
