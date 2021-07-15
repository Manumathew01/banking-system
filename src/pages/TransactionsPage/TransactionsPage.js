import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { db } from "../../firebase/firebase";

const TransactionsPage = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    db.collection("transactions")
      .orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setTransactionHistory(data);
      });
  }, []);

  console.log(transactionHistory);

  return (
    <div>
      <ChakraProvider resetCSS={false}>
        <Text
          fontSize="4xl"
          style={{
            margin: "140px 0 50px 0",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Transaction History
        </Text>
        <div
          style={{
            margin: "0px 100px 30px 100px",
            border: "0.5px solid rgba(128, 128, 128, 0.534)",
            borderRadius: "7px",
          }}
        >
          <Table
            size="lg"
            colorScheme="whiteAlpha"
            boxShadow="lg"
            p="6"
            rounded="md"
            bg="white"
          >
            <Thead>
              <Tr borderBottom="2px solid grey">
                <Th>Transaction Id</Th>
                <Th>Sender</Th>
                <Th>Receiver</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            {transactionHistory.map((el) => (
              <Tbody>
                <Tr _hover={{ background: "#80808011", color: "#3685ff" }}>
                  <Td>{el.t_id}</Td>
                  <Td>{el.sender}</Td>
                  <Td>{el.receiver}</Td>
                  <Td>${numberWithCommas(el.amount)}</Td>
                  <Td>{el.date}</Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </div>
      </ChakraProvider>
    </div>
  );
};

export default TransactionsPage;
