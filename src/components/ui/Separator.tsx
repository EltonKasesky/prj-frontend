interface SeparatorProps {
    size?: "small" | "medium" | "large";
}

export default function Separator({ size = "medium" }: SeparatorProps) {
    const heights = {
        small: "h-[20%]",
        medium: "h-[40%]",
        large: "h-[70%]",
    };

    return (
        <>
            <div className={`w-px bg-gray-300 mx-3 ${heights[size]}`}></div>
        </>
    );
}
