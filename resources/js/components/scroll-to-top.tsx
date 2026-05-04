import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-10 right-10 z-[1000]">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="p-3 rounded-full bg-[#1e1e1e] text-white border border-white/10 shadow-2xl
                            transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:text-black"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </div>
    );
}
