const Button = ({ children, onClick, ...otherProps }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 px-4 text-lg bg-green-400 w-fit text-white rounded-full overflow-hidden shadow-md
        before:content-[''] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-[0] 
        before:bg-green-500 before:transition-all before:duration-500 before:ease-in-out before:scale-x-0 
        before:hover:scale-x-100 before:origin-left
      `}
      {...otherProps}
    >
      <span className="relative z-[1]">{children}</span>
    </button>
  );
};

export default Button;
