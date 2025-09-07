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
          <TableHead className="text-center">Invoice ID</TableHead>
          <TableHead className="text-center">Customer ID</TableHead>
          <TableHead className="text-center">Invoice Date</TableHead>
          <TableHead className="text-center">Total Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell className="text-center">{db.InvoiceID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.CustomerID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.InvoiceDate ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.TotalAmount ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Status ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
