"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

import { Tabledata } from "./Tabledata";
import { SuppliersTable } from "./SuppliersTable";
import { ProductsTable } from "./ProductsTable";
import { InvoicesTable } from "./InvoicesTable";
import { InvoiceLinesTable } from "./InvoiceLinesTable";
import { PaymentsTable } from "./PaymentsTable";
import { PurchaseOrdersTable } from "./PurchaseOrdersTable";

import { Users, Package, FileText, DollarSign } from "lucide-react";

function NLQueryForm() {
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [invoiceLines, setInvoiceLines] = useState([]);
  const [payments, setPayments] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_RESTDB_API_KEY;

  const urls = {
    customers: process.env.NEXT_PUBLIC_RESTDB_CUSTOMERS_URL,
    suppliers: process.env.NEXT_PUBLIC_RESTDB_SUPPLIERS_URL,
    products: process.env.NEXT_PUBLIC_RESTDB_PRODUCTS_URL,
    invoices: process.env.NEXT_PUBLIC_RESTDB_INVOICES_URL,
    invoiceLines: process.env.NEXT_PUBLIC_RESTDB_INVOICE_LINES_URL,
    payments: process.env.NEXT_PUBLIC_RESTDB_PAYMENTS_URL,
    purchaseOrders: process.env.NEXT_PUBLIC_RESTDB_PURCHASE_ORDERS_URL,
  };

  useEffect(() => {
    async function fetchAll() {
      try {
        const headers = { "x-apikey": API_KEY, "Content-Type": "application/json" };

        const fetchCollection = async (url, setter) => {
          const res = await axios.get(url, { headers });
          setter(Array.isArray(res.data) ? res.data : []);
          await new Promise((r) => setTimeout(r, 1100));
        };

        await fetchCollection(urls.customers, setCustomers);
        await fetchCollection(urls.suppliers, setSuppliers);
        await fetchCollection(urls.products, setProducts);
        await fetchCollection(urls.invoices, setInvoices);
        await fetchCollection(urls.invoiceLines, setInvoiceLines);
        await fetchCollection(urls.payments, setPayments);
        await fetchCollection(urls.purchaseOrders, setPurchaseOrders);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError("Failed to load data");
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  // ✅ Expose state to Copilot
  useCopilotReadable({
    description: "All database tables from RestDB",
    value: {
      customers,
      suppliers,
      products,
      invoices,
      invoiceLines,
      payments,
      purchaseOrders,
    },
  });

  // ✅ Add useful Copilot Actions
  useCopilotAction({
    name: "getTopCustomers",
    description: "List top N customers by number of invoices",
    parameters: [{ name: "limit", type: "number", required: false }],
    handler: async ({ limit = 5 }) => {
      const customerInvoiceCounts = customers.map((c) => ({
        customer: c,
        count: invoices.filter((inv) => String(inv.CustomerID) === String(c.CustomerID)).length,
      }));
      customerInvoiceCounts.sort((a, b) => b.count - a.count);
      return customerInvoiceCounts.slice(0, limit);
    },
  });

  useCopilotAction({
    name: "getUnpaidInvoices",
    description: "Return all invoices that are unpaid",
    handler: async () => {
      return invoices.filter((inv) => inv.Status?.toLowerCase() === "unpaid");
    },
  });

  useCopilotAction({
    name: "getTopProducts",
    description: "List top N products by sales (based on invoice lines)",
    parameters: [{ name: "limit", type: "number", required: false }],
    handler: async ({ limit = 5 }) => {
      const productSales = products.map((p) => {
        const totalSold = invoiceLines
          .filter((line) => String(line.ProductID) === String(p.ProductID))
          .reduce((sum, line) => sum + (Number(line.Quantity) || 0), 0);
        return { product: p, totalSold };
      });
      productSales.sort((a, b) => b.totalSold - a.totalSold);
      return productSales.slice(0, limit);
    },
  });

  useCopilotAction({
    name: "getSupplierProducts",
    description: "Return all products for a given supplier",
    parameters: [{ name: "supplierId", type: "string", required: true }],
    handler: async ({ supplierId }) => {
      return products.filter((p) => String(p.SupplierID) === String(supplierId));
    },
  });

  // Dashboard metrics
  const dashboardCards = [
    { title: "Customers", value: customers.length, icon: <Users className="text-green-500" /> },
    { title: "Products", value: products.length, icon: <Package className="text-blue-500" /> },
    { title: "Invoices", value: invoices.length, icon: <FileText className="text-yellow-500" /> },
    { title: "Payments", value: payments.length, icon: <DollarSign className="text-purple-500" /> },
  ];

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300"></div>
      </div>
    );

  if (error) return <p className="text-red-600 text-center">{error}</p>;

  const renderCard = (title, Component, data) => (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 w-full max-w-7xl mx-auto transition transform hover:-translate-y-1 hover:shadow-2xl duration-300">
      <h2 className="text-green-600 dark:text-green-400 font-bold text-xl mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">{title}</h2>
      <div className="overflow-x-auto">
        <Component data={data} />
      </div>
    </div>
  );

  return (
    <div className="space-y-10 px-4 md:px-0">
      {/* Dashboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {dashboardCards.map((card, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 transition hover:scale-105"
          >
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">{card.icon}</div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {renderCard("Customers", Tabledata, customers)}
      {renderCard("Suppliers", SuppliersTable, suppliers)}
      {renderCard("Products", ProductsTable, products)}
      {renderCard("Invoices", InvoicesTable, invoices)}
      {renderCard("Invoice Lines", InvoiceLinesTable, invoiceLines)}
      {renderCard("Payments", PaymentsTable, payments)}
      {renderCard("Purchase Orders", PurchaseOrdersTable, purchaseOrders)}
    </div>
  );
}

export default NLQueryForm;
