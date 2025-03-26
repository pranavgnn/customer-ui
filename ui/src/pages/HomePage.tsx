import React from "react";
import { Link } from "react-router";
import Layout from "../components/Layout";
import { Users, Plus, Monitor } from "lucide-react";
import SkewedTableBackground from "../components/SkewedTableBackground";

const HomePage: React.FC = () => {
  return (
    <>
      <SkewedTableBackground />

      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] relative z-10 py-16 px-4">
          <div className="glass-panel max-w-3xl w-full mx-auto p-8 md:p-12 rounded-2xl">
            <div className="text-center">
              <div className="flex justify-center items-center mb-6">
                <div className="bg-primary-600 p-4 rounded-full shadow-lg transform transition-transform hover:rotate-12">
                  <Monitor className="h-10 w-10 text-white" />
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-900">
                Fintech <span className="text-primary-600">Lab</span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-700 mb-10 max-w-xl mx-auto">
                A modern web application to view, create, and edit customer data
                with ease
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/customers"
                  className="btn-glass-secondary group transition-all"
                >
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span>View All Customers</span>
                  </div>
                </Link>

                <Link
                  to="/customers/create"
                  className="btn-glass-primary group transition-all"
                >
                  <div className="flex items-center">
                    <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span>Create New Customer</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
