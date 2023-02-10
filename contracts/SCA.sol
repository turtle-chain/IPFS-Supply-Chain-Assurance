// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SCA {
    address public supplier;

    struct Cert {
        string hashedcid; // signature of CID
        uint256 regcid; // 1: registry added by supplier
    }

    //Only membership can view system data
    mapping(uint256 => address) public carriermember;
    //Quantity of carriers
    uint public totalEntries;
    uint256 public cid_count; //counter to increment id

    mapping(string => Cert) certificates;
    // For each id we obtain the Cid
    mapping(uint256 => string) id_certificates;
    // link between carriers and CIDS
    mapping(uint256 => address) deliveries;

    modifier onlySupplier() {
        require(msg.sender == supplier);
        _;
    }

    function isCarrier(address add) internal view returns (bool) {
        for (uint i = 0; i < totalEntries; i++) {
            if (carriermember[i] == add) {
                return true;
            }
        }
        return false;
    }

    modifier onlyCarrier() {
        for (uint i = 0; i < totalEntries; i++) {
            if (carriermember[i] == msg.sender) {
                require(true);
            }
        }
        require(false);
        _;
    }

    constructor() {
        supplier = msg.sender;
        totalEntries = 0;
    }

    function register(address payable Carrier) public onlySupplier {
        //  carriermember[Carrier] = 1;
        carriermember[totalEntries] = Carrier;
        ++totalEntries;
        return;
    }

    function showCarrierList() public view returns (address[] memory) {
        address[] memory ret = new address[](totalEntries);
        for (uint i = 0; i < totalEntries; i++) {
            ret[i] = carriermember[i];
        }
        return ret;
    }

    /*     function unregister(address payable Carrier) public onlySupplier {
        carriermember[Carrier] = 0;
    } */

    // supplier add CID
    function addcid(string memory Cid) public payable onlySupplier {
        //mapping(uint256 => string) id_certificates;
        certificates[Cid] = Cert({hashedcid: "", regcid: 1});
        id_certificates[cid_count] = Cid;
    }

    //Carrier add signature to cert
    function supply(
        string memory Hashcid,
        string memory Cid,
        address _carrier // signature,message
    ) public payable onlyCarrier {
        require(certificates[Cid].regcid == 1, "supplier");
        //require(carriermember[_carrier]== 1, "registered");

        certificates[Cid] = Cert({hashedcid: Hashcid, regcid: 1});

        deliveries[cid_count] = _carrier;

        cid_count = cid_count + 1;
    }

    function show(
        string memory Cid,
        string memory cidverify
    ) public view returns (bool) {
        return (keccak256(abi.encodePacked((cidverify))) ==
            keccak256(abi.encodePacked((certificates[Cid].hashedcid))));
    }

    /*     function showhash(string memory Cid) public view returns (string memory) {
        return (cert[Cid].hashedcid);
    } */

    function getRole(address user) public view returns (string memory) {
        if (user == supplier) {
            return "0";
        } else if (isCarrier(user)) {
            return "1";
        } else {
            return "2";
        }
    }
    /*     function showcarrier() public view returns (bool) {
        return (carriermember[msg.sender]) == 1;
    } */
}
