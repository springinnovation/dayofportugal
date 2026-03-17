import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface AlertSubscriber {
  id: string;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export function useAdminAlertSubscribers() {
  return useQuery<AlertSubscriber[]>({
    queryKey: ["admin-alert-subscribers"],
    queryFn: () => api.get("/alerts/admin/all"),
  });
}

export function useDeleteAlertSubscriber() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/alerts/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-alert-subscribers"] });
    },
  });
}
