import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [dataApi, setDataApi] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://6a3faf1c9b6d371e83810e01.mockapi.io/restorant",
      );
      const data = await response.json();
      console.log(data[0]);
      setDataApi(data);
    }
    fetchData();
  }, []);

  return (
    <div className=" flex justify-center flex-col gap-5 m-5">
      <div className="flex flex-col justify-start">
        <p className="text-6xl">Restaurant</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          esse.
        </p>
      </div>

      <hr />
      <div className="flex items-center gap-4">
        <p>Filter by:</p>
        <div>
          <p>Open Now</p>
        </div>
        <div>
          <p>Price</p>
        </div>
        <div>
          <p>Category</p>
        </div>
        <div className="ring-2 rounded-md">
          <p className="p-3">Clear All</p>
        </div>
      </div>
      <hr />

      <div className="grid grid-cols-4 gap-4">
        {dataApi?.map((item) => {
          return (
            <div key={item.id} className="flex flex-col gap-2 m-2">
              <img src={item?.photos} alt="" className="aspect-square" />
              <p className="text-2xl">{item?.name}</p>
              <p>{item?.rating} </p>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <p className="font-light">{item?.categories?.join(",")}</p>
                  <p>-</p>
                  <p className="font-light">{item?.priceRange}</p>
                </div>
                <p>{item?.isOpen ? "open" : "close"}</p>
              </div>
              <div className="bg-blue-900 text-white text-bold">
                <div className="p-3 text-center">
                  <Link to={`/restaurant/${item.id}`} >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
