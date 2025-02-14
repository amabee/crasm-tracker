import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchApplications = async () => {
  const response = await fetch("/api/admin/applications");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data.map((application) => ({
    id: application.application_id,
    fullname: application.name_of_applicant,
    province: application.provincial_name,
    status: application.status,
    dateCreated: application.date_created,
    lastUpdated: application.last_updated,
  }));
};

export const useApplication = () => {
  const queryClient = useQueryClient();

  const {
    data: applications = [],
    isError,
    isLoading,
    refetch: refetchApplications,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: async (applicationId) => {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete application");
      }
      return applicationId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const updateApplicationMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update application");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const createApplicationMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/admin/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create application");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  return {
    applications,
    isLoading,
    isError,
    refetchApplications,
    deleteApplication: deleteApplicationMutation.mutate,
    isDeleting: deleteApplicationMutation.isPending,
    updateApplication: updateApplicationMutation.mutate,
    isUpdating: updateApplicationMutation.isPending,
    createApplication: createApplicationMutation.mutate,
    isCreating: createApplicationMutation.isPending,
  };
};
