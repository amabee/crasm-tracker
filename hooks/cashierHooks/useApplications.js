import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchApplications = async (province_id = null) => {
  const url = new URL("/api/cashier/applications", window.location.origin);

  if (province_id) {
    url.searchParams.append("province_id", province_id);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data.map((application) => ({
    id: application.application_id,
    fullname: application.name_of_applicant,
    province: application.provincial_name,
    dateRecievedByPoFromSoApplicant:
      application.date_received_by_po_from_so_applicant,
    typeOfApplication: application.type_of_application,
    dateOfPayment: application.date_of_payment,
    OrNumber: application.or_number,
    dateTransmittedToRo: application.date_transmitted_to_ro,
    dateReceivedByRo: application.date_received_by_ro,
    RoScreener: application.ro_screener,

    dateForwardedToTheOfficeOfOIC:
      application.date_forwarded_to_the_office_of_oic,
    OicCrasd: application.oic_crasd,
    feedBacks: application.feedbacks,
    dateForwardedToORD: application.date_forwarded_to_ord,
    dateApplicationApprovedByRD: application.date_application_approved_by_rd,
    forIssuanceOfCrasm: application.for_issuance_of_crasm,
    forTransmittalOfCrasm: application.for_transmittal_of_crasm,
    dateCrasmGenerated: application.date_crasm_generated,
    dateForwardedBackToTheOfficeOfOicCao:
      application.date_forwarded_back_to_the_office_of_oic_cao,
    dateReviewedAndInitialedByOICCrasd:
      application.date_reviewed_and_initialed_by_oic_crasd,
    dateForwardedBackToOrd: application.date_forwarded_back_to_ord,
    dateCrasmApprovedByRD: application.date_crasm_approved_by_rd,
    dateTransmittedBackToPO: application.date_transmitted_back_to_po,
    dateReceivedByPO: application.date_received_by_po,
    dateReleasedToSO: application.date_released_to_so,
    Remarks: application.remarks,

    status: application.status,
    awaitingProcess: application.awaiting_process,
    dateCreated: application.date_created,
    lastUpdated: application.last_updated
      ? application.last_updated
      : "Not Available",
  }));
};

const fetchApplicationById = async (id) => {
  try {
    const response = await fetch(`/api/cashier/applications/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch application");
    }

    return data;
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
};

export const useApplication = (id, province_id = null) => {
  const queryClient = useQueryClient();

  const {
    data: applications = [],
    isError: isListError,
    isLoading: isListLoading,
    refetch: refetchApplications,
  } = useQuery({
    queryKey: ["applications", province_id],
    queryFn: () => fetchApplications(province_id),
    enabled: !id,
  });

  const {
    data: applicationDetail,
    isError: isDetailError,
    isLoading: isDetailLoading,
    refetch: refetchApplicationsDetails,
  } = useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchApplicationById(id),
    enabled: !!id,
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: async (applicationId) => {
      const response = await fetch(
        `/api/cashier/applications/${applicationId}`,
        {
          method: "DELETE",
        }
      );
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
      const response = await fetch(`/api/cashier/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("RESPONSE: ", response);
      if (!response.ok) {
        throw new Error("Failed to update application");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["application", id] });
      }

      toast.success("Action Success!");
    },
    onError: (error) => {
      toast.error(
        `Something went wrong while updating the data. ${error.message}`
      );
    },
  });

  const createApplicationMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/cashier/applications", {
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
    isListLoading,
    isListError,
    refetchApplications,

    applicationDetail,
    isDetailLoading,
    isDetailError,
    refetchApplicationsDetails,

    deleteApplication: deleteApplicationMutation.mutate,
    isDeleting: deleteApplicationMutation.isPending,
    updateApplication: updateApplicationMutation.mutate,
    isUpdating: updateApplicationMutation.isPending,
    createApplication: createApplicationMutation.mutate,
    isCreating: createApplicationMutation.isPending,
  };
};
