import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Flex, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { chakra } from "@chakra-ui/system";
import { useLocation } from "react-router";
import { numberWithCommas } from "../../utils/numberWithCommas";

const Success = () => {
  const [dataCollected, setDataCollected] = useState(false);
  const location = useLocation();
  const [data, setData] = useState();

  useEffect(() => {
    setTimeout(() => {
      if (location.state === undefined) {
        setDataCollected(false);
      } else {
        setData(location.state.transactionHistory);
        setDataCollected(true);
      }
    }, 100);
  }, []);

  console.log(data);

  return (
    <div>
      {dataCollected ? (
        <div>
          <ChakraProvider>
            <Flex
              overflowX="auto"
              mt="100px"
              p={50}
              w="full"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                overflowX="auto"
                w="sm"
                mx="auto"
                shadow="lg"
                rounded="lg"
                overflow="hidden"
              >
                <Flex alignItems="center" px={6} py={3} bg="#4e4d55">
                  <chakra.h1
                    mx={3}
                    color="white"
                    fontWeight="bold"
                    fontSize="xl"
                  >
                    Transaction Details
                  </chakra.h1>
                </Flex>

                <Box py={4} px={6} fontSize="lg">
                  Transaction Id:
                  <chakra.h1 fontSize="xl" fontWeight="bold">
                    {data.t_id}
                  </chakra.h1>
                  <Flex alignItems="center" mt={4} fontSize="xl">
                    Sender:
                    <chakra.h1 px={2} fontSize="xl" fontWeight="semibold">
                      {data.sender}
                    </chakra.h1>
                  </Flex>
                  <Flex alignItems="center" mt={4} fontSize="xl">
                    Receiver:
                    <chakra.h1 px={2} fontSize="xl" fontWeight="semibold">
                      {data.receiver}
                    </chakra.h1>
                  </Flex>
                  <Flex alignItems="center" mt={4} fontSize="xl">
                    Amount:
                    <chakra.h1 px={2} fontSize="xl" fontWeight="semibold">
                      ${numberWithCommas(data.amount || 0)}
                    </chakra.h1>
                  </Flex>
                  <Flex alignItems="center" mt={4} fontSize="xl">
                    Date:
                    <chakra.h1 px={2} fontSize="xl" fontWeight="semibold">
                      {data.date}
                    </chakra.h1>
                  </Flex>
                </Box>
              </Box>
            </Flex>
            <Flex w="full" alignItems="center" justifyContent="center">
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
              <Link
                to="/transaction-history"
                style={{ textDecoration: "none" }}
              >
                <Button
                  m="20px"
                  bg="#368dff"
                  color="white"
                  p="24px"
                  size="md"
                  _hover={{ bg: "grey" }}
                >
                  TRANSACTIONS
                </Button>
              </Link>
            </Flex>
          </ChakraProvider>
        </div>
      ) : (
        <div>
          <ChakraProvider resetCSS={false}>
            <Flex
              p={50}
              w="full"
              mt={10}
              alignItems="center"
              justifyContent="center"
            >
              <chakra.h1 mx={3} color="black" fontWeight="bold" fontSize="5xl">
                No transactions Made!
              </chakra.h1>
            </Flex>
            <Flex p={50} w="full" alignItems="center" justifyContent="center">
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
            </Flex>
          </ChakraProvider>
        </div>
      )}
    </div>
  );
};

export default Success;
