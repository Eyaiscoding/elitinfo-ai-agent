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
      {/* Top caption */}
      <p className="text-sm text-green-600 font-bold mb-2">
        Live data from database.
      </p>

      <Table className="text-center">
        <TableHeader>
          <TableRow className="text-center">
            <TableHead>Customer ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((db) => (
            <TableRow key={db._id ?? db.CustomerID ?? Math.random()}>
              <TableCell>{db.CustomerID ?? "N/A"}</TableCell>
              <TableCell>{db.Name ?? "N/A"}</TableCell>
              <TableCell>{db.Email ?? "N/A"}</TableCell>
              <TableCell>{db.Phone ?? "N/A"}</TableCell>
              <TableCell>{db.Address ?? "N/A"}</TableCell>
              <TableCell>{db.City ?? "N/A"}</TableCell>
              <TableCell>{db.Country ?? "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
