"use client";
import SectionContent from "./SectionContent/SectionContent";
import SectionHeaders from "./SectionHeaders/SectionHeaders";
import SectionContentElement from "./SectionContent/SectionContentElement/SectionContentElement";
import ParticipantEssentials from "./SectionContent/ParticipantEssentials/ParticipantEssentials";
import CampBriefing from "./SectionContent/CampBriefing/CampBriefing";
import VatInvoices from "./SectionContent/VatInvoices/VatInvoices";
import RefundsAndCancellations from "./SectionContent/RefundsAndCancellations/RefundsAndCancellations";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import PaymentsForm from "@/components/PaymentsForm/PaymentForm";
import Consequences from "./SectionContent/Consequences/Consequences";

export default function Participant() {
  return (
    <main className="flex flex-col">
      <SectionHeaders />
      <SectionContent>
        <SectionContentElement elementType="form">
          <RegistrationForm />
        </SectionContentElement>
        <SectionContentElement elementType="form">
          <PaymentsForm />
        </SectionContentElement>
        <SectionContentElement elementType="text">
          <ParticipantEssentials />
        </SectionContentElement>
        <SectionContentElement elementType="text">
          <CampBriefing />
        </SectionContentElement>
        <SectionContentElement elementType="text">
          <VatInvoices />
        </SectionContentElement>
        <SectionContentElement elementType="text">
          <RefundsAndCancellations />
        </SectionContentElement>
        <SectionContentElement elementType="text">
          <Consequences />
        </SectionContentElement>
      </SectionContent>
    </main>
  );
}
