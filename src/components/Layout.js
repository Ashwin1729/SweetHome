import { Heading } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Heading>
        <title>Real Estate</title>
      </Heading>
      <Box maxWidth="1280px" m="auto">
        <header>header</header>
        <main>{children}</main>
        <footer>footer</footer>
      </Box>
    </>
  );
}
