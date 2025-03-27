import { CustomerFormData } from "../../types";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useState, useEffect } from "react";
import languages from "../../util/languages";

interface PersonalInfoFormProps {
  formData: CustomerFormData;
  setFormData: React.Dispatch<React.SetStateAction<CustomerFormData>>;
  nextStep: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  setFormData,
  nextStep,
}) => {
  const [languageOptions, setLanguageOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const options = Object.entries(languages).map(([_, name]) => ({
      value: name,
      label: name as string,
    }));
    setLanguageOptions(options);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "middleName" || name === "lastName") {
      setFormData((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isValid = () => {
    return (
      formData.name.firstName.trim() !== "" &&
      formData.name.lastName.trim() !== "" &&
      formData.dateOfBirth !== "" &&
      formData.gender !== "" &&
      formData.language !== ""
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="firstName"
            name="firstName"
            label="First name"
            value={formData.name.firstName}
            onChange={handleInputChange}
            placeholder="John"
            isRequired
            fullWidth
          />

          <Input
            id="lastName"
            name="lastName"
            label="Last name"
            value={formData.name.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            isRequired
            fullWidth
          />
        </div>

        <Input
          id="middleName"
          name="middleName"
          label="Middle name"
          helperText="Optional"
          value={formData.name.middleName}
          onChange={handleInputChange}
          placeholder="Robert"
          fullWidth
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Gender<span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="w-full">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Preferred Language<span className="text-red-500">*</span>
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">Select language</option>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          label="Date of birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          isRequired
          fullWidth
        />
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-200 text-right">
        <Button type="submit" disabled={!isValid()} variant="primary">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
