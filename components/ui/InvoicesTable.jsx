import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function InvoicesTable({ data }) {
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Invoice Date</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell>{db.InvoiceID ?? "N/A"}</TableCell>
            <TableCell>{db.CustomerID ?? "N/A"}</TableCell>
            <TableCell>{db.InvoiceDate ?? "N/A"}</TableCell>
            <TableCell>{db.TotalAmount ?? "N/A"}</TableCell>
            <TableCell>{db.Status ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
