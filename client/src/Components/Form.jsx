import { useState } from "react";
import { motion } from "framer-motion";

const Form = () => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="w-full">
      <form className="flex flex-col w-full p-0 transition-all items-center">
        <div
          className={`px-4 py-4 ${
            focused
              ? "bg-white h-[120px] border-b-4 border-green-400"
              : "bg-gray-50 h-[60px]"
          } rounded-xl text-xl shadow-[0_1px_3px_1px_rgba(0,0,0,0.1)] focus-within:shadow-md z-10 transition-all duration-500
          w-full 
          flex flex-col
          `}
        >
          <textarea
            placeholder="Enter your todo"
            className=" outline-none peer w-full h-full bg-transparent flex-1"
            //   rows={1}
            onFocus={() => setFocused(true)}
            // onBlur={() => setFocused(false)}
          />
          <div
            className={`flex w-full h-fit ${
              focused ? "block" : "hidden"
            } gap-8`}
          >
            <input type="date" className="text-sm text-gray-500 outline-none" />
            <input type="time" className="text-sm text-gray-500" />
          </div>
        </div>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "tween" }}
            className=" bg-green-100 border-2 border-t-0 border-green-400 w-[98%] p-4 rounded-b-xl z-[5] shadow-sm"
          >
            <button className="p-2 bg-green-400 w-fit">Add</button>
          </motion.div>
        )}
      </form>
    </div>
  );
};
export default Form;
