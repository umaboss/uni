const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
       bg-[var(--brand-color)] 
        text-white
        rounded-tl-[30px] 
        rounded-tr-[30px] 
        rounded-br-[30px]
        px-5 py-2 
        font-medium 
        text-sm 
        cursor-pointer 
        shadow-md 
        transition-all 
        duration-200 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
