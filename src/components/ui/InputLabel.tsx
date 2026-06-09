interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function InputLabel({ label, ...props }: InputLabelProps) {
    return (
        <label className="flex flex-col gap-1 text-main-color dark:text-main-color-dark text-lg">
            {label}

            <input
                {...props}
                className="p-1 pl-2 outline outline-zinc-400 dark:outline-zinc-100 rounded-sm text-md text-main-color dark:text-main-color-dark
                    focus:outline-2 focus:outline-main-focus dark:focus:outline-main-focus-dark focus:text-main-color focus:dark:text-main-color-dark"
            />
        </label>
    );
}
