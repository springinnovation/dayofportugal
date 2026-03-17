import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Event {
  id: string;
  title: string;
  description: string;
  date_start: string | null;
  date_end: string | null;
  date_display: string;
  time_start: string | null;
  time_end: string | null;
  location: string;
  category: string | null;
  image_url: string | null;
  document_url: string | null;
  document_name: string | null;
  is_featured: boolean;
  is_annual: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type EventInput = Omit<Event, "id" | "created_at" | "updated_at">;

export function usePublicEvents() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: () => api.get("/events"),
  });
}

export function useAdminEvents() {
  return useQuery<Event[]>({
    queryKey: ["admin-events"],
    queryFn: () => api.get("/events/admin/all"),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EventInput) => api.post<Event>("/events/admin", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EventInput }) =>
      api.put<Event>(`/events/admin/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/events/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
