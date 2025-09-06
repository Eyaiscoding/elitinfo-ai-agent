import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PurchaseOrdersTable({ data }) {
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead>PO ID</TableHead>
          <TableHead>Supplier ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell>{db.POID ?? "N/A"}</TableCell>
            <TableCell>{db.SupplierID ?? "N/A"}</TableCell>
            <TableCell>{db.OrderDate ?? "N/A"}</TableCell>
            <TableCell>{db.TotalAmount ?? "N/A"}</TableCell>
            <TableCell>{db.Status ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
