import { CustomerFormData } from "../../types";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      formData.dateOfBirth !== ""
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
