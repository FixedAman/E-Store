import FlexContainer from "../components/ui/Flexcontainer";
import SectionPanel from "../components/ui/sectionPanel";

const Home = () => {
  return (
    <>
      <FlexContainer />
      <h1 className="flex justify-center items-center">Mens T-shirts</h1>
      <SectionPanel category="mens-shirts" />
    </>
  );
};
export default Home;
