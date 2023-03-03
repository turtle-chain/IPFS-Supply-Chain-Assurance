import React from "react";
import Typography from "../../atoms/Typography";
import Card from "../../molecules/Card";

const HistoricalInfo = ({ contract }) => {
  const [allCid, setAllCid] = React.useState([]);
  const [allDeliv, setAllDeliv] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      //SHOW CID_COUNT

      const counter = await contract?.cid_count();
      console.log("The counter is: " + counter);

      //SHOW ALL PHOTOS

      const cids = [];
      const delivs = [];
      for (var i = 0; i < counter; i++) {
        const cid = await contract.showcid(i);
        const deliv = await contract.showdeliv(i);
        cids.push(cid);
        delivs.push(deliv);
      }
      setAllCid(cids);
      setAllDeliv(delivs);
      // return [allCid, allDeliv];
    }
    getData();
  }, []);

  return (
    <>
      <Typography
        tag="h2"
        text="Historical Signed Transactions"
        className="text-left"
      />
      <div className="flex flex-wrap">
        {allCid.map((cid, index) => (
          <Card className="flex flex-col bg-slate-300 mr-4 justify-center ">
            <Typography
              tag="h4"
              text={allDeliv[index].slice(0, 20) + "..."}
              className="w-20 "
            />
            <img
              className=""
              alt="Bidding document"
              src={"https://skywalker.infura-ipfs.io/ipfs/" + cid}
              style={{ maxWidth: "150px", margin: "15px" }}
              onError={(e) => {
                e.target.src =
                  "https://skywalker.infura-ipfs.io/ipfs/QmYEGHkGxNut1zGGFiW6ERNgCcV5cwmXcpZgtT2NXUtGDP"; //replacement image imported above
                e.target.style = "padding: 8px; margin: 16px"; // inline styles in html format
              }}
            />
          </Card>
        ))}
      </div>
    </>
  );
};

export default HistoricalInfo;
