import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import SponsorForm from "./SponsorForm";
import {
  useAdminSponsors,
  useCreateSponsor,
  useUpdateSponsor,
  useDeleteSponsor,
  type Sponsor,
  type SponsorInput,
} from "@/hooks/useSponsors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSponsors = () => {
  const { data: sponsors, isLoading } = useAdminSponsors();
  const createSponsor = useCreateSponsor();
  const updateSponsor = useUpdateSponsor();
  const deleteSponsor = useDeleteSponsor();
  const { toast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    setEditingSponsor(null);
    setFormOpen(true);
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setFormOpen(true);
  };

  const handleSubmit = async (data: SponsorInput) => {
    try {
      if (editingSponsor) {
        await updateSponsor.mutateAsync({ id: editingSponsor.id, data });
        toast({ title: "Sponsor updated successfully" });
      } else {
        await createSponsor.mutateAsync(data);
        toast({ title: "Sponsor added successfully" });
      }
      setFormOpen(false);
      setEditingSponsor(null);
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteSponsor.mutateAsync(deleteId);
      toast({ title: "Sponsor deleted" });
    } catch (err) {
      toast({
        title: "Error deleting sponsor",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const tierColor = (tier: string) => {
    switch (tier) {
      case "platinum": return "bg-slate-200 text-slate-800";
      case "gold": return "bg-yellow-100 text-yellow-800";
      case "silver": return "bg-gray-200 text-gray-700";
      case "bronze": return "bg-orange-100 text-orange-800";
      default: return "";
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Sponsors</h1>
        <Button onClick={handleCreate} className="gap-2">
          <Plus size={16} />
          Add Sponsor
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sponsor</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : sponsors?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No sponsors yet. Click "Add Sponsor" to create one.
                </TableCell>
              </TableRow>
            ) : (
              sponsors?.map((sponsor) => (
                <TableRow key={sponsor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {sponsor.logo_url && (
                        <img src={sponsor.logo_url} alt="" className="w-8 h-8 object-contain rounded" />
                      )}
                      <span className="font-medium">{sponsor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={tierColor(sponsor.tier)} variant="secondary">
                      {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {sponsor.website_url || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={sponsor.is_published ? "default" : "outline"}>
                      {sponsor.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(sponsor)}>
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(sponsor.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <SponsorForm
        open={formOpen}
        onOpenChange={setFormOpen}
        sponsor={editingSponsor}
        onSubmit={handleSubmit}
        isSubmitting={createSponsor.isPending || updateSponsor.isPending}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sponsor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this sponsor? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminSponsors;
