import React from "react";
import { CustomerContactDetails, CustomerFormData } from "../../types";
import { Button, Input, Select } from "../../components/ui";
import { Plus, Trash2 } from "lucide-react";

interface ContactDetailsFormProps {
  formData: CustomerFormData;
  setFormData: React.Dispatch<React.SetStateAction<CustomerFormData>>;
  nextStep: () => void;
  previousStep: () => void;
}

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
      return { ...prev, contactDetails: updatedContacts };
    });
  };

  const addContact = () => {
    setFormData((prev) => ({
      ...prev,
      contactDetails: [...prev.contactDetails, { type: "Phone", value: "" }],
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {formData.contactDetails.map((contact, index) => (
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

              <Input
                id={`contactValue-${index}`}
                label="Value"
                value={contact.value}
                onChange={(e) =>
                  handleContactChange(index, "value", e.target.value)
                }
                isRequired
                fullWidth
              />
            </div>
          </div>
        ))}

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
