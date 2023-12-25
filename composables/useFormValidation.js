export default function useFormValidation(rules) {
  const form = useForm();
  const fields = ref({});

  for (const [name, rule] of Object.entries(rules)) {
    fields.value[name] = useField(name, rule);
  }

  const validate = async () => {
    const result = await form.validate();
    return result.valid;
  };

  return { fields, validate };
}
