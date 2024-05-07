import Image from "next/image";

export default function LeftRight() {
    return (
        <div>
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
