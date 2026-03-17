import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Sponsor {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  tier: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type SponsorInput = Omit<Sponsor, "id" | "created_at" | "updated_at">;

export function usePublicSponsors() {
  return useQuery<Sponsor[]>({
    queryKey: ["sponsors"],
    queryFn: () => api.get("/sponsors"),
  });
}

export function useAdminSponsors() {
  return useQuery<Sponsor[]>({
    queryKey: ["admin-sponsors"],
    queryFn: () => api.get("/sponsors/admin/all"),
  });
}

export function useCreateSponsor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SponsorInput) => api.post<Sponsor>("/sponsors/admin", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-sponsors"] });
      queryClient.invalidateQueries({ queryKey: ["sponsors"] });
    },
  });
}

export function useUpdateSponsor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SponsorInput }) =>
      api.put<Sponsor>(`/sponsors/admin/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-sponsors"] });
      queryClient.invalidateQueries({ queryKey: ["sponsors"] });
    },
  });
}

export function useDeleteSponsor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/sponsors/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-sponsors"] });
      queryClient.invalidateQueries({ queryKey: ["sponsors"] });
    },
  });
}
