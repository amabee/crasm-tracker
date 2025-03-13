import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchChecklistItems = async (applicationId) => {
  const response = await fetch(
    `/api/provincial/checklist?application_id=${applicationId}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

const updateChecklistItemStatus = async ({
  applicationId,
  checklistId,
  isChecked,
  remarks,
}) => {
  const response = await fetch("/api/provincial/checklist", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      application_id: applicationId,
      checklist_id: checklistId,
      completeness_check: isChecked ? 1 : 0,
      remarks: remarks || "",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update checklist item");
  }

  return await response.json();
};

export const useChecklist = (applicationId) => {
  const queryClient = useQueryClient();

  const {
    data: checklistItems = [],
    isLoading,
    isError,
    error,
    refetch: refetchChecklistItems,
  } = useQuery({
    queryKey: ["checklistItems", applicationId],
    queryFn: () => fetchChecklistItems(applicationId),
    enabled: !!applicationId,
  });

  const updateChecklistMutation = useMutation({
    mutationFn: updateChecklistItemStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checklistItems", applicationId],
      });
      toast.success("Checklist updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update checklist: ${error.message}`);
    },
  });

  return {
    checklistItems,
    isLoading,
    isError,
    error,
    errorMessage: error?.message || "An unknown error occurred",
    refetchChecklistItems,
    updateChecklistItem: updateChecklistMutation.mutate,
    isUpdating: updateChecklistMutation.isPending,
    mutationError: updateChecklistMutation.error,
    mutationErrorMessage:
      updateChecklistMutation.error?.message || "An unknown error occurred",
  };
};
