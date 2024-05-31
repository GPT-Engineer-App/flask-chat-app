import React, { useState, useEffect } from "react";
import { Container, VStack, HStack, Input, Button, Box, Text, Avatar, IconButton } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch initial messages from the backend
    fetch("http://localhost:5000/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      username: username || "Anonymous",
      text: input,
      timestamp: new Date().toISOString(),
    };

    // Send message to the backend
    fetch("http://localhost:5000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([...messages, data]);
        setInput("");
      });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%" justifyContent="space-between">
          <Input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </HStack>
        <Box width="100%" height="60vh" overflowY="scroll" border="1px solid #ccc" borderRadius="md" p={4}>
          {messages.map((msg, index) => (
            <HStack key={index} spacing={4} alignItems="flex-start" mb={4}>
              <Avatar name={msg.username} />
              <VStack alignItems="flex-start">
                <Text fontWeight="bold">{msg.username}</Text>
                <Text>{msg.text}</Text>
                <Text fontSize="xs" color="gray.500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Text>
              </VStack>
            </HStack>
          ))}
        </Box>
        <HStack width="100%">
          <Input placeholder="Type a message" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton aria-label="Send" icon={<FaPaperPlane />} onClick={sendMessage} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
