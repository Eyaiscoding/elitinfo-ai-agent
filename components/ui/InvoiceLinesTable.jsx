import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function InvoiceLinesTable({ data }) {
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead>Line ID</TableHead>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Line Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell>{db.LineID ?? "N/A"}</TableCell>
            <TableCell>{db.InvoiceID ?? "N/A"}</TableCell>
            <TableCell>{db.ProductID ?? "N/A"}</TableCell>
            <TableCell>{db.Quantity ?? "N/A"}</TableCell>
            <TableCell>{db.LineTotal ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
