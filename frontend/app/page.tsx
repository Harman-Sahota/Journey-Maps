import Image from "next/image";
import { Heart, Users, MessageCircle, Smile, AlertTriangle } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LeftRight from "@/components/ui/leftright";
import Faq from "@/components/ui/faq";
import ContactForm from "@/components/ui/contactForm";
import Navbar from "@/components/ui/navbar";
import Waitlist from "@/components/ui/waitlist";
import Alert from "@/components/ui/alert";

const values = [
  {
    title: "Resilience",
    description: "Find strength in knowing that someone has been where you are and made it through.",
    icon: <Heart size={32} />,
  },
  {
    title: "Acceptance",
    description: "Understand that everything is temporary and comes to an end.",
    icon: <Users size={32} />,
  },
  {
    title: "Community Support",
    description: "Connect with a supportive community for meaningful connections and conversations.",
    icon: <MessageCircle size={32} />,
  },
  {
    title: "Meaningful Connections",
    description: "Build meaningful connections and have conversations that matter.",
    icon: <Smile size={32} />,
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-start items-center">
        <div className="max-w-xl ml-12 mt-32 md:mt-0 lg:mt-0">
          <p className="text-sm text-gray-600 dark:text-gray-300">More Than Just A Journal: <span className="font-semibold text-sky-600">Gamify overcoming Life Problems</span></p>
          <h1 className="text-5xl font-bold mt-4">YOUR TIMELINE TO OVERCOME LIFE PROBLEMS</h1>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-500">
            Empower yourself with our innovative mental health journaling and community platform.
            Document your journey, connect with others, and find guidance from shared experiences.
            Join a supportive community where your voice is heard.
          </p>
          <Alert />
        </div>
        <Image src="/paths.png" width={250} height={250} className="hidden md:block w-5/12 rounded h-auto ml-24 border-spacing-4 stroke-slate-700 p-4" alt="People walking on a multiple crosswalk road"></Image>
      </div>

      {/* Values Section */}
      <h2 className="text-4xl mt-32 ml-5 text-center font-bold" id="values">Values: What Is Our Product Built On</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 p-6">
        {values.map((value, index) => (
          <Card key={index} className="rounded-md p-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{value.icon}</span>
                  <CardTitle className="text-md">{value.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="mt-6">{value.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}

      </div>
      {/* How It Works Section */}
      <h2 className="text-4xl mt-20 text-center font-bold" id="howitworks">How It Works</h2>
      <h3 className="text-center text-xl mt-4 ml-5 text-muted-foreground">
        Our Product is currently under development, but here's a glimpse of its functionality!
      </h3>

      <LeftRight />

      {/* Faq Section */}
      <h2 className="text-4xl mt-32 ml-5 text-center font-bold" id="faq">FAQ: Questions You Might Have</h2>
      <div className="mt-10">
        <Faq />
      </div>

      {/* Contact Us Section */}
      <div className="mt-10 border rounded p-6 w-full md:w-3/4 sm:w-96 flex flex-col justify-center items-center mx-auto" id="contactus">
        <h2 className="text-4xl p-4 text-center font-bold">Got Any More Questions?</h2>
        <ContactForm />
      </div>

      <h2 className="mt-10 text-2xl p-4 text-center font-bold">Join the Waitlist</h2>
      <p className="text-muted-foreground text-center" id="waitlist">Enter your email to get early access to our new product and exclusive benefits.</p>
      <Waitlist />
    </div>
  );
}