import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SuppliersTable({ data }) {
  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Supplier ID</TableHead> {/* Added column */}
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Contact</TableHead>
          <TableHead className="text-center">Phone</TableHead>
          <TableHead className="text-center">City</TableHead>
          <TableHead className="text-center">Country</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((db) => (
          <TableRow key={db._id ?? db.SupplierID ?? Math.random()}>
            <TableCell className="text-center">{db.SupplierID ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Name ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Contact ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Phone ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.City ?? "N/A"}</TableCell>
            <TableCell className="text-center">{db.Country ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
