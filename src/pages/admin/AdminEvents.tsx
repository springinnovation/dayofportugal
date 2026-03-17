import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import EventForm from "./EventForm";
import {
  useAdminEvents,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
  type Event,
  type EventInput,
} from "@/hooks/useEvents";
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

const AdminEvents = () => {
  const { data: events, isLoading } = useAdminEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const { toast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    setEditingEvent(null);
    setFormOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormOpen(true);
  };

  const handleSubmit = async (data: EventInput) => {
    try {
      if (editingEvent) {
        await updateEvent.mutateAsync({ id: editingEvent.id, data });
        toast({ title: "Event updated successfully" });
      } else {
        await createEvent.mutateAsync(data);
        toast({ title: "Event created successfully" });
      }
      setFormOpen(false);
      setEditingEvent(null);
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
      await deleteEvent.mutateAsync(deleteId);
      toast({ title: "Event deleted" });
    } catch (err) {
      toast({
        title: "Error deleting event",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Events</h1>
        <Button onClick={handleCreate} className="gap-2">
          <Plus size={16} />
          Add Event
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
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
            ) : events?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No events yet. Click "Add Event" to create one.
                </TableCell>
              </TableRow>
            ) : (
              events?.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    {event.title}
                    {event.is_featured && (
                      <Badge variant="secondary" className="ml-2 text-xs">Featured</Badge>
                    )}
                  </TableCell>
                  <TableCell>{event.date_display}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.category || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={event.is_published ? "default" : "outline"}>
                      {event.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(event)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(event.id)}
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

      <EventForm
        open={formOpen}
        onOpenChange={setFormOpen}
        event={editingEvent}
        onSubmit={handleSubmit}
        isSubmitting={createEvent.isPending || updateEvent.isPending}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
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

export default AdminEvents;
