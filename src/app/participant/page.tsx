"use client";
import { useState } from "react";
import SectionContent from "./SectionContent/SectionContent";
import SectionHeaders from "./SectionHeaders/SectionHeaders";
import SectionContentElement from "./SectionContent/SectionContentElement/SectionContentElement";
import ParticipantEssentials from "./SectionContent/ParticipantEssentials/ParticipantEssentials";
import CampBriefing from "./SectionContent/CampBriefing/CampBriefing";
import VatInvoices from "./SectionContent/VatInvoices/VatInvoices";
import RefundsAndCancellations from "./SectionContent/RefundsAndCancellations/RefundsAndCancellations";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import PaymentsForm from "@/components/PaymentsForm/PaymentForm";

export default function Participant() {
  const [selectedSection, setSelectedSection] = useState(0);
  return (
    <main className="h-full flex flex-col">
      <SectionHeaders
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <SectionContent selectedSection={selectedSection}>
        <SectionContentElement className="bg-black text-left justify-start">
            <RegistrationForm />
        </SectionContentElement>
        <SectionContentElement className="bg-black text-left justify-start">
            <PaymentsForm />
        </SectionContentElement>
        <SectionContentElement className="flex">
          <ParticipantEssentials />
        </SectionContentElement>
        <SectionContentElement className="flex">
          <CampBriefing />
        </SectionContentElement>
        <SectionContentElement className="flex">
          <VatInvoices />
        </SectionContentElement>
        <SectionContentElement className="flex">
          <RefundsAndCancellations />
        </SectionContentElement>
        <SectionContentElement className="bg-cyan-950 text-right">
          <span>Content 7</span>
        </SectionContentElement>
      </SectionContent>
    </main>
  );
}
