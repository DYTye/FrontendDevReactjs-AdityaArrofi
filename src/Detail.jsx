import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer.jsx";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function detail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    async function fetchDetail() {
      const response = await fetch(
        `https://6a3faf1c9b6d371e83810e01.mockapi.io/restorant/${id}`,
      );
      const data = await response.json();
      console.log(data);
      setRestaurant(data);
    }
    fetchDetail();
  }, [id]);

  if (!restaurant) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-3 mx-auto my-auto">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-950 rounded-full animate-spin"></div>
        <p className="text-xl font-bold  animate-pulse">Loading Data.... </p>
      </div>
    );
  }

  console.log(restaurant.reviews);
  return (
    <div>
      <div className="flex flex-col justify-center gap-5 max-w-3xl my-5 mx-auto">
        <div className="flex flex-col border-4 p-5 rounded-xl shadow-lg shadow-black/40">
          <div className="w-full mb-5">
            <img
              src={restaurant?.photos}
              alt=""
              className="w-full h-100 object-cover rounded-md"
            />
          </div>
          <p className="text-4xl">{restaurant.name}</p>
          <div className="flex text-lg my-1">
            {Array.from({ length: 5 }, (_, index) => {
              if (index < Math.round(restaurant?.rating)) {
                return <FaStar key={index} />;
              } else {
                return <FaRegStar key={index} />;
              }
            })}
          </div>
          <p className="text-lg ring-2 p-2 rounded-md">
            {restaurant.description}
          </p>
        </div>
        <div className="my-5">
          <p>Location:</p>
          <div className="flex justify-center">
            <iframe
              src={restaurant?.map}
              className="aspect-video max-w-xl my-5 rounded-xl"
            ></iframe>
          </div>
        </div>

        {restaurant.reviews?.map((item) => {
          return (
            <div key={item.index}>
              <div className="flex gap-2 items-center">
                <img
                  src={item.image}
                  alt=""
                  className="rounded-full aspect-square object-cover h-12"
                />
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <p>{item.name}</p>
                    <p>-</p>
                    <div className="flex text-lg my-1">
                      {Array.from({ length: 5 }, (_, index) => {
                        if (index < Math.round(item?.rating)) {
                          return <FaStar key={index} />;
                        } else {
                          return <FaRegStar key={index} />;
                        }
                      })}
                    </div>
                  </div>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer></Footer>
    </div>
  );
}
export default detail;
