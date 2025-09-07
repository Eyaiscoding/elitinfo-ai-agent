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
          <TableHead className="text-center">PO ID</TableHead>
          <TableHead className="text-center">Supplier ID</TableHead>
          <TableHead className="text-center">Order Date</TableHead>
          <TableHead className="text-center">Total Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell className="text-center">{db.POID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.SupplierID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.OrderDate ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.TotalAmount ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Status ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
