import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/StoreApi";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineShoppingBag } from "react-icons/md";
// mens
export const SectionPanel = ({ category }) => {
  const {
    isPending,
    isError,
    data: products = [],
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getData(category),
  });

  if (isPending) {
    return <h1 className="text-center text-2xl font-bold">Loading...</h1>;
  }
  if (isError) {
    return (
      <h1 className="text-center text-2xl text-red-500">
        Error loading data 😢
      </h1>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  console.log(products);

  return (
    <div className="w-full mt-8 overflow-hidden ">
      <Slider {...settings}>
        {products.map((product) => (
          <div
            className="bg-zinc-100 shadow-lg rounded-lg p-4 w-60 text-center transform hover:scale-105 transition duration-300 "
            key={product.id}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-60 w-full  object-contain rounded-md"
            />
            <p className="text-lg font-semibold mt-2">{product.title}</p>
            <h1 className="text-gray-500">{product.brand}</h1>
            <div className="flex justify-end sm:justify-center mt-4">
              <MdOutlineShoppingBag className=" text-4xl text-zinc-800 hover:bg-black hover:text-white p-2 rounded-lg transition duration-300 cursor-pointer" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
// for mens shoes
export const SectionShoes = ({ category }) => {
  const {
    isError,
    isPending,
    data: shoes = [],
  } = useQuery({
    queryKey: ["shoes", category],
    queryFn: () => getData(category),
  });
  if (isPending) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Oops there is an error </h1>;
  }
  // slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="w-full mt-8 overflow-hidden">
        <Slider {...settings}>
          {shoes.map((product) => (
            <div
              className="bg-zinc-100 shadow-lg rounded-lg p-4 w-60 text-center transform hover:scale-105 transition duration-300"
              key={product.id}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-60 w-full  object-contain rounded-md"
              />
              <p className="text-lg font-semibold mt-2">{product.title}</p>
              <h1 className="text-gray-500">{product.brand}</h1>
              <div className="flex justify-end sm:justify-center mt-4">
              <MdOutlineShoppingBag className=" text-4xl text-zinc-800 hover:bg-black hover:text-white p-2 rounded-lg transition duration-300 cursor-pointer" />
            </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
export const SkinCare = ({ category }) => {
  const {
    isError,
    isPending,
    data: skin = [],
  } = useQuery({
    queryKey: ["skin-care", category],
    queryFn: () => getData(category),
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error is occured</h1>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="w-full mt-8 overflow-hidden">
        <Slider {...settings}>
          {skin.map((product) => (
            <div
              className="bg-zinc-100 shadow-lg rounded-lg p-4 w-60 text-center transform hover:scale-105 transition duration-300 "
              key={product.id}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-60 w-full  object-contain rounded-md"
              />
              <p className="text-lg font-semibold mt-2">{product.title}</p>
              <h1 className="text-gray-500">{product.brand}</h1>
              <div className="flex justify-end sm:justify-center mt-4">
              <MdOutlineShoppingBag className=" text-4xl text-zinc-800 hover:bg-black hover:text-white p-2 rounded-lg transition duration-300 cursor-pointer" />
            </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
