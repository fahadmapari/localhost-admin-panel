import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectToFormData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  form: FormData = new FormData(),
  parentKey: string = ""
): FormData {
  if (obj === null || obj === undefined) return form;

  Object.entries(obj).forEach(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (value === undefined || value === null) {
      // Optionally: form.append(fullKey, '');
      return;
    }

    if (value instanceof File) {
      form.append(fullKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item === undefined || item === null) return;

        if (item instanceof File) {
          form.append(fullKey, item);
        } else if (item instanceof Date) {
          // Handle Date objects specifically
          form.append(fullKey, item.toISOString());
        } else if (typeof item === "object") {
          objectToFormData(item, form, fullKey);
        } else {
          form.append(fullKey, item);
        }
      });
    } else if (value instanceof Date) {
      // Handle Date objects at the top level too
      form.append(fullKey, value.toISOString());
    } else if (typeof value === "object") {
      objectToFormData(value, form, fullKey);
    } else {
      form.append(fullKey, value as string);
    }
  });

  return form;
}

export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}
