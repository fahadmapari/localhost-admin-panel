import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const RegisterClientForm = () => {
  return (
    <div>
      <h3 className="text-3xl font-semibold pb-4 pl-1">Register New Client</h3>

      <Accordion
        type="single"
        collapsible
        className="space-y-4"
        defaultValue="item-1"
      >
        <AccordionItem
          className={cn("border p-4 rounded-xl")}
          value="item-1"
          defaultChecked={true}
        >
          <AccordionTrigger className="text-2xl cursor-pointer">
            Client Account Information
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>

        <AccordionItem
          className={cn("border p-4 rounded-xl")}
          value="item-1"
          defaultChecked={true}
        >
          <AccordionTrigger className="text-2xl cursor-pointer">
            Client Company Information
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RegisterClientForm;
