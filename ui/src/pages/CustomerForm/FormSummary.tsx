import React from "react";
import { CustomerFormData } from "../../types";
import Button from "../../components/ui/Button";

interface FormSummaryProps {
  formData: CustomerFormData;
  previousStep: () => void;
  onSubmit: () => void;
  submitting: boolean;
  submitted?: boolean;
}

const FormSummary: React.FC<FormSummaryProps> = ({
  formData,
  previousStep,
  onSubmit,
  submitting,
  submitted = false,
}) => {
  // Format dates helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Determine if the button should be disabled
  const isDisabled = submitting || submitted;

  // Handle submission safely
  const handleSubmit = () => {
    if (!isDisabled) {
      onSubmit();
    }
  };

  return (
    <div>
      <p className="text-sm text-neutral-600 mb-6">
        Please review the information below before submitting.
      </p>

      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-2">
          Personal Information
        </h3>
        <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <dt className="text-neutral-500">Full Name</dt>
              <dd className="font-medium">
                {[
                  formData.name.firstName,
                  formData.name.middleName,
                  formData.name.lastName,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-500">Date of Birth</dt>
              <dd className="font-medium">
                {formatDate(formData.dateOfBirth)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-2">
          Address
        </h3>
        <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200">
          <address className="not-italic">
            <div>{formData.address.addressLine1}</div>
            {formData.address.addressLine2 && (
              <div>{formData.address.addressLine2}</div>
            )}
            <div>
              {formData.address.city}, {formData.address.state}{" "}
              {formData.address.zipCode}
            </div>
            <div>{formData.address.country}</div>
          </address>
        </div>
      </div>

      {/* Contact Details */}
      <div className="mb-6">
        <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-2">
          Contact Information
        </h3>
        <div className="bg-neutral-50 overflow-hidden rounded-md border border-neutral-200">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-neutral-500"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-neutral-500"
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {formData.contactDetails.map((contact, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-neutral-800">
                    {contact.type}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-neutral-800">
                    {["Phone", "Mobile", "Work"].includes(contact.type) &&
                    contact.dialCode
                      ? `${contact.dialCode} ${contact.value}`
                      : contact.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Identity Proofs */}
      <div className="mb-6">
        <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-2">
          Identity Documents
        </h3>
        <div className="bg-neutral-50 overflow-hidden rounded-md border border-neutral-200">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-neutral-500"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-neutral-500"
                >
                  Number
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-neutral-500"
                >
                  Issued
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-neutral-500"
                >
                  Expires
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {formData.identityProofs.map((proof, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-neutral-800">
                    {proof.type}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-neutral-800">
                    {proof.value}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-neutral-800">
                    {formatDate(proof.issuedDate)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-neutral-800">
                    {formatDate(proof.expiryDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-between">
        <Button
          variant="secondary"
          onClick={previousStep}
          disabled={isDisabled}
        >
          Back
        </Button>

        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={submitting}
          disabled={isDisabled}
        >
          {submitting ? "Submitting..." : submitted ? "Submitted" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default FormSummary;
