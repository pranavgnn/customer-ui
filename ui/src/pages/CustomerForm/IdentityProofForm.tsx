import React from "react";
import { CustomerFormData, CustomerIdentityProof } from "../../types";
import { Button, Input, Select } from "../../components/ui";
import { Plus, Trash2 } from "lucide-react";

interface IdentityProofFormProps {
  formData: CustomerFormData;
  setFormData: React.Dispatch<React.SetStateAction<CustomerFormData>>;
  nextStep: () => void;
  previousStep: () => void;
}

const IdentityProofForm: React.FC<IdentityProofFormProps> = ({
  formData,
  setFormData,
  nextStep,
  previousStep,
}) => {
  const handleProofChange = (
    index: number,
    field: keyof CustomerIdentityProof,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedProofs = [...prev.identityProofs];
      updatedProofs[index] = { ...updatedProofs[index], [field]: value };
      return { ...prev, identityProofs: updatedProofs };
    });
  };

  const addProof = () => {
    setFormData((prev) => ({
      ...prev,
      identityProofs: [
        ...prev.identityProofs,
        { type: "Driver License", value: "", issuedDate: "", expiryDate: "" },
      ],
    }));
  };

  const removeProof = (index: number) => {
    if (formData.identityProofs.length <= 1) return;

    setFormData((prev) => {
      const updatedProofs = prev.identityProofs.filter((_, i) => i !== index);
      return { ...prev, identityProofs: updatedProofs };
    });
  };

  const isValid = () => {
    return formData.identityProofs.every(
      (proof) =>
        proof.type.trim() !== "" &&
        proof.value.trim() !== "" &&
        proof.issuedDate.trim() !== "" &&
        proof.expiryDate.trim() !== ""
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
        {formData.identityProofs.map((proof, index) => (
          <div
            key={index}
            className="py-4 border-b border-neutral-200 last:border-b-0"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-neutral-700">
                Identity Document {index + 1}
              </h3>
              {formData.identityProofs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProof(index)}
                  className="text-sm text-neutral-500 hover:text-red-600 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              <Select
                id={`proofType-${index}`}
                label="Type"
                options={[
                  { value: "Passport", label: "Passport" },
                  { value: "Driver License", label: "Driver License" },
                  { value: "National ID", label: "National ID" },
                  { value: "Social Security", label: "Social Security" },
                  { value: "Other", label: "Other" },
                ]}
                value={proof.type}
                onChange={(e) =>
                  handleProofChange(index, "type", e.target.value)
                }
                isRequired
                fullWidth
              />

              <Input
                id={`proofValue-${index}`}
                label="Document Number"
                value={proof.value}
                onChange={(e) =>
                  handleProofChange(index, "value", e.target.value)
                }
                isRequired
                fullWidth
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id={`issuedDate-${index}`}
                  label="Issued Date"
                  type="date"
                  value={proof.issuedDate}
                  onChange={(e) =>
                    handleProofChange(index, "issuedDate", e.target.value)
                  }
                  isRequired
                  fullWidth
                />
                <Input
                  id={`expiryDate-${index}`}
                  label="Expiry Date"
                  type="date"
                  value={proof.expiryDate}
                  onChange={(e) =>
                    handleProofChange(index, "expiryDate", e.target.value)
                  }
                  isRequired
                  fullWidth
                />
              </div>
            </div>
          </div>
        ))}

        <div>
          <button
            type="button"
            onClick={addProof}
            className="text-sm text-primary-600 hover:text-primary-800 font-medium inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add another document
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

export default IdentityProofForm;
