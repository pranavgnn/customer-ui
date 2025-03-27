import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { CustomerApi } from "../services/api";
import { Customer } from "../types";
import Layout from "../components/Layout";
import { Loader2, AlertCircle, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui";
import Toast from "../components/Toast";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

interface CustomerDetailProps {
  customer?: Customer;
  isPreview?: boolean;
  containerClassName?: string;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer: previewCustomer,
  isPreview = false,
  containerClassName = "",
}) => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(!previewCustomer);
  const [error] = useState<string | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (previewCustomer) {
      setCustomer(previewCustomer);
      return;
    }

    const fetchCustomer = async () => {
      try {
        setLoading(true);
        // Make sure we're using a proper number for the ID
        const customerId = parseInt(id || "0", 10);

        if (isNaN(customerId) || customerId <= 0) {
          // Redirect to 404 page for invalid ID format
          navigate("/404", { replace: true });
          return;
        }

        const data = await CustomerApi.getById(customerId);

        if (!data) {
          // Redirect to 404 if customer not found
          navigate("/404", { replace: true });
          return;
        }

        setCustomer(data);
      } catch (err) {
        console.error("Error fetching customer:", err);
        // Redirect to 404 for any API errors related to finding the customer
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id, previewCustomer, navigate]);

  const handleDeleteCustomer = async () => {
    if (!customer || !id) return;

    try {
      setDeletingCustomer(true);
      await CustomerApi.delete(parseInt(id, 10));
      setToast({
        message: "Customer deleted successfully",
        type: "success",
      });

      // Wait a moment before navigating so the user can see the success message
      setTimeout(() => {
        navigate("/customers");
      }, 1500);
    } catch (error) {
      setDeletingCustomer(false);
      setShowDeleteConfirm(false);
      setToast({
        message: "Failed to delete customer. Please try again.",
        type: "error",
      });
    }
  };

  // Helper function to safely format date strings
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Create safe customer object with defaults for all potentially null fields
  const safeCustomer = customer
    ? {
        id: customer.id || 0,
        name: {
          firstName: customer.name?.firstName || "Unknown",
          middleName: customer.name?.middleName || "",
          lastName: customer.name?.lastName || "",
        },
        dateOfBirth: customer.dateOfBirth || "",
        gender: customer.gender || "Not specified",
        language: customer.language || "",
        address: {
          addressLine1: customer.address?.addressLine1 || "No address provided",
          addressLine2: customer.address?.addressLine2 || "",
          city: customer.address?.city || "Unknown",
          state: customer.address?.state || "Unknown",
          country: customer.address?.country || "Unknown",
          zipCode: customer.address?.zipCode || "Unknown",
        },
        contactDetails: customer.contactDetails?.length
          ? customer.contactDetails
          : [{ type: "Email", value: "No contact information provided" }],
        identityProofs: customer.identityProofs?.length
          ? customer.identityProofs
          : [],
      }
    : null;

  const fullName = safeCustomer
    ? [
        safeCustomer.name.firstName,
        safeCustomer.name.middleName,
        safeCustomer.name.lastName,
      ]
        .filter(Boolean)
        .join(" ")
    : "Unknown";

  // Only render content if we have a valid customer
  if (!safeCustomer) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-md">
            <div className="flex items-center mb-3">
              <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-lg font-medium">Error</h3>
            </div>
            <p>Customer data is unavailable</p>
            <Link
              to="/customers"
              className="mt-4 inline-flex items-center px-4 py-2 bg-white border border-red-300 text-red-700 rounded transition-colors hover:bg-red-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Customers
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const CustomerDetailsContent = () => (
    <div className={`card ${containerClassName}`}>
      {/* Customer header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-bold">
              {safeCustomer.name.firstName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-neutral-900">
                {fullName || "Unknown"}
              </h1>
              <p className="text-neutral-500">Customer #{safeCustomer.id}</p>
            </div>
          </div>

          {!isPreview && (
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex items-center gap-1.5"
                onClick={() => navigate(`/customers/edit/${safeCustomer.id}`)}
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Button>
              <Button
                variant="danger"
                className="flex items-center gap-1.5"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Customer details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Personal & Address */}
          <div className="space-y-6 md:col-span-1">
            {/* Personal Information */}
            <section className="animate-fadeIn">
              <h2 className="text-sm uppercase tracking-wider text-neutral-500 font-medium mb-3">
                Personal Information
              </h2>
              <div className="bg-neutral-50 p-4 rounded-md border border-neutral-100">
                <div className="mb-3">
                  <p className="text-xs text-neutral-500">Full Name</p>
                  <p className="font-medium text-neutral-800">{fullName}</p>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-neutral-500">Gender</p>
                  <p className="font-medium text-neutral-800">
                    {safeCustomer.gender.charAt(0).toUpperCase() +
                      safeCustomer.gender.slice(1)}
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-neutral-500">Preferred Language</p>
                  <p className="font-medium text-neutral-800">
                    {safeCustomer.language}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Date of Birth</p>
                  <p className="font-medium text-neutral-800">
                    {formatDate(safeCustomer.dateOfBirth)}
                  </p>
                </div>
              </div>
            </section>

            {/* Address */}
            <section
              className="animate-fadeIn"
              style={{ animationDelay: "0.1s" } as React.CSSProperties}
            >
              <h2 className="text-sm uppercase tracking-wider text-neutral-500 font-medium mb-3">
                Address
              </h2>
              <div className="bg-neutral-50 p-4 rounded-md border border-neutral-100">
                <p className="mb-1">{safeCustomer.address.addressLine1}</p>
                {safeCustomer.address.addressLine2 && (
                  <p className="mb-1">{safeCustomer.address.addressLine2}</p>
                )}
                <p className="mb-1">
                  {safeCustomer.address.city}, {safeCustomer.address.state}{" "}
                  {safeCustomer.address.zipCode}
                </p>
                <p>{safeCustomer.address.country}</p>
              </div>
            </section>
          </div>

          {/* Column 2-3: Contact Info & Identity Proofs */}
          <div className="space-y-6 md:col-span-2">
            {/* Contact Information */}
            <section
              className="animate-fadeIn"
              style={{ animationDelay: "0.2s" } as React.CSSProperties}
            >
              <h2 className="text-sm uppercase tracking-wider text-neutral-500 font-medium mb-3">
                Contact Information
              </h2>
              {safeCustomer.contactDetails.length === 0 ? (
                <div className="bg-neutral-50 p-4 rounded-md border border-neutral-100">
                  <p className="text-neutral-500">
                    No contact information available
                  </p>
                </div>
              ) : (
                <div className="bg-neutral-50 rounded-md border border-neutral-100">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Contact Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-100">
                      {safeCustomer.contactDetails.map((contact, index) => (
                        <tr key={index} className="hover:bg-neutral-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900">
                            {contact.type || "Other"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                            {contact.value || "No value provided"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Identity Proofs */}
            <section
              className="animate-fadeIn"
              style={{ animationDelay: "0.3s" } as React.CSSProperties}
            >
              <h2 className="text-sm uppercase tracking-wider text-neutral-500 font-medium mb-3">
                Identity Proofs
              </h2>
              {safeCustomer.identityProofs.length === 0 ? (
                <div className="bg-neutral-50 p-4 rounded-md border border-neutral-100">
                  <p className="text-neutral-500">
                    No identity proofs available
                  </p>
                </div>
              ) : (
                <div className="bg-neutral-50 rounded-md border border-neutral-100">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Document Number
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Issued Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Expiry Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-100">
                      {safeCustomer.identityProofs.map((proof, index) => (
                        <tr key={index} className="hover:bg-neutral-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900">
                            {proof.type || "Other"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                            {proof.value || "No value provided"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                            {formatDate(proof.issuedDate)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                            {formatDate(proof.expiryDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );

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

  if (error || !customer) {
    return (
      <Layout>
        <div className="mb-6">
          <Link
            to="/customers"
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Customers
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-md mx-auto">
          <div className="flex items-center mb-3">
            <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-lg font-medium">Error</h3>
          </div>
          <p>{error || "Customer not found"}</p>
          <Link
            to="/customers"
            className="mt-4 inline-flex items-center px-4 py-2 bg-white border border-red-300 text-red-700 rounded transition-colors hover:bg-red-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Customers
          </Link>
        </div>
      </Layout>
    );
  }

  if (isPreview) {
    return <CustomerDetailsContent />;
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

      <DeleteConfirmationModal
        title="Delete Customer"
        message={`Are you sure you want to delete ${fullName}? This action cannot be undone.`}
        isOpen={showDeleteConfirm}
        isDeleting={deletingCustomer}
        onConfirm={handleDeleteCustomer}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">
            Customer Details
          </h1>
        </div>

        <CustomerDetailsContent />
      </div>
    </Layout>
  );
};

export default CustomerDetail;
