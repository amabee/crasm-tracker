import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const fetchLookupData = async () => {
  const { data } = await axios.get("/api/admin/data-lookup");
  return data;
};

const fetchUsers = async () => {
  const { data } = await axios.get("/api/admin/users");
  return data.map((user) => ({
    id: user.user_id,
    name: user.full_name,
    email: user.email,
    role: user.user_type,
    status: user.is_active,
    province: user.province
  }));
};

const createUser = async (userData) => {
  const apiData = {
    fullName: userData.fullName,
    email: userData.email,
    userType: userData.userType,
    province: userData.province,
  };
  const { data } = await axios.post("/api/admin/users", apiData);
  return data;
};

const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/admin/users/${userId}`);
  return data;
};

export const useUser = (onSuccess) => {
  const queryClient = useQueryClient();

  const [resetPasswordDialog, setResetPasswordDialog] = useState({
    open: false,
    password: "",
    hashedPassword: "",
  });
  const [changeRoleDialog, setChangeRoleDialog] = useState({
    open: false,
    user: null,
  });

  const {
    data: lookupData,
    isError: isLookupError,
    isLoading: isLookupLoading,
  } = useQuery({
    queryKey: ["lookupData"],
    queryFn: fetchLookupData,
  });

  const {
    data: users = [],
    isError: isUsersError,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
      onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error ||
          `Failed to create user`
      );
      console.log(error);
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole, province }) => {
      const { data } = await axios.patch(`/api/admin/users/${userId}/role`, {
        userType: newRole,
        province: province,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role updated successfully");
      setChangeRoleDialog({ open: false, user: null });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update user role");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to delete user");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (userId) => {
      const { data } = await axios.post(
        `/api/admin/users/${userId}/reset-password`
      );
      return data;
    },
    onSuccess: (data) => {
      setResetPasswordDialog({
        open: true,
        password: data.newPassword,
        hashedPassword: data.hashedPassword,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to reset password");
    },
  });

  const toggleUserStatusMutation = useMutation({
    mutationFn: async ({ userId, isActive }) => {
      const { data } = await axios.patch(
        `/api/admin/users/${userId}/account-suspension`,
        {
          isActive,
        }
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(
        `User ${variables.isActive ? "activated" : "suspended"} successfully`
      );
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error || "Failed to update user status"
      );
    },
  });
  return {
    users,
    lookupData,
    isError: isLookupError || isUsersError,
    isLoading: isLookupLoading || isUsersLoading,
    createUser: createUserMutation.mutate,
    updateRole: updateRoleMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    toggleUserStatus: toggleUserStatusMutation.mutate,
    isCreating: createUserMutation.isPending,
    isUpdating: updateRoleMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
    isResetting: resetPasswordMutation.isPending,
    isTogglingStatus: toggleUserStatusMutation.isPending,
    resetPasswordDialog,
    setResetPasswordDialog,
    changeRoleDialog,
    setChangeRoleDialog,
    refetchUsers,
  };
};
