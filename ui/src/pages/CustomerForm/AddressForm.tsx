import React from "react";
import { CustomerFormData } from "../../types";
import { Button, Select } from "../../components/ui";
import countryCodes from "../../util/countryCodes";

interface AddressFormProps {
  formData: CustomerFormData;
  setFormData: React.Dispatch<React.SetStateAction<CustomerFormData>>;
  nextStep: () => void;
  previousStep: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  setFormData,
  nextStep,
  previousStep,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const isValid = () => {
    return (
      formData.address.addressLine1.trim() !== "" &&
      formData.address.city.trim() !== "" &&
      formData.address.state.trim() !== "" &&
      formData.address.country.trim() !== "" &&
      formData.address.zipCode.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      nextStep();
    }
  };

  // Create country options from the countryCodes array
  const countryOptions = countryCodes.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-neutral-700 mb-1"
            htmlFor="addressLine1"
          >
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.address.addressLine1}
            onChange={handleInputChange}
            className="input-field"
            placeholder="123 Street Name"
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-neutral-700 mb-1"
            htmlFor="addressLine2"
          >
            Address Line 2{" "}
            <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.address.addressLine2 || ""}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Apartment, suite, unit, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-medium text-neutral-700 mb-1"
              htmlFor="city"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="input-field"
              placeholder="New York"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-neutral-700 mb-1"
              htmlFor="state"
            >
              State/Province <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.address.state}
              onChange={handleInputChange}
              className="input-field"
              placeholder="NY"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-medium text-neutral-700 mb-1"
              htmlFor="zipCode"
            >
              ZIP/Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.address.zipCode}
              onChange={handleInputChange}
              className="input-field"
              placeholder="10001"
              required
            />
          </div>
          <div>
            <Select
              id="country"
              name="country"
              label="Country"
              options={countryOptions}
              value={formData.address.country}
              onChange={handleSelectChange}
              isRequired
              fullWidth
            />
          </div>
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

export default AddressForm;
