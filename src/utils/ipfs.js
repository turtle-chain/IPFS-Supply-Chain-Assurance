import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = "2DxpAMDUxnEwmX2dp5U3YrLjlRZ";
const projectSecretKey = "2a7dbfdfb1d708794a3b7a1c4bac0e4e";

const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
export const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});
