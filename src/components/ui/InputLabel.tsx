interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function InputLabel({ label, ...props }: InputLabelProps) {
    return (
        <label className="flex flex-col gap-2 text-main-color dark:text-main-color-dark text-md">
            {label}

            <input
                {...props}
                className="p-1.5 pl-3 outline outline-zinc-400 dark:outline-zinc-500 rounded-sm text-md text-main-color dark:text-main-color-dark
                    focus:outline-2 focus:outline-main-focus dark:focus:outline-main-focus-dark focus:text-main-color focus:dark:text-main-color-dark
                    bg-secondary-bg dark:bg-secondary-bg-dark/30 text-md"
            />
        </label>
    );
}
