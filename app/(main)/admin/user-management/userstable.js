import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  UserCog,
  Shield,
  Lock,
  Mail,
  Ban,
  UserX,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateUserDialog from "./CreateUserDialog";
import { useUser } from "@/hooks/useUser";
import LoadinPage from "@/components/LoadinPage";
import { ResetPasswordDialog } from "./resetPasswordDialog";
import { ChangeRoleDialog } from "./changeRoleDialog";

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    users,
    isLoading,
    isError,
    refetchUsers,
    updateRole,
    deleteUser,
    resetPassword,
    isResetting,
    lookupData,
    resetPasswordDialog,
    setResetPasswordDialog,
    changeRoleDialog,
    setChangeRoleDialog,
    toggleUserStatus,
    isTogglingStatus,
  } = useUser();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center py-6">
          <div>Loading users...</div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center py-6">
          <div>Error loading users. Please try again later.</div>
        </CardContent>
      </Card>
    );
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredData = users.filter((item) =>
    Object.values(item).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm)
    )
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-red-100 hover:bg-red-200 text-red-800",
      manager: "bg-purple-100 hover:bg-purple-200 text-purple-800",
      user: "bg-blue-100 hover:bg-blue-200 text-blue-800",
    };
    return (
      <Badge
        className={`${
          styles[role.toLowerCase()] || styles.user
        } cursor-pointer`}
        variant="outline"
      >
        {role}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      Active: "bg-green-100 hover:bg-green-200 text-green-800",
      Inactive: "bg-red-200 hover:bg-red-300 text-gray-800",
      Suspended: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
    };
    return (
      <Badge className={`${styles[status]} cursor-pointer`} variant="outline">
        {status}
      </Badge>
    );
  };

  console.log(users)

  if (isLoading) {
    return <LoadinPage />;
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </div>
            <CreateUserDialog onSuccess={refetchUsers} />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Provincial Office</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src="/api/placeholder/32/32"
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{user.province ? user.province : "Not available"}</TableCell>
                    <TableCell>
                      {getStatusBadge(user.status == 1 ? "Active" : "Inactive")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isResetting}
                          >
                            {isResetting ? (
                              <Loader2 className="h-4 w-4" />
                            ) : (
                              <MoreVertical className="h-4 w-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* <DropdownMenuItem className="flex items-center gap-2">
                            <UserCog className="h-4 w-4" />
                            Edit Profile
                          </DropdownMenuItem> */}
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              className="flex w-full items-center gap-2 px-2 py-1.5"
                              onClick={() => {
                                setChangeRoleDialog({
                                  open: true,
                                  user: user,
                                });
                                console.log();
                              }}
                            >
                              <Shield className="h-4 w-4" />
                              Change Role
                            </DropdownMenuTrigger>
                          </DropdownMenu>
                          <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to reset this user's password?"
                                )
                              ) {
                                resetPassword(user.id);
                              }
                            }}
                          >
                            <Lock className="h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className="flex items-center gap-2 text-yellow-600"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to ${
                                    user.status === 1 ? "suspend" : "activate"
                                  } this user?`
                                )
                              ) {
                                toggleUserStatus({
                                  userId: user.id,
                                  isActive: user.status === 1 ? 0 : 1,
                                });
                              }
                            }}
                            disabled={isTogglingStatus}
                          >
                            {user.status === 1 ? (
                              <>
                                <Ban className="h-4 w-4" />
                                Suspend User
                              </>
                            ) : (
                              <>
                                <Shield className="h-4 w-4" />
                                Activate User
                              </>
                            )}
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="flex items-center gap-2 text-red-600"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this user?"
                                )
                              ) {
                                deleteUser(user.id);
                              }
                            }}
                          >
                            <UserX className="h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Items per page:
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {itemsPerPage}
                  <ChevronLeft className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[5, 10, 20, 50].map((value) => (
                  <DropdownMenuItem
                    key={value}
                    onClick={() => {
                      setItemsPerPage(value);
                      setCurrentPage(1);
                    }}
                  >
                    {value} items
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>

      <ResetPasswordDialog
        open={resetPasswordDialog.open}
        onOpenChange={(open) =>
          setResetPasswordDialog((prev) => ({ ...prev, open }))
        }
        newPassword={resetPasswordDialog.password}
        hashedPassword={resetPasswordDialog.hashedPassword}
      />

      <ChangeRoleDialog
        open={changeRoleDialog.open}
        onOpenChange={(open) =>
          setChangeRoleDialog((prev) => ({ ...prev, open }))
        }
        user={changeRoleDialog.user}
        userTypes={lookupData?.userTypes || []}
        provinces={lookupData?.provinces || []}
        onSubmit={updateRole}
      />
    </>
  );
};

export default UserTable;
