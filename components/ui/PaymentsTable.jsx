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
          <TableHead className="text-center">Payment ID</TableHead>
          <TableHead className="text-center">Invoice ID</TableHead>
          <TableHead className="text-center">Payment Date</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell className="text-center">{db.PaymentID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.InvoiceID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.PaymentDate ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Amount ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Method ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
