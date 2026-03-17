import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  useAdminScholarshipApplications,
  useDeleteScholarshipApplication,
  useUpdateApplicationStatus,
  useUpdateApplicationNotes,
  type ScholarshipApplication,
} from "@/hooks/useScholarshipApplications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Eye, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  reviewed: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const AdminScholarships = () => {
  const { data: applications, isLoading } = useAdminScholarshipApplications();
  const deleteApp = useDeleteScholarshipApplication();
  const updateStatus = useUpdateApplicationStatus();
  const updateNotes = useUpdateApplicationNotes();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewApp, setViewApp] = useState<ScholarshipApplication | null>(null);
  const [notes, setNotes] = useState("");

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteApp.mutateAsync(deleteId);
      toast({ title: "Application removed" });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast({ title: `Status updated to ${status}` });
      if (viewApp?.id === id) {
        setViewApp({ ...viewApp, status });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleSaveNotes = async () => {
    if (!viewApp) return;
    try {
      await updateNotes.mutateAsync({ id: viewApp.id, notes });
      setViewApp({ ...viewApp, admin_notes: notes });
      toast({ title: "Notes saved" });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Scholarship Applications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {applications ? `${applications.length} application${applications.length !== 1 ? "s" : ""}` : ""}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>GPA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : applications?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No scholarship applications yet.
                </TableCell>
              </TableRow>
            ) : (
              applications?.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.full_name}</TableCell>
                  <TableCell>
                    <a href={`mailto:${app.email}`} className="text-primary hover:underline text-sm">
                      {app.email}
                    </a>
                  </TableCell>
                  <TableCell className="text-sm">{app.current_gpa}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${statusColors[app.status] || ""}`}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(app.created_at)}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => { setViewApp(app); setNotes(app.admin_notes || ""); }}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(app.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this scholarship application? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Application Dialog */}
      <Dialog open={!!viewApp} onOpenChange={() => setViewApp(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Application: {viewApp?.full_name}
            </DialogTitle>
          </DialogHeader>

          {viewApp && (
            <div className="space-y-6 text-sm">
              {/* Status Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground">Status:</span>
                {["new", "reviewed", "accepted", "rejected"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(viewApp.id, s)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                      viewApp.status === s
                        ? statusColors[s]
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Personal Info */}
              <div>
                <h3 className="font-display font-bold text-primary mb-2">A. Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  <div><span className="font-semibold">Name:</span> {viewApp.full_name}</div>
                  <div><span className="font-semibold">DOB:</span> {viewApp.date_of_birth}</div>
                  <div className="sm:col-span-2"><span className="font-semibold">Home Address:</span> {viewApp.home_address}</div>
                  {viewApp.campus_address && <div className="sm:col-span-2"><span className="font-semibold">Campus Address:</span> {viewApp.campus_address}</div>}
                  <div><span className="font-semibold">Phone (Home):</span> {viewApp.phone_home || "—"}</div>
                  <div><span className="font-semibold">Phone (Cell):</span> {viewApp.phone_cell || "—"}</div>
                  <div><span className="font-semibold">Email:</span> <a href={`mailto:${viewApp.email}`} className="text-primary hover:underline">{viewApp.email}</a></div>
                  <div><span className="font-semibold">U.S. Citizen:</span> {viewApp.us_citizen ? "Yes" : "No"}</div>
                  {viewApp.parent_org_membership && <div className="sm:col-span-2"><span className="font-semibold">Parent's Organization:</span> {viewApp.parent_org_membership}</div>}
                  <div className="sm:col-span-2"><span className="font-semibold">Portuguese Ancestry:</span> {viewApp.portuguese_ancestry}</div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-display font-bold text-primary mb-2">B. Educational Background</h3>
                <div className="border border-border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left px-3 py-2 font-semibold">Institution</th>
                        <th className="text-left px-3 py-2 font-semibold">Dates</th>
                        <th className="text-left px-3 py-2 font-semibold">Major/Minor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewApp.education.map((e, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="px-3 py-2">{e.institution}</td>
                          <td className="px-3 py-2">{e.dates}</td>
                          <td className="px-3 py-2">{e.majorMinor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 flex gap-6">
                  <span><span className="font-semibold">GPA:</span> {viewApp.current_gpa}</span>
                  {viewApp.anticipated_graduation && <span><span className="font-semibold">Expected Graduation:</span> {viewApp.anticipated_graduation}</span>}
                </div>
              </div>

              {/* Activities */}
              {viewApp.activities.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-primary mb-2">C. Extra-Curricular Activities</h3>
                  <div className="border border-border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left px-3 py-2 font-semibold">Organization/Activity</th>
                          <th className="text-left px-3 py-2 font-semibold">Type</th>
                          <th className="text-left px-3 py-2 font-semibold">Hours/Month</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewApp.activities.map((a, i) => (
                          <tr key={i} className="border-t border-border">
                            <td className="px-3 py-2">{a.name}</td>
                            <td className="px-3 py-2">{a.type}</td>
                            <td className="px-3 py-2">{a.hoursPerMonth}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Awards */}
              {viewApp.awards.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-primary mb-2">D. Awards & Recognition</h3>
                  <div className="border border-border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left px-3 py-2 font-semibold">Award / Recognition</th>
                          <th className="text-left px-3 py-2 font-semibold">Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewApp.awards.map((a, i) => (
                          <tr key={i} className="border-t border-border">
                            <td className="px-3 py-2">{a.name}</td>
                            <td className="px-3 py-2">{a.year}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Essay */}
              <div>
                <h3 className="font-display font-bold text-primary mb-2">E. Personal Essay</h3>
                <div className="bg-muted/50 border border-border rounded-lg p-4 whitespace-pre-wrap leading-relaxed">
                  {viewApp.essay}
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <h3 className="font-display font-bold text-primary mb-2">Admin Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Add internal notes about this application..."
                />
                <Button
                  size="sm"
                  onClick={handleSaveNotes}
                  disabled={updateNotes.isPending}
                  className="mt-2"
                >
                  <Save size={14} className="mr-1" />
                  {updateNotes.isPending ? "Saving..." : "Save Notes"}
                </Button>
              </div>

              {/* Meta */}
              <div className="text-xs text-muted-foreground border-t border-border pt-3">
                Submitted: {formatDate(viewApp.created_at)} | Certified: {viewApp.certified ? "Yes" : "No"}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminScholarships;
