import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PaymentsTable({ data }) {
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead>Payment ID</TableHead>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Payment Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell>{db.PaymentID ?? "N/A"}</TableCell>
            <TableCell>{db.InvoiceID ?? "N/A"}</TableCell>
            <TableCell>{db.PaymentDate ?? "N/A"}</TableCell>
            <TableCell>{db.Amount ?? "N/A"}</TableCell>
            <TableCell>{db.Method ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
