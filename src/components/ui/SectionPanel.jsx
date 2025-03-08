import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/StoreApi";

const SectionPanel = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getData("men-shirts"),
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>error</h1>;
  }
  console.log(data);
  return (
    <>
      <ul>
        <li>THis is elon </li>
      </ul>
    </>
  );
};
export default SectionPanel;
