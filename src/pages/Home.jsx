import { useSelector } from "react-redux";
import FlexContainer from "../components/ui/Flexcontainer";
import {
  SectionPanel,
  SectionShoes,
  SkinCare,
} from "../components/ui/sectionPanel";
import CategoryList from "../components/ui/CategoryList";


const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <FlexContainer />
      <div className="m-12 ">
        <h1>Hi , {(user && user.displayName) || "Customer"} </h1>

        <h1 className="flex justify-center items-center mt-10 underline  ">
          <button className="px-6 py-2  border-black border  hover:bg-black  hover:text-white    ">
            Shop
          </button>
        </h1>

        <SectionPanel category="mens-shirts" />
        <h1 className="flex justify-center items-center mt-10 underline">
          Mens Shoes
        </h1>
      
        <SectionShoes category={"skin-care"} />
        <CategoryList/>
      </div>
    </>
  );
};
export default Home;
