import { useState } from "react";

export function useForm<T extends Record<string, any>>(initialValue: T) {
  const [formData, setFormData] = useState<T>(initialValue);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setField = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { formData, handleChange, setField };
}
