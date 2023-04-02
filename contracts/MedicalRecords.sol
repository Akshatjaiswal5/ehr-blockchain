pragma solidity ^0.8.0;

contract MedicalRecords {

    struct Patient {
        string name;
        string[] medications;
        mapping(string => Medication) medicationDetails;
        mapping(address => bool) doctors;
    }

    struct Medication {
        string name;
        uint dosage;
        string frequency;
    }

    mapping(address => Patient) patients;

    function addPatient(string memory name) public {
        patients[msg.sender].name = name;
    }

    function addMedication(string memory name, uint dosage, string memory frequency) public {
        Patient storage patient = patients[msg.sender];
        patient.medications.push(name);
        patient.medicationDetails[name] = Medication(name, dosage, frequency);
    }

    function grantAccess(address doctor) public {
        patients[msg.sender].doctors[doctor] = true;
    }

    function revokeAccess(address doctor) public {
        patients[msg.sender].doctors[doctor] = false;
    }

    function getPatientMedications() public view returns (string[] memory) {
        return patients[msg.sender].medications;
    }

    function getMedicationDetails(string memory name) public view returns (string memory, uint, string memory) {
        Medication storage medication = patients[msg.sender].medicationDetails[name];
        return (medication.name, medication.dosage, medication.frequency);
    }

    function getPatientList() public view returns (address[] memory) {
        uint count = 0;
        for (uint i = 0; i < addressList.length; i++) {
            if (patients[addressList[i]].name != "") {
                count++;
            }
        }
        address[] memory result = new address[](count);
        count = 0;
        for (uint i = 0; i < addressList.length; i++) {
            if (patients[addressList[i]].name != "") {
                result[count] = addressList[i];
                count++;
            }
        }
        return result;
    }

    function getPatientInfo(address patient) public view returns (string memory, string[] memory) {
        Patient storage p = patients[patient];
        require(p.doctors[msg.sender], "Not authorized");
        return (p.name, p.medications);
    }

    function searchPatient(address patient, string memory medication) public view returns (string memory, uint, string memory) {
        Patient storage p = patients[patient];
        require(p.doctors[msg.sender], "Not authorized");
        Medication storage m = p.medicationDetails[medication];
        return (m.name, m.dosage, m.frequency);
    }
}
