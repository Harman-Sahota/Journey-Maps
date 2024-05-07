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
    <div className="flex flex-col min-h-screen p-11">
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

      <h2 className="text-4xl mt-20 text-center font-bold" id="howitworks">How It Works</h2>
      <h3 className="text-center text-xl mt-4 ml-5 text-muted-foreground">
        Our Product is currently under development, but here's a glimpse of its functionality!
      </h3>


      <div className="flex flex-col md:flex-row items-center justify-center mt-10">
        <div className="max-w-lg">
          <h3 className="text-xl font-semibold mb-4">Login and Timeline Overview</h3>
          <p className="text-gray-800 dark:text-gray-500">
            Users can log in with their Discord accounts to access the product. They'll find their timeline upon logging in, representing their journey to overcome life challenges. Each timeline corresponds to a specific problem users aim to solve. Additionally, users can connect with others facing similar struggles and join our Discord server
          </p>
        </div>
        <Image src="/stairs.png" width={300} height={300} className="rounded-lg md:ml-8 mt-4 md:mt-0 dark:brightness-75" alt="Stairs Symbolzing person making progres" />
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center justify-center mt-8">
        <div className="max-w-lg">
          <h3 className="text-xl font-semibold mb-4">Adding Journal Entries and Progress Tracking</h3>
          <p className="text-gray-800 dark:text-gray-500">
            Users can add entries to their timeline to progress. Negative entries may regress the timeline slightly, while positive ones move them closer to overcoming challenges. They can mark timelines as resolved anytime. The app's interface enables easy entry addition and offers visual cues for tracking progress effectively.
          </p>
        </div>
        <Image src="/journal.jpg" width={300} height={300} className="rounded-lg md:mr-8 mt-4 md:mt-0 dark:brightness-75" alt="A journal diary placed in an  aesthetic environment" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mt-8">
        <div className="max-w-lg">
          <h3 className="text-xl font-semibold mb-4">Personalization and Community Engagement</h3>
          <p className="text-gray-800 dark:text-gray-500">
            Users can create multiple timelines to track various life challenges, with their history easily accessible. This allows for managing different aspects of their mental health journey simultaneously. Additionally, users can anonymously share their data, contributing to the collective knowledge base and fostering community support.
          </p>
        </div>
        <Image src="/community.jpg" width={300} height={300} className="rounded-lg md:ml-8 mt-4 md:mt-0 dark:brightness-75" alt="A hand reaching another: signifying community support" />
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center justify-center mt-8">
        <div className="max-w-lg">
          <h3 className="text-xl font-semibold mb-4">Guidance through Alternate Timelines</h3>
          <p className="text-gray-800 dark:text-gray-500">
            The platform introduces alternate timelines using machine learning and NLP, providing personalized guidance based on aggregated user experiences. These timelines dynamically illustrate potential outcomes of user actions, leveraging others' experiences to guide users through their journey.
          </p>
        </div>
        <Image src="/guidance.jpg" width={300} height={300} className="rounded-lg md:mr-8 mt-4 md:mt-0 dark:brightness-75" alt="a duck guiding another duck through a body of water" />
      </div>



    </div>
  );
}