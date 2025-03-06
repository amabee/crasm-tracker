  "use client";
  import React, { useState } from "react";
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
  import { Label } from "@/components/ui/label";
  import { CheckSquare, Loader2 } from "lucide-react";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Textarea } from "@/components/ui/textarea"; // Import Textarea

  const SolemnizingOfficersDialog = ({ application, onUpdate, isUpdating }) => {
    const [open, setOpen] = useState(false);

    const requirementIds = [
      "form",
      "pictures",
      "appointment",
      "endorsement",
      "certificate",
      "icard",
      "payment",
    ];

    const initialChecklistItems = requirementIds.reduce((acc, id) => {
      acc[id] = application?.[`${id}Submitted`] || false;
      return acc;
    }, {});

    const [checklistItems, setChecklistItems] = useState(initialChecklistItems);

    const initialRemarks = requirementIds.reduce((acc, id) => {
      acc[id] = application?.[`${id}Remarks`] || "";
      return acc;
    }, {});

    const [remarks, setRemarks] = useState(initialRemarks);

    const handleCheckboxChange = (id) => {
      setChecklistItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    const handleRemarksChange = (id, value) => {
      setRemarks((prev) => ({
        ...prev,
        [id]: value,
      }));
    };

    const requirements = [
      {
        id: "form",
        label:
          "Accomplished application form (OCRG-SO Form No. 1) in triplicate copies, subscribed and sworn to a person authorized to administer oath with affixed documentary stamp",
      },
      {
        id: "pictures",
        label:
          "Three (3) copies of colored ID pictures (2x2) with white background taken not more than a month ago from the date of application. Pictures should not be computer generated to preserve its quality. In such cases the person is using eyeglasses, it should be removed to have a clear image of the applicant. The back of the ID picture should contain the signature of the applicant.",
      },
      {
        id: "appointment",
        label:
          "A machine copy of appointment as priest, head, founder, bishop, pastor and minister of the religion or religious sect.",
      },
      {
        id: "endorsement",
        label:
          "Proper endorsement/designation/recommendation from the head of religion or religious sect issued within a period of three (3) months from application which should indicate the following details: the full name, nationality, and complete address of the applicant; the location of the church, temple, chapel, mosque, synagogue, and other places of worship where the applicant regularly performs rites; and the extent of the applicant's territorial jurisdiction.",
      },
      {
        id: "certificate",
        label:
          "For first time applicants, a certified True Copy of Certificate of Live Birth or a photocopy of the SO's Philippine Passport or Philippine Identification (PhilID) card of the SO to be presented with the original document of such photocopy.",
      },
      {
        id: "icard",
        label:
          "I-Card issued by the Commission on Immigration and Deportation (CID), in case the applicant is a citizen of a foreign country.",
      },
      {
        id: "payment",
        label: "Proof of payment of registration fee.",
      },
    ];

    const [dialogHeight, setDialogHeight] = useState("h-[50vh]");
    const [activeAccordion, setActiveAccordion] = useState(null);
    
    const handleAccordionClick = (accordionValue) => {
      if (activeAccordion === accordionValue) {
        setActiveAccordion(null);
        setDialogHeight("h-[50vh]");
      } else {
        setActiveAccordion(accordionValue);
        setDialogHeight("h-[90vh]");
      }
    };

    const handleSubmit = () => {
      const dataToUpdate = { ...checklistItems };
      Object.keys(remarks).forEach((key) => {
        dataToUpdate[`${key}Remarks`] = remarks[key];
      });

      onUpdate({
        id: application?.id,
        data: dataToUpdate,
      });
      setOpen(false);
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <CheckSquare className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        {/* Adjusting Dialog Height Here: */}
        {/* h-[30vh]: Sets the initial height of the dialog to 30% of the viewport height. */}
        {/* The dialog height will be set to h-screen (full screen height) when an accordion is opened. */}
        <DialogContent className={`max-w-6xl ${dialogHeight} overflow-y-auto`}>
          <DialogHeader>
            {/* Replaced Title and Removed Description */}
            <DialogTitle className="flex items-center space-x-2 ms-3">
              <CheckSquare className="h-6 w-6" />
              <span>Checklist</span>
            </DialogTitle>
          </DialogHeader>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="solemnizing-officers">
              <AccordionTrigger
                className="px-4 font-medium"
                onClick={() => handleAccordionClick("solemnizing-officers")}
              >
                Solemnizing Officers (SO) Requirements
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <table className="w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Requirement</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements.map((requirement) => (
                      <tr key={requirement.id}>
                        <td className="px-4 py-2">{requirement.label}</td>
                        <td className="px-4 py-2">
                          <Checkbox
                            id={requirement.id}
                            checked={checklistItems[requirement.id]}
                            onCheckedChange={() =>
                              handleCheckboxChange(requirement.id)
                            }
                            className="mt-0.5"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Textarea
                            id={`remarks-${requirement.id}`}
                            rows={4}
                            placeholder="Enter remarks here"
                            value={remarks[requirement.id] || ""}
                            onChange={(e) =>
                              handleRemarksChange(requirement.id, e.target.value)
                            }
                            className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="heads-bishops-presidents-founders">
              <AccordionTrigger
                className="px-4 font-medium"
                onClick={() => handleAccordionClick("heads-bishops-presidents-founders")}
              >
                Heads/Bishops/Presidents/Founders
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <table className="w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Requirement</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements.map((requirement) => (
                      <tr key={requirement.id}>
                        <td className="px-4 py-2">{requirement.label}</td>
                        <td className="px-4 py-2">
                          <Checkbox
                            id={requirement.id}
                            checked={checklistItems[requirement.id]}
                            onCheckedChange={() =>
                              handleCheckboxChange(requirement.id)
                            }
                            className="mt-0.5"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Textarea
                            id={`remarks-${requirement.id}`}
                            rows={4}
                            placeholder="Enter remarks here"
                            value={remarks[requirement.id] || ""}
                            onChange={(e) =>
                              handleRemarksChange(requirement.id, e.target.value)
                            }
                            className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                <table className="w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Requirement</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements.map((requirement) => (
                      <tr key={requirement.id}>
                        <td className="px-4 py-2">{requirement.label}</td>
                        <td className="px-4 py-2">
                          <Checkbox
                            id={requirement.id}
                            checked={checklistItems[requirement.id]}
                            onCheckedChange={() =>
                              handleCheckboxChange(requirement.id)
                            }
                            className="mt-0.5"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Textarea
                            id={`remarks-${requirement.id}`}
                            rows={4}
                            placeholder="Enter remarks here"
                            value={remarks[requirement.id] || ""}
                            onChange={(e) =>
                              handleRemarksChange(requirement.id, e.target.value)
                            }
                            className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                <table className="w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Requirement</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements.map((requirement) => (
                      <tr key={requirement.id}>
                        <td className="px-4 py-2">{requirement.label}</td>
                        <td className="px-4 py-2">
                          <Checkbox
                            id={requirement.id}
                            checked={checklistItems[requirement.id]}
                            onCheckedChange={() =>
                              handleCheckboxChange(requirement.id)
                            }
                            className="mt-0.5"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Textarea
                            id={`remarks-${requirement.id}`}
                            rows={4}
                            placeholder="Enter remarks here"
                            value={remarks[requirement.id] || ""}
                            onChange={(e) =>
                              handleRemarksChange(requirement.id, e.target.value)
                            }
                            className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Checklist"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  export default SolemnizingOfficersDialog;
