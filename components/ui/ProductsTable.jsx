import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ProductsTable({ data }) {
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Product ID</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Description</TableHead>
          <TableHead className="text-center">Unit Price</TableHead>
          <TableHead className="text-center">Supplier ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell className="text-center">{db.ProductID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Name ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Description ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.UnitPrice ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.SupplierID ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
