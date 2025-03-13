"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { useChecklist } from "@/hooks/provincialHooks/useChecklists";

const SolemnizingOfficersDialog = ({ application, onUpdate, isUpdating }) => {
  const [open, setOpen] = useState(false);
  const [dialogHeight, setDialogHeight] = useState("h-[50vh]");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [localChecklistItems, setLocalChecklistItems] = useState([]);

  const {
    checklistItems,
    isLoading,
    isError,
    error,
    updateChecklistItem,
    isUpdating: isUpdatingChecklist,
  } = useChecklist(application?.id);

  useEffect(() => {
    if (checklistItems && checklistItems.length > 0) {
      setLocalChecklistItems(checklistItems);
    }
  }, [checklistItems]);

  if (isError) {
    console.log("ERROR FETCHING CHECKLIST?: ", checklistItems);
  }

  const categoryMap = {
    1: "solemnizing-officers",
    2: "solemnizing-officers",
    3: "solemnizing-officers",
    4: "solemnizing-officers",
    5: "solemnizing-officers",
    6: "solemnizing-officers",
    7: "solemnizing-officers",
    8: "heads-bishops-presidents-founders",
    9: "heads-bishops-presidents-founders",
    10: "heads-bishops-presidents-founders",
    11: "heads-bishops-presidents-founders",
    12: "heads-bishops-presidents-founders",
    13: "heads-bishops-presidents-founders",
    14: "heads-bishops-presidents-founders",
    15: "heads-bishops-presidents-founders",
    16: "heads-bishops-presidents-founders",
    17: "imams",
    18: "imams",
    19: "imams",
    20: "imams",
    21: "imams",
    22: "imams",
    23: "tribal-heads-chieftains",
    24: "tribal-heads-chieftains",
    25: "tribal-heads-chieftains",
    26: "tribal-heads-chieftains",
    27: "tribal-heads-chieftains",
  };

  const getItemCategory = (item) => {
    return categoryMap[item.checklist_id];
  };

  const groupedItems = localChecklistItems.reduce(
    (acc, item) => {
      const category = getItemCategory(item);
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    },
    {
      "solemnizing-officers": [],
      "heads-bishops-presidents-founders": [],
      imams: [],
      "tribal-heads-chieftains": [],
    }
  );

  const handleAccordionClick = (accordionValue) => {
    if (activeAccordion === accordionValue) {
      setActiveAccordion(null);
      setDialogHeight("h-[50vh]");
    } else {
      setActiveAccordion(accordionValue);
      setDialogHeight("h-[90vh]");
    }
  };

  const handleCheckboxChange = (checklistId, isChecked, currentRemarks) => {
    setLocalChecklistItems((prev) =>
      prev.map((item) =>
        item.checklist_id === checklistId
          ? { ...item, isChecked: !item.isChecked }
          : item
      )
    );

    updateChecklistItem({
      applicationId: application?.id,
      checklistId,
      isChecked: !isChecked,
      remarks: currentRemarks,
    });
  };

  const handleRemarksChange = (checklistId, remarks) => {
    setLocalChecklistItems((prev) =>
      prev.map((item) =>
        item.checklist_id === checklistId ? { ...item, remarks } : item
      )
    );
  };

  const handleSaveRemarks = (checklistId, isChecked, remarks) => {
    updateChecklistItem({
      applicationId: application?.id,
      checklistId,
      isChecked,
      remarks,
    });
  };

  const renderChecklistTable = (items) => {
    if (!items || items.length === 0) {
      return (
        <p className="text-gray-500 py-4">
          No checklist items found for this category.
        </p>
      );
    }

    return (
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Requirement</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.checklist_id}>
              <td className="px-4 py-2">{item.item_name}</td>
              <td className="px-4 py-2">
                <Checkbox
                  id={`checkbox-${item.checklist_id}`}
                  checked={item.isChecked}
                  onCheckedChange={() =>
                    handleCheckboxChange(
                      item.checklist_id,
                      item.isChecked,
                      item.remarks
                    )
                  }
                  className="mt-0.5"
                />
              </td>
              <td className="px-4 py-2 w-1/2">
                <Textarea
                  id={`remarks-${item.checklist_id}`}
                  rows={3}
                  placeholder="Enter remarks here"
                  value={item.remarks || ""}
                  onChange={(e) =>
                    handleRemarksChange(item.checklist_id, e.target.value)
                  }
                  onBlur={(e) =>
                    handleSaveRemarks(
                      item.checklist_id,
                      item.isChecked,
                      e.target.value
                    )
                  }
                  className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <CheckSquare className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className={`max-w-6xl ${dialogHeight} overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 ms-3">
            <CheckSquare className="h-6 w-6" />
            <span>Requirements Checklist</span>
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : isError ? (
          <div className="text-red-500 p-4">
            Error loading checklist items. Please try again.
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="solemnizing-officers">
              <AccordionTrigger
                className="px-4 font-medium"
                onClick={() => handleAccordionClick("solemnizing-officers")}
              >
                Solemnizing Officers (SO) Requirements
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                {renderChecklistTable(groupedItems["solemnizing-officers"])}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="heads-bishops-presidents-founders">
              <AccordionTrigger
                className="px-4 font-medium"
                onClick={() =>
                  handleAccordionClick("heads-bishops-presidents-founders")
                }
              >
                Heads/Bishops/Presidents/Founders
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                {renderChecklistTable(
                  groupedItems["heads-bishops-presidents-founders"]
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="imams">
              <AccordionTrigger
                className="px-4 font-medium"
                onClick={() => handleAccordionClick("imams")}
              >
                Imams
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {renderChecklistTable(groupedItems["imams"])}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tribal-heads-chieftains">
              <AccordionTrigger
                className="px-4 font-medium"
                onClick={() => handleAccordionClick("tribal-heads-chieftains")}
              >
                Tribal Heads/Chieftains
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {renderChecklistTable(groupedItems["tribal-heads-chieftains"])}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <DialogFooter className="mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SolemnizingOfficersDialog;
