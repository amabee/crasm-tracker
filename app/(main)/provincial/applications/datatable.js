import React, { useState, useMemo } from "react";
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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash,
  Plus,
  CheckSquare, 
  Loader2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useApplication } from "@/hooks/provincialHooks/useApplications";
import { formatDate, formatDateTime } from "@/lib/utils";
import ApplicationViewDialog from "./applicationViewDialog";
import ApplicationUpdateDialog from "./applicationUpdateDialog";
import { useSession } from "next-auth/react";
import AddApplicationModal from "./applicationCreationDialog";
import ApplicationChecklistDialog from "./applicationChecklistDialog";

const DataTable = () => {
  const { data: session, status } = useSession();
  const {
    applications,
    createApplication,
    isLoading,
    isError,
    isCreating,
    updateApplication,
    isUpdating,
    refetchApplications,
  } = useApplication(null, session?.user?.provinceId);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const computedData = useMemo(() => {
    let result = [...(applications || [])];

    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [applications, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Complete: "bg-green-100 hover:bg-green-200 text-green-800",
      "In Progress": "bg-yellow-100 hover:bg-yellow-200 text-yellow-900",
    };
    return (
      <Badge className={`${styles[status]} cursor-pointer`} variant="outline">
        {status}
      </Badge>
    );
  };

  if (isLoading || status === "loading") {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-red-500">
            Error loading data: {isError.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalPages = Math.ceil(computedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = computedData.slice(startIndex, endIndex);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Applications Overview</CardTitle>
            <CardDescription>Manage and track all applications</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AddApplicationModal
                  onAdd={createApplication}
                  isAdding={isCreating}
                  onRefetchData={refetchApplications}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new application record</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
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
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedRows.size === currentData.length}
                    onChange={() => {
                      if (selectedRows.size === currentData.length) {
                        setSelectedRows(new Set());
                      } else {
                        setSelectedRows(
                          new Set(currentData.map((item) => item.id))
                        );
                      }
                    }}
                  />
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("fullname")}
                    className="h-8"
                  >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Province</TableHead>
                <TableHead>Application Type</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Next Process</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((application, index) => (
                <TableRow key={application.id} className="group">
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedRows.has(application.id)}
                      onChange={() => handleRowSelect(application.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {application.fullname}
                  </TableCell>
                  <TableCell>{application.province}</TableCell>
                  <TableCell>{application.typeOfApplication}</TableCell>
                  <TableCell>
                    {formatDateTime(application.dateCreated)}
                  </TableCell>
                  <TableCell> 
                    <Badge variant="outline">
                      {application.awaitingProcess}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ApplicationViewDialog
                              applicationId={application.id}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ApplicationChecklistDialog
                              applicationId={application}
                              application={application}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Checklist</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ApplicationUpdateDialog
                              application={applications}
                              index={index}
                              onUpdate={updateApplication}
                              isUpdating={isUpdating}
                              onRefetchData={refetchApplications}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Application</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
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
          <span className="text-sm text-muted-foreground">Items per page:</span>
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
          <span className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, computedData.length)}{" "}
            of {computedData.length}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DataTable;
