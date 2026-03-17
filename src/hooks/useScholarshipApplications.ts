import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface EducationEntry {
  institution: string;
  dates: string;
  majorMinor: string;
}

export interface ActivityEntry {
  name: string;
  type: string;
  hoursPerMonth: string;
}

export interface AwardEntry {
  name: string;
  year: string;
}

export interface ScholarshipApplication {
  id: string;
  full_name: string;
  date_of_birth: string;
  home_address: string;
  campus_address: string | null;
  phone_home: string | null;
  phone_cell: string | null;
  email: string;
  us_citizen: boolean;
  parent_org_membership: string | null;
  portuguese_ancestry: string;
  education: EducationEntry[];
  current_gpa: string;
  anticipated_graduation: string | null;
  activities: ActivityEntry[];
  awards: AwardEntry[];
  essay: string;
  certified: boolean;
  admin_notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipApplicationInput {
  full_name: string;
  date_of_birth: string;
  home_address: string;
  campus_address?: string;
  phone_home?: string;
  phone_cell?: string;
  email: string;
  us_citizen: boolean;
  parent_org_membership?: string;
  portuguese_ancestry: string;
  education: EducationEntry[];
  current_gpa: string;
  anticipated_graduation?: string;
  activities?: ActivityEntry[];
  awards?: AwardEntry[];
  essay: string;
  certified: true;
}

export function useAdminScholarshipApplications() {
  return useQuery<ScholarshipApplication[]>({
    queryKey: ["admin-scholarship-applications"],
    queryFn: () => api.get("/scholarships/admin/all"),
  });
}

export function useAdminScholarshipApplication(id: string | null) {
  return useQuery<ScholarshipApplication>({
    queryKey: ["admin-scholarship-application", id],
    queryFn: () => api.get(`/scholarships/admin/${id}`),
    enabled: !!id,
  });
}

export function useSubmitScholarshipApplication() {
  return useMutation({
    mutationFn: (data: ScholarshipApplicationInput) =>
      api.post<{ id: string; message: string }>("/scholarships", data),
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/scholarships/admin/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-scholarship-applications"] });
    },
  });
}

export function useUpdateApplicationNotes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      api.patch(`/scholarships/admin/${id}/notes`, { notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-scholarship-applications"] });
    },
  });
}

export function useDeleteScholarshipApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/scholarships/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-scholarship-applications"] });
    },
  });
}
