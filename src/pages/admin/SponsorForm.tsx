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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image as ImageIcon, X } from "lucide-react";
import { api } from "@/lib/api";
import type { Sponsor, SponsorInput } from "@/hooks/useSponsors";

const sponsorFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().default(""),
  logo_url: z.string().optional().default(""),
  website_url: z.string().optional().default(""),
  tier: z.string().default("supporter"),
  is_published: z.boolean().default(true),
  sort_order: z.coerce.number().default(0),
});

type FormValues = z.infer<typeof sponsorFormSchema>;

interface SponsorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sponsor?: Sponsor | null;
  onSubmit: (data: SponsorInput) => void;
  isSubmitting: boolean;
}

const TIERS = [
  { value: "platinum", label: "Platinum" },
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "bronze", label: "Bronze" },
  { value: "supporter", label: "Supporter" },
];

const SponsorForm = ({ open, onOpenChange, sponsor, onSubmit, isSubmitting }: SponsorFormProps) => {
  const [logoUploading, setLogoUploading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(sponsorFormSchema),
    values: sponsor
      ? {
          name: sponsor.name,
          description: sponsor.description || "",
          logo_url: sponsor.logo_url || "",
          website_url: sponsor.website_url || "",
          tier: sponsor.tier,
          is_published: sponsor.is_published,
          sort_order: sponsor.sort_order,
        }
      : undefined,
  });

  const logoUrl = watch("logo_url");
  const tier = watch("tier");

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    try {
      const result = await api.upload<{ url: string }>("/upload/image", file);
      setValue("logo_url", result.url);
    } catch (err) {
      console.error("Logo upload failed:", err);
    } finally {
      setLogoUploading(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      description: values.description || null,
      logo_url: values.logo_url || null,
      website_url: values.website_url || null,
    } as SponsorInput);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {sponsor ? "Edit Sponsor" : "Add Sponsor"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="website_url">Website URL</Label>
              <Input id="website_url" placeholder="https://..." {...register("website_url")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={2} {...register("description")} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tier</Label>
              <Select value={tier} onValueChange={(v) => setValue("tier", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIERS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" type="number" {...register("sort_order")} />
            </div>
            <div className="flex items-end pb-0.5">
              <div className="flex items-center gap-2">
                <Switch
                  id="is_published"
                  checked={watch("is_published")}
                  onCheckedChange={(v) => setValue("is_published", v)}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Logo</Label>
            {logoUrl ? (
              <div className="flex items-center gap-3 p-3 rounded-md border border-border bg-muted/50">
                <img src={logoUrl} alt="Logo preview" className="w-12 h-12 object-contain rounded" />
                <span className="text-sm text-muted-foreground flex-1 truncate">{logoUrl}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setValue("logo_url", "")}
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={logoUploading}
                  onClick={() => logoInputRef.current?.click()}
                  className="gap-2"
                >
                  {logoUploading ? "Uploading..." : <><ImageIcon size={16} /> Upload Logo</>}
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : sponsor ? "Update Sponsor" : "Add Sponsor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SponsorForm;
