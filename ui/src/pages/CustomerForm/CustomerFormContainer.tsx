import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Customer, CustomerFormData } from "../../types";
import Layout from "../../components/Layout";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressForm from "./AddressForm";
import ContactDetailsForm from "./ContactDetailsForm";
import IdentityProofForm from "./IdentityProofForm";
import FormSummary from "./FormSummary";
import { CustomerApi } from "../../services/api";
import Toast from "../../components/Toast";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import { Step } from "../../components/ui/ProgressIndicator";
import { Loader2 } from "lucide-react";

const CustomerFormContainer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<CustomerFormData>({
    currentStep: 1,
    name: { firstName: "", middleName: "", lastName: "" },
    gender: "",
    language: "",
    dateOfBirth: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    contactDetails: [{ type: "Email", value: "" }],
    identityProofs: [
      { type: "Passport", value: "", issuedDate: "", expiryDate: "" },
    ],
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  // Fetch customer data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchCustomer = async () => {
        try {
          setLoading(true);
          const customerId = parseInt(id, 10);

          if (isNaN(customerId) || customerId <= 0) {
            navigate("/404", { replace: true });
            return;
          }

          const customerData = await CustomerApi.getById(customerId);

          if (!customerData) {
            navigate("/404", { replace: true });
            return;
          }

          setFormData((prev) => ({
            ...prev,
            name: customerData.name,
            gender: customerData.gender,
            language: customerData.language,
            dateOfBirth: customerData.dateOfBirth,
            address: customerData.address,
            contactDetails: customerData.contactDetails,
            identityProofs: customerData.identityProofs,
          }));
        } catch (error) {
          // Redirect to 404 for any API errors related to finding the customer
          navigate("/404", { replace: true });
        } finally {
          setLoading(false);
        }
      };

      fetchCustomer();
    }
  }, [isEditMode, id, navigate]);

  const nextStep = () => {
    setFormData((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    window.scrollTo(0, 0);
  };

  const previousStep = () => {
    setFormData((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (submitting || submitted) return;

    try {
      setSubmitting(true);

      const { currentStep, ...customerData } = formData;
      const newCustomer: Omit<Customer, "id"> = customerData;

      let response: Customer;

      if (isEditMode && id) {
        // Update existing customer
        response = await CustomerApi.update(parseInt(id, 10), newCustomer);
        setToast({
          message: "Customer updated successfully!",
          type: "success",
        });
      } else {
        // Create new customer
        response = await CustomerApi.create(newCustomer);
        setToast({
          message: "Customer created successfully!",
          type: "success",
        });
      }

      setSubmitted(true);

      setTimeout(() => {
        navigate(`/customers/${response.id}`);
      }, 2000);
    } catch (error) {
      setSubmitting(false);

      setToast({
        message: isEditMode
          ? "Failed to update customer. Please try again."
          : "Failed to create customer. Please try again.",
        type: "error",
      });
    }
  };

  // Define our steps for the progress indicator
  const steps: Step[] = [
    {
      name: "Personal",
      status:
        formData.currentStep > 1
          ? "complete"
          : formData.currentStep === 1
          ? "current"
          : "upcoming",
    },
    {
      name: "Address",
      status:
        formData.currentStep > 2
          ? "complete"
          : formData.currentStep === 2
          ? "current"
          : "upcoming",
    },
    {
      name: "Contact",
      status:
        formData.currentStep > 3
          ? "complete"
          : formData.currentStep === 3
          ? "current"
          : "upcoming",
    },
    {
      name: "Identity",
      status:
        formData.currentStep > 4
          ? "complete"
          : formData.currentStep === 4
          ? "current"
          : "upcoming",
    },
    {
      name: "Review",
      status: formData.currentStep === 5 ? "current" : "upcoming",
    },
  ];

  const renderStep = () => {
    switch (formData.currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );
      case 3:
        return (
          <ContactDetailsForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );
      case 4:
        return (
          <IdentityProofForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );
      case 5:
        return (
          <FormSummary
            formData={formData}
            previousStep={previousStep}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="relative">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">
            {isEditMode ? "Edit Customer" : "New Customer"}
          </h1>
        </div>

        {/* Modern progress indicator */}
        <div className="mb-8">
          <ProgressIndicator steps={steps} />
        </div>

        {/* Form content */}
        <div className="bg-white border border-neutral-200 rounded-md p-6 shadow-sm">
          {renderStep()}
        </div>
      </div>
    </Layout>
  );
};

export default CustomerFormContainer;
