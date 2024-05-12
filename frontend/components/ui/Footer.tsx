import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-muted-foreground">
                    Made with {" "}
                    <Heart className="inline-block" size={16} /> {" "}
                    by {" "}
                    <a
                        href="https://www.linkedin.com/in/harmansahota/"
                        target="_blank"
                        className='text-muted-foreground'
                        rel="noopener noreferrer"
                    >
                        Harman Sahota
                    </a>
                </p>
            </div>
        </footer>
    );
}

