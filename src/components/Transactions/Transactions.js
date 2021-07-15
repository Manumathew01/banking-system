import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase";
import "./Transactions.css";

const Transactions = () => {
  const [customersArray, setCustomersArray] = useState([]);
  const [amount, setAmount] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    db.collection("users")
      .orderBy("id", "asc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setCustomersArray(data);
        console.log("from firebase", data);
      });
  }, []);

  const senderArray = customersArray.map((el) => {
    return { value: el.name, label: el.name, balance: el.balance };
  });

  const onSenderChange = (e) => {
    db.collection("users")
      .where("name", "==", e.target.value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setSender(doc.data());
        });
      });
  };

  const receiversArray = customersArray.filter((el) => {
    return el.name !== sender.name;
  });

  // receiver dropdown methods
  const onReceiverChange = (e) => {
    db.collection("users")
      .where("name", "==", e.target.value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setReceiver(doc.data());
        });
      });
  };

  const clickHandler = (event) => {
    event.preventDefault();

    if (sender.name === "" || receiver.name === "") {
      Swal.fire({
        icon: "warning",
        title: "Cannot proceed",
        text: "Insufficent Balance!",
        confirmButtonColor: "#368dff",
      });
    } else {
      if (amount <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Cannot proceed",
          text: "Invalid amount",
          confirmButtonColor: "#368dff",
        });
      } else {
        if (sender.balance < amount) {
          Swal.fire({
            icon: "warning",
            title: "Cannot proceed",
            text: "Insufficent Balance!",
            confirmButtonColor: "#368dff",
          });

          setAmount("");
        } else {
          const diff = Number(sender.balance) - Number(amount);
          const sum = Number(receiver.balance) + Number(amount);
          setAmount("");

          db.collection("users")
            .where("name", "==", sender.name)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref.update({ balance: diff });
                console.log(doc.data().balance);
              });
            });

          db.collection("users")
            .where("name", "==", receiver.name)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref.update({ balance: sum });
                console.log(doc.data().balance);
              });
            });

          db.collection("transactions")
            .doc()
            .set({
              t_id: Date.now(),
              sender: sender.name,
              receiver: receiver.name,
              amount: amount,
              date: new Date().toLocaleString(),
            })

            .then(function () {
              setTransactionHistory({
                t_id: Date.now(),
                sender: sender.name,
                receiver: receiver.name,
                amount: amount,
                date: new Date().toLocaleString(),
              });
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });

          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: "Payment completed successfully!",
              confirmButtonColor: "#368dff",
            });
          }, 300);

          setTimeout(() => {
            setIsSuccess(true);
          }, 3000);
        }
      }
    }
  };

  const location = {
    pathname: "/payment/success",
    state: { transactionHistory: transactionHistory },
  };

  return (
    <>
      {isSuccess ? (
        <Redirect to={location} />
      ) : (
        <div className="transactions-container">
          <h1>Transfer Money</h1>
          <div className="dropdown">
            <select
              className="select"
              onChange={onSenderChange}
              name="sender"
              required
            >
              <option value="none" selected disabled hidden>
                Choose Sender
              </option>
              {senderArray.map((option) => (
                <option value={option.value}>{option.value}</option>
              ))}
            </select>

            <select
              className="select"
              onChange={onReceiverChange}
              name="receiver"
              required="required"
            >
              <option value="none" selected disabled hidden>
                Choose Receiver
              </option>
              {receiversArray.map((option) => (
                <option value={option.name}>{option.name}</option>
              ))}
            </select>
          </div>
          <p>Enter the amount to be transfered:</p>
          <form>
            <input
              className="amount-input"
              type="number"
              value={amount}
              placeholder="Enter the amount"
              onChange={(event) => setAmount(event.target.value)}
            />
            <button type="submit" onClick={clickHandler}>
              Confirm
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Transactions;
