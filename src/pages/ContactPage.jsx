import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Terminal = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00ff88;
  border-radius: 10px;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
    animation: scan 2s linear infinite;
  }

  @keyframes scan {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TerminalTitle = styled.h2`
  color: #00ff88;
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const TerminalDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  margin-right: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #00ff88;
  font-size: 1rem;
`;

const Input = styled.input`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid #00ff88;
  border-radius: 5px;
  padding: 0.8rem;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a1ff;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }
`;

const TextArea = styled.textarea`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid #00ff88;
  border-radius: 5px;
  padding: 0.8rem;
  color: #ffffff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a1ff;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #00ff88;
  color: #00ff88;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;

  &:hover {
    background: #00ff88;
    color: #0a0a0a;
  }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ContactContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Terminal
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <TerminalHeader>
          <TerminalDot color="#ff5f56" />
          <TerminalDot color="#ffbd2e" />
          <TerminalDot color="#27c93f" />
          <TerminalTitle>Contact Terminal</TerminalTitle>
        </TerminalHeader>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Message</Label>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              required
            />
          </InputGroup>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </SubmitButton>
        </Form>
      </Terminal>
    </ContactContainer>
  );
};

export default ContactPage; 