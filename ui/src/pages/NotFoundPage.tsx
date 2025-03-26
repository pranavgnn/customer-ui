import React from "react";
import { Link } from "react-router";
import Layout from "../components/Layout";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "../components/ui";

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-neutral-900 mb-6">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
            Page not found
          </h2>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              leftIcon={<Home className="w-4 h-4" />}
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
            <Link to="/">
              <Button variant="secondary">Return to Homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
