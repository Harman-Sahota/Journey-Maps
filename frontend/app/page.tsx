import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
        <div className="flex-grow flex justify-start items-center">
          <div className="max-w-xl ml-12">
            <p className="text-sm text-gray-600 dark:text-gray-300">More Than A Journal</p>
            <h1 className="text-5xl font-bold mt-4">YOUR TIMELINE TO OVERCOME LIFE PROBLEMS</h1>
            <p className="mt-4 text-lg text-gray-800 dark:text-gray-500">
              Empower yourself with our innovative mental health journaling and community platform.
              Document your journey, connect with others, and find guidance from shared experiences.
              Join a supportive community where your voice is heard.
            </p>
            <Button className="mt-4 rounded dark:text-white">Get Started</Button>
          </div>
          <img src="./paths.png" className="hidden md:block w-5/12 rounded h-auto ml-24 border-spacing-4 stroke-slate-700 p-4" alt="Paths Image"></img>
        </div>
    </div>
  );
}
