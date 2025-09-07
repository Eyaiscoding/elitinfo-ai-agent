import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Tabledata({ data }) {
  return (
    <div className="text-center">
      <Table className="text-center">
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="text-center">Customer ID</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Address</TableHead>
            <TableHead className="text-center">City</TableHead>
            <TableHead className="text-center">Country</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((db) => (
            <TableRow key={db._id ?? db.CustomerID ?? Math.random()}>
              <TableCell className="text-center">{db.CustomerID ?? "N/A"}</TableCell>
              <TableCell className="text-center">{db.Name ?? "N/A"}</TableCell>
              <TableCell className="text-center">{db.Email ?? "N/A"}</TableCell>
              <TableCell className="text-center">{db.Phone ?? "N/A"}</TableCell>
              <TableCell className="text-center">{db.Address ?? "N/A"}</TableCell>
              <TableCell className="text-center">{db.City ?? "N/A"}</TableCell>
              <TableCell className="text-center">{db.Country ?? "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
