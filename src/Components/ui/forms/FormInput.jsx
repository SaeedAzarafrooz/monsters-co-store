import { forwardRef } from "react";
import { Input } from "./Input";
import { FormField } from "./FormField";

const FormInput = forwardRef(
  ({ label, id, error, hint, colSpan, containerClassName, className, ...props }, ref) => {
    return (
      <FormField
        label={label}
        id={id}
        error={error}
        hint={hint}
        colSpan={colSpan}
        className={containerClassName}
      >
        <Input id={id} ref={ref} error={error} className={className} {...props} />
      </FormField>
    );
  }
);

FormInput.displayName = "FormInput";
export {FormInput};
export default FormInput;
