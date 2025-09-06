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
          <TableHead>Product ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead>Supplier ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? Math.random()}>
            <TableCell>{db.ProductID ?? "N/A"}</TableCell>
            <TableCell>{db.Name ?? "N/A"}</TableCell>
            <TableCell>{db.Description ?? "N/A"}</TableCell>
            <TableCell>{db.UnitPrice ?? "N/A"}</TableCell>
            <TableCell>{db.SupplierID ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
