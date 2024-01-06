import React from "react";
import { motion } from "framer-motion"
const Alert = (props) => {
  const capitalize=(word)=>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase()+ lower.slice(1);
  }
  return (
    <motion.span className="mt-4 absolute" style={{height:'50px'}} ainitial={{ width: "10%" }}
    animate={{ width: "100%" }}
    transition={{ duration: 3, origin: 2 }}>
    {props.alert && <div id='' className={`alert bg-info  alert-${props.alert.type} alert-dismissible fade show`} role="alert">
   <span className="bg-green-300 font-bold text-xl p-2 px-4 rounded-md "> <strong >{capitalize(props.alert.type)}</strong>:{props.alert.message}</span>
    </div>}
    </motion.span>
  );
};

export default Alert;
