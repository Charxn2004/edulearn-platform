import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is this?</AccordionTrigger>
          <AccordionContent>
            This is a platform designed to help you learn new skills through various
            courses and resources.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How can I get started?</AccordionTrigger>
          <AccordionContent>
            You can get started by creating an account and browsing our available
            courses. Simply sign up and choose a course that interests you.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is there a free trial?</AccordionTrigger>
          <AccordionContent>
            Yes, we offer a free trial for a limited time to let you experience
            our platform.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            What is the cost after the free trial?
          </AccordionTrigger>
          <AccordionContent>
            After the free trial, there is a subscription fee. Please check our
            pricing page for the most current cost information.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>How do I get help?</AccordionTrigger>
          <AccordionContent>
            You can get help by visiting our support page, sending us an email,
            or checking out our community forums.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}