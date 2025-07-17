import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToFormData = (values, options = {}) => {
  const { arrayFormat = "brackets", skipEmpty = false } = options;
  const formData = new FormData();

  const appendValue = (key, value) => {
    // Skip empty values if option is set
    if (skipEmpty && (value === "" || value === null || value === undefined)) {
      return;
    }

    // Handle File objects
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    // Handle FileList objects
    if (value instanceof FileList) {
      Array.from(value).forEach((file, index) => {
        const fileKey = arrayFormat === "brackets" ? `${key}[${index}]` : key;
        formData.append(fileKey, file);
      });
      return;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = arrayFormat === "brackets" ? `${key}[${index}]` : key;
        appendValue(arrayKey, item);
      });
      return;
    }

    // Handle nested objects
    if (
      value !== null &&
      typeof value === "object" &&
      !(value instanceof Date)
    ) {
      Object.keys(value).forEach((nestedKey) => {
        const nestedKeyName = `${key}[${nestedKey}]`;
        appendValue(nestedKeyName, value[nestedKey]);
      });
      return;
    }

    // Handle primitive values
    formData.append(key, value);
  };

  // Process all form values
  Object.keys(values).forEach((key) => {
    appendValue(key, values[key]);
  });

  return formData;
};
