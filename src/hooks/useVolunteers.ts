import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Volunteer {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  area_of_interest: string | null;
  message: string | null;
  created_at: string;
}

export interface VolunteerInput {
  full_name: string;
  email: string;
  phone?: string;
  area_of_interest?: string;
  message?: string;
}

export function useAdminVolunteers() {
  return useQuery<Volunteer[]>({
    queryKey: ["admin-volunteers"],
    queryFn: () => api.get("/volunteers/admin/all"),
  });
}

export function useSubmitVolunteer() {
  return useMutation({
    mutationFn: (data: VolunteerInput) =>
      api.post<{ id: string; message: string }>("/volunteers", data),
  });
}

export function useDeleteVolunteer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/volunteers/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-volunteers"] });
    },
  });
}
