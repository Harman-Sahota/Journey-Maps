import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart, Users, MessageCircle, Smile } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
      <div className="flex-grow flex justify-start items-center">
        <div className="max-w-xl ml-12 mt-32 md:mt-0 lg:mt-0">
          <p className="text-sm text-gray-600 dark:text-gray-300">More Than A Journal</p>
          <h1 className="text-5xl font-bold mt-4">YOUR TIMELINE TO OVERCOME LIFE PROBLEMS</h1>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-500">
            Empower yourself with our innovative mental health journaling and community platform.
            Document your journey, connect with others, and find guidance from shared experiences.
            Join a supportive community where your voice is heard.
          </p>
          <Button className="mt-4 rounded dark:text-white">Get Started</Button>

        </div>
        <Image src="/paths.png" width={250} height={250} className="hidden md:block w-5/12 rounded h-auto ml-24 border-spacing-4 stroke-slate-700 p-4" alt="People walking on a multiple crosswalk road"></Image>
      </div>

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
    </div>
  );
}