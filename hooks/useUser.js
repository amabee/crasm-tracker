import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const fetchLookupData = async () => {
  const { data } = await axios.get("/api/admin/data-lookup");
  return data;
};

const createUser = async (userData) => {
  const { data } = await axios.post("/api/admin/users", userData);
  return data;
};

export const useUser = (onSuccess) => {
  const queryClient = useQueryClient();

  const {
    data: lookupData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["lookupData"],
    queryFn: fetchLookupData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
  });

  return {
    lookupData,
    isError,
    isLoading,
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
  };
};
