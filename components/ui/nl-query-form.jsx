"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  useCopilotReadable,
  useCopilotAction,
} from "@copilotkit/react-core";

import { Tabledata } from "./Tabledata"; // Customers
import { SuppliersTable } from "./SuppliersTable";
import { ProductsTable } from "./ProductsTable";
import { InvoicesTable } from "./InvoicesTable";
import { InvoiceLinesTable } from "./InvoiceLinesTable";
import { PaymentsTable } from "./PaymentsTable";
import { PurchaseOrdersTable } from "./PurchaseOrdersTable";

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
        const headers = {
          "x-apikey": API_KEY,
          "Content-Type": "application/json",
        };

        const [
          customersRes,
          suppliersRes,
          productsRes,
          invoicesRes,
          invoiceLinesRes,
          paymentsRes,
          purchaseOrdersRes,
        ] = await Promise.all([
          axios.get(urls.customers, { headers }),
          axios.get(urls.suppliers, { headers }),
          axios.get(urls.products, { headers }),
          axios.get(urls.invoices, { headers }),
          axios.get(urls.invoiceLines, { headers }),
          axios.get(urls.payments, { headers }),
          axios.get(urls.purchaseOrders, { headers }),
        ]);

        setCustomers(customersRes.data);
        setSuppliers(suppliersRes.data);
        setProducts(productsRes.data);
        setInvoices(invoicesRes.data);
        setInvoiceLines(invoiceLinesRes.data);
        setPayments(paymentsRes.data);
        setPurchaseOrders(purchaseOrdersRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError("Failed to load data");
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  // ---------- Expose to CopilotKit ------------------
  const readableCaps = useMemo(() => {
    const cap = (arr, n = 50) => Array.isArray(arr) ? arr.slice(0, n) : [];
    return {
      customers: cap(customers),
      suppliers: cap(suppliers),
      products: cap(products),
      invoices: cap(invoices),
      invoiceLines: cap(invoiceLines),
      payments: cap(payments),
      purchaseOrders: cap(purchaseOrders),
    };
  }, [customers, suppliers, products, invoices, invoiceLines, payments, purchaseOrders]);

  // Readables: tell Groq what the tables look like
  useCopilotReadable({
    description: "Customers table with CustomerID, Name, Email, Phone, Address, City, Country",
    value: JSON.stringify(readableCaps.customers),
  });
  useCopilotReadable({
    description: "Suppliers table with SupplierID, Name, Contact, Phone, City, Country",
    value: JSON.stringify(readableCaps.suppliers),
  });
  useCopilotReadable({
    description: "Products table with ProductID, Name, Description, UnitPrice, SupplierID",
    value: JSON.stringify(readableCaps.products),
  });
  useCopilotReadable({
    description: "Invoices table with InvoiceID, CustomerID, InvoiceDate, TotalAmount, Status",
    value: JSON.stringify(readableCaps.invoices),
  });
  useCopilotReadable({
    description: "InvoiceLines table with LineID, InvoiceID, ProductID, Quantity, LineTotal",
    value: JSON.stringify(readableCaps.invoiceLines),
  });
  useCopilotReadable({
    description: "Payments table with PaymentID, InvoiceID, PaymentDate, Amount, Method",
    value: JSON.stringify(readableCaps.payments),
  });
  useCopilotReadable({
    description: "PurchaseOrders table with POID, SupplierID, OrderDate, TotalAmount, Status",
    value: JSON.stringify(readableCaps.purchaseOrders),
  });

  // Actions: functions Groq can call
  useCopilotAction({
    name: "getInvoicesByCustomer",
    description: "Return all invoices for a given customer",
    parameters: [{ name: "customerId", type: "string", required: true }],
    handler: async ({ customerId }) => {
      const list = invoices.filter((i) => String(i.CustomerID) === String(customerId));
      return JSON.stringify(list);
    },
  });

  useCopilotAction({
    name: "getProductsBySupplier",
    description: "Return products for a given supplier",
    parameters: [{ name: "supplierId", type: "string", required: true }],
    handler: async ({ supplierId }) => {
      const list = products.filter((p) => String(p.SupplierID) === String(supplierId));
      return JSON.stringify(list);
    },
  });

  useCopilotAction({
    name: "getInvoiceBundle",
    description: "Return invoice with its lines and payments",
    parameters: [{ name: "invoiceId", type: "string", required: true }],
    handler: async ({ invoiceId }) => {
      const invoice = invoices.find((i) => String(i.InvoiceID) === String(invoiceId));
      const lines = invoiceLines.filter((l) => String(l.InvoiceID) === String(invoiceId));
      const pays = payments.filter((p) => String(p.InvoiceID) === String(invoiceId));
      return JSON.stringify({ invoice, lines, payments: pays });
    },
  });

  // --------------------------------------------------

  if (loading) return <div>Loading...</div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-bold text-center">Customers</h2>
        <Tabledata data={customers} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-center">Suppliers</h2>
        <SuppliersTable data={suppliers} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-center">Products</h2>
        <ProductsTable data={products} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-center">Invoices</h2>
        <InvoicesTable data={invoices} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-center">Invoice Lines</h2>
        <InvoiceLinesTable data={invoiceLines} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-center">Payments</h2>
        <PaymentsTable data={payments} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-center">Purchase Orders</h2>
        <PurchaseOrdersTable data={purchaseOrders} />
      </div>
    </div>
  );
}

export default NLQueryForm;
