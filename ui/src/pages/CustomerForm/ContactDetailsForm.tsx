import React from "react";
import { CustomerContactDetails, CustomerFormData } from "../../types";
import { Button, Input, Select } from "../../components/ui";
import { Plus, Trash2 } from "lucide-react";
import countryCodes from "../../util/countryCodes";

interface ContactDetailsFormProps {
  formData: CustomerFormData;
  setFormData: React.Dispatch<React.SetStateAction<CustomerFormData>>;
  nextStep: () => void;
  previousStep: () => void;
}

// Check if contact type is phone-related
const isPhoneType = (type: string): boolean => {
  return ["Phone", "Mobile", "Work"].includes(type);
};

// Helper to determine input type and autocomplete attributes based on contact type
const getInputTypeProps = (contactType: string) => {
  switch (contactType) {
    case "Email":
      return {
        type: "email",
        autoComplete: "email",
        inputMode: "email",
        placeholder: "email@example.com",
      };
    case "Phone":
      return {
        type: "tel",
        autoComplete: "tel",
        inputMode: "tel",
        placeholder: "123-456-7890",
      };
    case "Mobile":
      return {
        type: "tel",
        autoComplete: "tel-national",
        inputMode: "tel",
        placeholder: "123-456-7890",
      };
    case "Work":
      return {
        type: "tel",
        autoComplete: "tel-work",
        inputMode: "tel",
        placeholder: "123-456-7890",
      };
    default:
      return {
        type: "text",
        autoComplete: "off",
        inputMode: "text",
        placeholder: "",
      };
  }
};

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  formData,
  setFormData,
  nextStep,
  previousStep,
}) => {
  const handleContactChange = (
    index: number,
    field: keyof CustomerContactDetails,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedContacts = [...prev.contactDetails];
      updatedContacts[index] = { ...updatedContacts[index], [field]: value };

      // Initialize dialCode when switching to a phone type if not already present
      if (
        field === "type" &&
        isPhoneType(value) &&
        !updatedContacts[index].dialCode
      ) {
        updatedContacts[index].dialCode = "+1"; // Default to US/Canada
      }

      return { ...prev, contactDetails: updatedContacts };
    });
  };

  const handleDialCodeChange = (index: number, dialCode: string) => {
    setFormData((prev) => {
      const updatedContacts = [...prev.contactDetails];
      updatedContacts[index] = { ...updatedContacts[index], dialCode };
      return { ...prev, contactDetails: updatedContacts };
    });
  };

  const addContact = () => {
    setFormData((prev) => ({
      ...prev,
      contactDetails: [
        ...prev.contactDetails,
        { type: "Phone", value: "", dialCode: "+1" },
      ],
    }));
  };

  const removeContact = (index: number) => {
    if (formData.contactDetails.length <= 1) return;

    setFormData((prev) => {
      const updatedContacts = prev.contactDetails.filter((_, i) => i !== index);
      return { ...prev, contactDetails: updatedContacts };
    });
  };

  const isValid = () => {
    return formData.contactDetails.every(
      (contact) => contact.type.trim() !== "" && contact.value.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      nextStep();
    }
  };

  // Create dialCode options from the countryCodes array
  const dialCodeOptions = countryCodes.map((country) => ({
    value: country.dial_code,
    label: `${country.code} ${country.dial_code} (${country.name})`,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {formData.contactDetails.map((contact, index) => {
          // Get input type props based on contact type
          const inputTypeProps = getInputTypeProps(contact.type);

          return (
            <div
              key={index}
              className="py-4 border-b border-neutral-200 last:border-b-0"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-neutral-700">
                  Contact {index + 1}
                </h3>
                {formData.contactDetails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContact(index)}
                    className="text-sm text-neutral-500 hover:text-red-600 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <Select
                  id={`contactType-${index}`}
                  label="Type"
                  options={[
                    { value: "Email", label: "Email" },
                    { value: "Phone", label: "Phone" },
                    { value: "Mobile", label: "Mobile" },
                    { value: "Work", label: "Work" },
                    { value: "Other", label: "Other" },
                  ]}
                  value={contact.type}
                  onChange={(e) =>
                    handleContactChange(index, "type", e.target.value)
                  }
                  isRequired
                  fullWidth
                />

                {/* Show country code dropdown only if contact type is a phone type */}
                {isPhoneType(contact.type) ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <Select
                        id={`dialCode-${index}`}
                        label="Country Code"
                        options={dialCodeOptions}
                        value={contact.dialCode || "+1"}
                        onChange={(e) =>
                          handleDialCodeChange(index, e.target.value)
                        }
                        isRequired
                        fullWidth
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        id={`contactValue-${index}`}
                        label="Phone Number"
                        value={contact.value}
                        onChange={(e) =>
                          handleContactChange(index, "value", e.target.value)
                        }
                        type={inputTypeProps.type}
                        autoComplete={inputTypeProps.autoComplete}
                        inputMode={inputTypeProps.inputMode as any}
                        placeholder={inputTypeProps.placeholder}
                        isRequired
                        fullWidth
                      />
                    </div>
                  </div>
                ) : (
                  <Input
                    id={`contactValue-${index}`}
                    label="Value"
                    value={contact.value}
                    onChange={(e) =>
                      handleContactChange(index, "value", e.target.value)
                    }
                    type={inputTypeProps.type}
                    autoComplete={inputTypeProps.autoComplete}
                    inputMode={inputTypeProps.inputMode as any}
                    placeholder={inputTypeProps.placeholder}
                    isRequired
                    fullWidth
                  />
                )}
              </div>
            </div>
          );
        })}

        <div>
          <button
            type="button"
            onClick={addContact}
            className="text-sm text-primary-600 hover:text-primary-800 font-medium inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add another contact
          </button>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-between">
        <Button variant="secondary" onClick={previousStep}>
          Back
        </Button>
        <Button variant="primary" type="submit" disabled={!isValid()}>
          Continue
        </Button>
      </div>
    </form>
  );
};

export default ContactDetailsForm;
