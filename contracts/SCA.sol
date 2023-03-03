pragma solidity >=0.7.0 <0.9.0;

    // With this system, if we want to upload more than one picture corresponding to one delivery
    // it's neccesary to take the pictures one by one, and then make a pdf with all the pictures.
    // Then, we upload only one pdf file with all the photos

    contract SCA {
        address public supplier;
        uint256 public cid_count; //counter to increment id 

        struct Cert {
            string hashedcid; // signature of CID
            uint256 regcid;  // 1: registry added by supplier
        }
       
        //ID for carriers
        mapping(address => uint256) carriermember;
        // For each Cid we obtain the signature
        mapping(string  => Cert) certificates;
        // For each id we obtain the Cid
        mapping(uint256  => string) id_certificates;
        // link between carriers and CIDS   
        mapping(uint256 => address) deliveries;         
                
        modifier onlySupplier() {
            require(msg.sender == supplier);
            _;
        }

        modifier onlyCarrier() {
            require(carriermember[msg.sender] == 1);
            _;
        }

        constructor() {
            supplier = msg.sender;
        }

            // supplier add CID
            function addcid(string memory Cid) public payable onlySupplier {
                certificates[Cid] = Cert({hashedcid: "", regcid :1});
                id_certificates[cid_count] = Cid; 
            }

        //Show delivery
        function showdeliv(uint256 id) public view returns (address) {
            return deliveries[id];
        }

        //Show CID
        function showcid(uint256 id) public view returns (string memory) {
            return id_certificates[id];
        }

        //Show certificate by id
        function showcert(uint256 id) public view returns (Cert memory) {
            string memory cid =  id_certificates[id];
            return certificates[cid];
        }

        //Carrier add signature to cert
        function supply(string memory Hashcid, string memory Cid, address _carrier) // signature,message
            public
            payable
            onlyCarrier
        {   
            require(certificates[Cid].regcid == 1, "supplier");
            require(carriermember[_carrier]== 1, "registered");
        
            certificates[Cid] = Cert({hashedcid: Hashcid, regcid : 1});

            deliveries[cid_count] = _carrier;

            cid_count = cid_count + 1;
            
        }

        

        function register(address payable Carrier) public onlySupplier {
            carriermember[Carrier] = 1;
        }

        function unregister(address payable Carrier) public onlySupplier {
            carriermember[Carrier] = 0;
        }

        function show(string memory Cid, string memory cidverify)
            public
            view
            returns (bool)
        {
            return (keccak256(abi.encodePacked((cidverify))) ==
            keccak256(abi.encodePacked((certificates[Cid].hashedcid))));

        }
    
        function getRole(address user) public view returns (string memory) {
            if (user == supplier) {
                return "0";
            } else if (carriermember[user] == 1) {
                return "1";
            } else {
                return "2";
            }
        }

        function showcarrier(address carrier) public view returns (bool) {
            return (carriermember[carrier]) == 1;
         }
    }
