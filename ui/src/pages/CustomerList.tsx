import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CustomerApi } from "../services/api";
import { Customer } from "../types";
import Layout from "../components/Layout";
import { Table, Card, Button } from "../components/ui";
import Pagination from "../components/ui/Pagination";
import {
  Loader2,
  AlertCircle,
  Plus,
  ChevronRight,
  Users,
  RefreshCw,
} from "lucide-react";

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [size] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const paginatedData = await CustomerApi.getPaginated(page, size);
        setCustomers(paginatedData.content);
        setTotalPages(paginatedData.totalPages);
        setTotalElements(paginatedData.totalElements);
      } catch (err) {
        setError("Failed to load customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [page, size]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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

  if (error) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
              Oops! Something went wrong
            </h1>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              We couldn't load the customer list. This might be due to a network
              issue or server problem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                leftIcon={<RefreshCw className="w-4 h-4" />}
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
              <Link to="/">
                <Button variant="secondary">Return to Homepage</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const columns = [
    {
      header: "Name",
      accessor: (customer: Customer) => {
        const firstName = customer.name?.firstName || "Unknown";
        const lastName = customer.name?.lastName || "";
        const displayName = [firstName, lastName].filter(Boolean).join(" ");

        return (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-md font-medium">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-neutral-900">
                {displayName}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "ID",
      accessor: (customer: Customer) => customer.id,
      className: "text-center",
    },
    {
      header: "Country",
      accessor: (customer: Customer) => customer.address?.country || "N/A",
    },
    {
      header: "",
      accessor: (customer: Customer) => (
        <Link
          to={`/customers/${customer.id}`}
          className="text-primary-600 hover:text-primary-800 flex items-center justify-end"
        >
          <span className="mr-1">Details</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ),
      className: "text-right",
    },
  ];

  const emptyState = (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
            <Users className="h-10 w-10 text-neutral-400" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
          No customers yet
        </h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          Get started by creating your first customer record. It only takes a
          minute.
        </p>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate("/customers/create")}
        >
          Create First Customer
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Customers</h1>

        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate("/customers/create")}
        >
          New Customer
        </Button>
      </div>

      <Card variant="bordered" className="animate-fadeIn">
        <Table
          columns={columns}
          data={customers}
          keyExtractor={(customer) => customer.id}
          onRowClick={(customer) => navigate(`/customers/${customer.id}`)}
          emptyState={emptyState}
        />

        {!loading && customers.length > 0 && (
          <div className="border-t border-neutral-100 p-4">
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left text-sm text-neutral-500">
                Showing{" "}
                <span className="font-medium text-neutral-700">
                  {customers.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-neutral-700">
                  {totalElements}
                </span>{" "}
                customers
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}// 
              />
            </div>
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default CustomerList;
