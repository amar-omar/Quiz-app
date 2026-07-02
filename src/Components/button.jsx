export default function Button({ children, className = "", ...props }) {
  const baseClasses ="p-4 m-2 items-center justify-center rounded-3xl  w-[590px] ";

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};