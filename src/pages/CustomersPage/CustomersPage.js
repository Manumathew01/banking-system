import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { numberWithCommas } from "../../utils/numberWithCommas";

const theme = extendTheme({
  colors: {
    primary: { default: "#845EC2", hover: "rgba(4,115,234, 0.1)" },
  },
});

const CustomersPage = () => {
  const [customersArray, setCustomersArray] = useState([]);

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

  return (
    <div>
      <ChakraProvider theme={theme} resetCSS={false}>
        <Text
          fontSize="4xl"
          style={{
            margin: "140px 0 50px 0",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Customer List
        </Text>
        <div
          style={{
            margin: "30px 100px 0px 120px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text fontSize="2xl">Click on a customer to view more details!</Text>
          <Link to="/payment" style={{ textDecoration: "none" }}>
            <Button
              m="20px"
              bg="#368dff"
              color="white"
              p="24px"
              size="md"
              _hover={{ bg: "grey" }}
            >
              TRANSFER MONEY
            </Button>
          </Link>
        </div>
      </ChakraProvider>
      <div
        style={{
          margin: "0px 100px 30px 100px",
          border: "0.5px solid rgba(128, 128, 128, 0.534)",
          borderRadius: "7px",
        }}
      >
        <ChakraProvider theme={theme} resetCSS={false}>
          <Box overflowX="auto">
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
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>Email</Th>
                  <Th>Balance</Th>
                </Tr>
              </Thead>
              {customersArray.map((el) => (
                <Tbody>
                  <Tr _hover={{ background: "#80808011", color: "#3685ff" }}>
                    <Td>{el.id}</Td>
                    <Link
                      to={{
                        pathname: `/customers/${el.id}`,
                        state: {
                          id: el.id,
                          data: el,
                        },
                      }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Td
                        _hover={{
                          cursor: "pointer",
                          bg: "primary.hover",
                          color: "#EC4646",
                          textDecoration: "underline",
                          transition: "0.5s",
                        }}
                      >
                        {el.name}
                      </Td>
                    </Link>
                    <Td>{el.phone}</Td>
                    <Td>{el.email}</Td>
                    <Td>${numberWithCommas(el.balance)}</Td>
                  </Tr>
                </Tbody>
              ))}
            </Table>
          </Box>
        </ChakraProvider>
      </div>
    </div>
  );
};

export default CustomersPage;
