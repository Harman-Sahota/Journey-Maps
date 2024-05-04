import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow flex justify-start items-center">
        <div className="max-w-md ml-8">
          <p className="text-sm text-gray-600 dark:text-gray-300">More Than A Journal</p>
          <h1 className="text-5xl font-bold mt-4">CREATE YOUR OWN TIMELINE TO OVERCOME LIFE PROBLEMS</h1>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-500">
            Empower yourself with our innovative mental health journaling and community platform. 
            Document your journey, connect with others, and find guidance from shared experiences. 
            Join a supportive community where your voice is heard and your path to wellness is shaped by collective wisdom.
          </p>
          <Button className="mt-4 rounded dark:text-white">Get Started</Button>
        </div>
      </div>

    </div>
  );
}
