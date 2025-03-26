import React from "react";

// Sample customer data for the background table
const dummyCustomers = [
  {
    id: "CT-2367",
    name: "John Smith",
    email: "john@example.com",
    balance: "₹238,400",
    status: "Active",
  },
  {
    id: "CT-1589",
    name: "Emma Johnson",
    email: "emma@example.com",
    balance: "₹129,750",
    status: "Active",
  },
  {
    id: "CT-9078",
    name: "Michael Brown",
    email: "michael@example.com",
    balance: "₹50,800",
    status: "Inactive",
  },
  {
    id: "CT-4523",
    name: "Sofia Rodriguez",
    email: "sofia@example.com",
    balance: "₹347,200",
    status: "Active",
  },
  {
    id: "CT-7812",
    name: "Wei Chen",
    email: "wei@example.com",
    balance: "₹89,600",
    status: "Active",
  },
  {
    id: "CT-3341",
    name: "Priya Patel",
    email: "priya@example.com",
    balance: "₹476,900",
    status: "Active",
  },
  {
    id: "CT-5528",
    name: "David Wilson",
    email: "david@example.com",
    balance: "₹12,350",
    status: "Inactive",
  },
  {
    id: "CT-6694",
    name: "Fatima Hassan",
    email: "fatima@example.com",
    balance: "₹290,450",
    status: "Active",
  },
  {
    id: "CT-2277",
    name: "Alex Mercer",
    email: "alex@example.com",
    balance: "₹156,200",
    status: "Active",
  },
  {
    id: "CT-4109",
    name: "Zara Khan",
    email: "zara@example.com",
    balance: "₹208,750",
    status: "Inactive",
  },
  {
    id: "CT-8817",
    name: "Raj Sharma",
    email: "raj@example.com",
    balance: "₹892,100",
    status: "Active",
  },
  {
    id: "CT-5282",
    name: "Lisa Wong",
    email: "lisa@example.com",
    balance: "₹321,850",
    status: "Active",
  },
  {
    id: "CT-1177",
    name: "Trevor Noah",
    email: "trevor@example.com",
    balance: "₹78,350",
    status: "Inactive",
  },
  {
    id: "CT-3295",
    name: "Maria Garcia",
    email: "maria@example.com",
    balance: "₹544,900",
    status: "Active",
  },
  {
    id: "CT-9936",
    name: "Kevin Hart",
    email: "kevin@example.com",
    balance: "₹102,750",
    status: "Active",
  },
];

interface SkewedTableBackgroundProps {
  className?: string;
}

const SkewedTableBackground: React.FC<SkewedTableBackgroundProps> = ({
  className = "",
}) => {
  return (
    <div className={`skewed-table-container ${className}`}>
      <div className="skewed-table">
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyCustomers.map((customer, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.balance}</td>
                <td>
                  <span
                    className={`status-badge ${
                      customer.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkewedTableBackground;
