import { useSelector } from "react-redux";
import FlexContainer from "../components/ui/Flexcontainer";
import {
  SectionPanel,
  SectionShoes,
  SkinCare,
} from "../components/ui/sectionPanel";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <FlexContainer />
      <div className="m-12 ">
        <h1>Hi , {(user && user.displayName) || "Customer"} </h1>
        <h1 className="flex justify-center items-center mt-10 underline">
          Mens T-shirts
        </h1>
        <SectionPanel category="mens-shirts" />
        <h1 className="flex justify-center items-center mt-10 underline">
          Mens Shoes{" "}
        </h1>

        <SectionShoes category={"mens-shoes"} />
        <h1 className="flex justify-center items-center mt-10  underline">
          Mens Shoes{" "}
        </h1>
        <SkinCare category={"skin-care"} />
      </div>
    </>
  );
};
export default Home;
