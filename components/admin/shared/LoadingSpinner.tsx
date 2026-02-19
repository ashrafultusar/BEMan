import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    size?: number;
    className?: string;
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 40,
    className = "",
    text = "Loading...",
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
            <Loader2 className="animate-spin text-blue-600 mb-3" size={size} />
            {text && <p className="text-gray-500 text-sm font-medium">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;
