import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() { 
    return (
        <Accordion type="single" className="mx-auto w-full sm:w-2/3 lg:w-1/2" collapsible>
            <AccordionItem value="What will be the main purpose of this project?">
                <AccordionTrigger>What will be the main purpose of this project?</AccordionTrigger>
                <AccordionContent>
                    The main purpose of this project will be to provide a comprehensive platform for mental health journaling, community support, and personalized guidance. It will aim to empower individuals on their mental health journey by allowing them to document their experiences, connect with others facing similar challenges, access relevant resources, and receive personalized support and guidance.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="How will the journaling feature work?">
                <AccordionTrigger>How will the journaling feature work?</AccordionTrigger>
                <AccordionContent>
                    The journaling feature will allow users to create and maintain mental health journals where they can document their thoughts, feelings, symptoms, coping strategies, and progress over time. It will include options to track mood, set goals, and reflect on personal experiences. Users will be able to use the journaling feature as a tool for self-reflection, self-care, and tracking their mental health journey.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="How will user data be protected and anonymized?">
                <AccordionTrigger>How will user data be protected and anonymized?</AccordionTrigger>
                <AccordionContent>
                    User data will be protected through industry-standard encryption protocols to ensure its security. Additionally, all data shared within the app will be anonymized, meaning that users' identities will never be revealed when data is collected for analysis or community matching purposes. This will ensure the privacy and confidentiality of users' information.
                </AccordionContent>
            </AccordionItem>
            {/* Add more common questions and answers here */}
        </Accordion>
    );
}
