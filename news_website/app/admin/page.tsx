import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Article Management</h2>
        <Button>+ Add New Article</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="text-muted-foreground">Title</TableHead>
            <TableHead className="text-muted-foreground">Category</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-border">
            <TableCell className="font-medium">AI Revolution</TableCell>
            <TableCell>Tech</TableCell>
            <TableCell className="space-x-2 text-right">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
