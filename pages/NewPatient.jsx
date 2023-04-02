import React, { useState } from 'react';
import Web3 from 'web3';
import PatientContract from './contracts/PatientContract.json';

function NewPatient() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');

    async function handleNewPatient(event) {
        event.preventDefault();
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const contractAddress = PatientContract.networks[networkId].address;
        const contractInstance = new web3.eth.Contract(PatientContract.abi, contractAddress);
        const tx = await contractInstance.methods.addPatient(name, age, gender, medicalHistory).send({ from: accounts[0] });
        console.log('Transaction hash:', tx.transactionHash);
    }

    return (
        <div>
            <h1>New Patient Registration</h1>
            <form onSubmit={handleNewPatient}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={event => setName(event.target.value)} />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="text" value={age} onChange={event => setAge(event.target.value)} />
                </div>
                <div>
                    <label>Gender:</label>
                    <input type="text" value={gender} onChange={event => setGender(event.target.value)} />
                </div>
                <div>
                    <label>Medical History:</label>
                    <textarea value={medicalHistory} onChange={event => setMedicalHistory(event.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewPatient;
