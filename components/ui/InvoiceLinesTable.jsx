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
          <TableHead className="text-center">Line ID</TableHead>
          <TableHead className="text-center">Invoice ID</TableHead>
          <TableHead className="text-center">Product ID</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Line Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell className="text-center">{db.LineID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.InvoiceID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.ProductID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Quantity ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.LineTotal ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
