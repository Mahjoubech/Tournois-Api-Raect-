import { useContext } from "react"; 
import { AppContext } from "../context/AppContext";
export default function Home() {
  const { name } = useContext(AppContext);
  return (
    <>
    <div>
   <h1 className="title">Helllo {name}</h1>
    </div>
    </>
  );
}