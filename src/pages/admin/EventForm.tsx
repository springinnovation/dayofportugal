import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { api } from "@/lib/api";
import type { Event, EventInput } from "@/hooks/useEvents";

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date_start: z.string().optional().default(""),
  date_end: z.string().optional().default(""),
  date_display: z.string().min(1, "Display date is required"),
  time_start: z.string().optional().default(""),
  time_end: z.string().optional().default(""),
  location: z.string().min(1, "Location is required"),
  category: z.string().optional().default(""),
  image_url: z.string().optional().default(""),
  document_url: z.string().optional().default(""),
  document_name: z.string().optional().default(""),
  is_featured: z.boolean().default(false),
  is_annual: z.boolean().default(true),
  is_published: z.boolean().default(true),
  sort_order: z.coerce.number().default(0),
});

type FormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event | null;
  onSubmit: (data: EventInput) => void;
  isSubmitting: boolean;
}

const EventForm = ({ open, onOpenChange, event, onSubmit, isSubmitting }: EventFormProps) => {
  const [imageUploading, setImageUploading] = useState(false);
  const [docUploading, setDocUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(eventFormSchema),
    values: event
      ? {
          title: event.title,
          description: event.description,
          date_start: event.date_start || "",
          date_end: event.date_end || "",
          date_display: event.date_display,
          time_start: event.time_start || "",
          time_end: event.time_end || "",
          location: event.location,
          category: event.category || "",
          image_url: event.image_url || "",
          document_url: event.document_url || "",
          document_name: event.document_name || "",
          is_featured: event.is_featured,
          is_annual: event.is_annual,
          is_published: event.is_published,
          sort_order: event.sort_order,
        }
      : undefined,
  });

  const imageUrl = watch("image_url");
  const documentUrl = watch("document_url");
  const documentName = watch("document_name");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const result = await api.upload<{ url: string }>("/upload/image", file);
      setValue("image_url", result.url);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setImageUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocUploading(true);
    try {
      const result = await api.upload<{ url: string; name: string }>("/upload/document", file);
      setValue("document_url", result.url);
      setValue("document_name", result.name);
    } catch (err) {
      console.error("Document upload failed:", err);
    } finally {
      setDocUploading(false);
      if (docInputRef.current) docInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      date_start: values.date_start || null,
      date_end: values.date_end || null,
      time_start: values.time_start || null,
      time_end: values.time_end || null,
      category: values.category || null,
      image_url: values.image_url || null,
      document_url: values.document_url || null,
      document_name: values.document_name || null,
    } as EventInput);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {event ? "Edit Event" : "Create Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" {...register("title")} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" rows={3} {...register("description")} />
              {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_display">Display Date * (e.g. "June", "Summer")</Label>
              <Input id="date_display" {...register("date_display")} />
              {errors.date_display && <p className="text-xs text-destructive">{errors.date_display.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" {...register("location")} />
              {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_start">Start Date</Label>
              <Input id="date_start" type="date" {...register("date_start")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_end">End Date</Label>
              <Input id="date_end" type="date" {...register("date_end")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time_start">Start Time</Label>
              <Input id="time_start" type="time" {...register("time_start")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time_end">End Time</Label>
              <Input id="time_end" type="time" {...register("time_end")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g. parade, festival, sport" {...register("category")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" type="number" {...register("sort_order")} />
            </div>

            {/* Image Upload */}
            <div className="space-y-2 sm:col-span-2">
              <Label>Event Image</Label>
              {imageUrl ? (
                <div className="flex items-center gap-3 p-3 rounded-md border border-border bg-muted/50">
                  <img src={imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded" />
                  <span className="text-sm text-muted-foreground flex-1 truncate">{imageUrl}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setValue("image_url", "")}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={imageUploading}
                    onClick={() => imageInputRef.current?.click()}
                    className="gap-2"
                  >
                    {imageUploading ? (
                      "Uploading..."
                    ) : (
                      <>
                        <ImageIcon size={16} />
                        Upload Image
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Document Upload */}
            <div className="space-y-2 sm:col-span-2">
              <Label>Document (PDF, Word)</Label>
              {documentUrl ? (
                <div className="flex items-center gap-3 p-3 rounded-md border border-border bg-muted/50">
                  <FileText size={20} className="text-primary shrink-0" />
                  <span className="text-sm text-foreground flex-1 truncate">{documentName || "Document"}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setValue("document_url", "");
                      setValue("document_name", "");
                    }}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div>
                  <input
                    ref={docInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={docUploading}
                    onClick={() => docInputRef.current?.click()}
                    className="gap-2"
                  >
                    {docUploading ? (
                      "Uploading..."
                    ) : (
                      <>
                        <Upload size={16} />
                        Upload Document
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Switch
                id="is_published"
                checked={watch("is_published")}
                onCheckedChange={(v) => setValue("is_published", v)}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_featured"
                checked={watch("is_featured")}
                onCheckedChange={(v) => setValue("is_featured", v)}
              />
              <Label htmlFor="is_featured">Featured</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_annual"
                checked={watch("is_annual")}
                onCheckedChange={(v) => setValue("is_annual", v)}
              />
              <Label htmlFor="is_annual">Annual</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : event ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
