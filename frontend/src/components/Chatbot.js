import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 90%;
  max-width: 400px;
  max-height: 600px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

const ChatbotHeader = styled.div`
  background: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  font-size: 0.9rem;
  color: #333;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const SendButton = styled.button`
  padding: 8px 15px;
  margin-left: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuickReplyButton = styled.button`
  padding: 5px 10px;
  margin: 5px 5px 0 0;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [isFirstGreeting, setIsFirstGreeting] = useState(true);


  useEffect(() => {
   const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
   setMessages(storedMessages);
 }, []);
 
 useEffect(() => {
   localStorage.setItem('chatMessages', JSON.stringify(messages));
 }, [messages]);

 const knowledgeBase = {
   help: `
     <div>
       <h3>Here are topics I can assist you with:</h3>
       <ul>
         <li><strong>Beginner Advice</strong>: Basic steps to get started. Type <em>beginner</em>.</li>
         <li><strong>Training Plans</strong>: Weekly schedules, brick workouts, and more. Type <em>training</em>.</li>
         <li><strong>Gear Suggestions</strong>: Beginner, intermediate, and advanced gear. Type <em>gear</em>.</li>
         <li><strong>Race Day Preparation</strong>: Tips and checklists. Type <em>race day</em>.</li>
         <li><strong>Nutrition Guidance</strong>: Fueling for endurance events. Type <em>nutrition</em>.</li>
         <li><strong>Open Water Swimming</strong>: Techniques and tips. Type <em>swimming</em>.</li>
         <li><strong>Advanced Strategies</strong>: Competitive tips for experienced triathletes. Type <em>advanced</em>.</li>
         <li><strong>Sign-Up Process</strong>: How to register for events. Type <em>signup</em>.</li>
         <li><strong>FAQs</strong>: Common questions about triathlons. Type <em>faq</em>.</li>
         <li><strong>Injury Prevention</strong>: Stay injury-free during training. Type <em>injury</em>.</li>
         <li><strong>Training Apps</strong>: Best apps for tracking your training. Type <em>apps</em>.</li>
         <li><strong>Mindset and Motivation</strong>: Staying focused and motivated. Type <em>motivation</em>.</li>
       </ul>
       <p>Need help exploring? Type <em>help</em>.</p>
     </div>
   `,
   beginner: `
     <div>
       <h3>Beginner Advice:</h3>
       <p>Starting out? Here's what you need to know:</p>
       <ul>
         <li><strong>Pick a Race:</strong> Start with a sprint triathlon (750m swim, 20km bike, 5km run).</li>
         <li><strong>Training:</strong> Aim for 2 sessions per week for each sport. Focus on building endurance and confidence.</li>
         <li><strong>Gear:</strong> Invest in essentials like a bike, helmet, running shoes, and goggles. A tri-suit is optional but helpful.</li>
         <li><strong>Join a Club:</strong> Local triathlon clubs are great for learning and motivation.</li>
         <li><strong>Set Realistic Goals:</strong> Focus on completing the race, not competing.</li>
       </ul>
     </div>
   `,
   training: `
     <div>
       <h3>Training Plans:</h3>
       <p>Here’s a basic weekly training plan:</p>
       <ul>
         <li><strong>Monday:</strong> Rest or light stretching.</li>
         <li><strong>Tuesday:</strong> 45-minute bike ride (moderate intensity).</li>
         <li><strong>Wednesday:</strong> 30-minute swim focusing on technique.</li>
         <li><strong>Thursday:</strong> 30-minute run, including intervals.</li>
         <li><strong>Friday:</strong> Rest day.</li>
         <li><strong>Saturday:</strong> Brick workout: 60-minute bike followed by a 20-minute run.</li>
         <li><strong>Sunday:</strong> Long swim session (750m-1500m).</li>
       </ul>
       <p>Consistency is key. Gradually increase intensity and duration over time.</p>
     </div>
   `,
   gear: `
     <div>
       <h3>Gear Suggestions:</h3>
       <p>Here’s what you need at each level:</p>
       <ul>
         <li><strong>Beginner:</strong> Entry-level road bike, helmet, goggles, running shoes.</li>
         <li><strong>Intermediate:</strong> Aero bars, wetsuit, GPS watch, clipless pedals.</li>
         <li><strong>Advanced:</strong> Triathlon-specific bike, carbon-plated running shoes, power meter.</li>
       </ul>
       <p>Don’t forget hydration systems, a race belt, and a repair kit for your bike.</p>
     </div>
   `,
   nutrition: `
     <div>
       <h3>Nutrition Guidance:</h3>
       <p>Fuel your performance:</p>
       <ul>
         <li><strong>Before the Race:</strong> Carb-load 1-2 days before. Breakfast: oatmeal with banana.</li>
         <li><strong>During the Race:</strong> Energy gels every 30-45 minutes. Stay hydrated with water and electrolytes.</li>
         <li><strong>After the Race:</strong> Protein-rich meal within 30 minutes. Drink plenty of fluids to recover.</li>
       </ul>
     </div>
   `,
   swimming: `
     <div>
       <h3>Open Water Swimming Tips:</h3>
       <p>Master open water swimming:</p>
       <ul>
         <li><strong>Practice:</strong> Train in lakes, rivers, or the sea to adapt.</li>
         <li><strong>Gear:</strong> Invest in a good wetsuit and anti-fog goggles.</li>
         <li><strong>Techniques:</strong> Focus on sighting and controlled breathing. Draft behind other swimmers to conserve energy.</li>
       </ul>
     </div>
   `,
   race_day: `
     <div>
       <h3>Race Day Preparation:</h3>
       <p>Make race day stress-free:</p>
       <ul>
         <li><strong>Checklist:</strong> Pack tri-suit, helmet, goggles, running shoes, hydration, and nutrition.</li>
         <li><strong>Arrive Early:</strong> Set up your transition area and warm up lightly.</li>
         <li><strong>Pace Yourself:</strong> Start steady and stick to your plan.</li>
       </ul>
     </div>
   `,
   motivation: `
     <div>
       <h3>Mindset and Motivation:</h3>
       <p>Stay focused and confident:</p>
       <ul>
         <li><strong>Set Goals:</strong> Break your training into milestones.</li>
         <li><strong>Track Progress:</strong> Use apps or journals to see your improvement.</li>
         <li><strong>Visualize:</strong> Picture yourself crossing the finish line.</li>
       </ul>
     </div>
   `,
   injury: `
     <div>
       <h3>Injury Prevention:</h3>
       <p>Train smarter to stay injury-free:</p>
       <ul>
         <li><strong>Warm Up:</strong> Spend 5-10 minutes warming up before workouts.</li>
         <li><strong>Cross-Train:</strong> Add strength training to balance muscle groups.</li>
         <li><strong>Rest:</strong> Listen to your body and take recovery days seriously.</li>
         <li><strong>Form:</strong> Focus on proper technique in all three disciplines.</li>
       </ul>
     </div>
   `,
   apps: `
     <div>
       <h3>Best Training Apps:</h3>
       <p>Track your training and performance:</p>
       <ul>
         <li><strong>Strava:</strong> Record and share workouts.</li>
         <li><strong>TrainingPeaks:</strong> Plan and analyze your training.</li>
         <li><strong>MySwimPro:</strong> Improve your swim with guided workouts.</li>
         <li><strong>Garmin Connect:</strong> Sync data from your GPS devices.</li>
       </ul>
     </div>
   `,
 };

 const matchInputToKey = (input, topics) => {
   const lowerInput = input.trim().toLowerCase();

   for (let key in topics) {
     if (lowerInput.includes(key)) {
       return topics[key];
     }
   }
   return null;
 };

 useEffect(() => {
   const initialMessage = {
     sender: "bot",
     text: `<p>Hi! I’m your triathlon assistant. Type <em>help</em> to see what I can do.</p>`,
   };
   setMessages([initialMessage]);
 }, []);

 const handleSendMessage = () => {
   if (input.trim() === "") return;
 
   const userMessage = { sender: "user", text: input };
 
   // Define topic mappings
   const topics = {
     beginner: "beginner",
     training: "training",
     "gear suggestions": "gear",
     gear: "gear",
     "race day": "race_day",
     nutrition: "nutrition",
     swimming: "swimming",
     advanced: "advanced",
     signup: "signup",
     faq: "faq",
     injury: "injury",
     apps: "apps",
     motivation: "motivation",
     help: "help",
   };
 
   // Match user input to knowledgeBase keys
   const matchedKey = matchInputToKey(input, topics);
 
   // Respond based on the matched key
   const botResponse = matchedKey && knowledgeBase[matchedKey]
     ? knowledgeBase[matchedKey]
     : `<p>I'm not sure about that. Try asking for <em>help</em> to see what I can assist with!</p>`;
 
   const botMessage = { sender: "bot", text: botResponse };
   setMessages((prev) => [...prev, userMessage, botMessage]);
   setInput("");
 };

 const toggleChatbot = () => {
   setIsOpen(!isOpen);
 };

 return (
   <ChatbotContainer>
     <ChatbotHeader onClick={toggleChatbot}>
       {isOpen ? "Triathlon Assistant" : "Open Chat"}
     </ChatbotHeader>
     {isOpen && (
       <>
         <ChatWindow>
           {messages.map((msg, index) => (
             <div
               key={index}
               style={{
                 textAlign: msg.sender === "user" ? "right" : "left",
                 margin: "5px 0",
               }}
               dangerouslySetInnerHTML={{ __html: `<strong>${msg.sender === "user" ? "You:" : "Bot:"}</strong> ${msg.text}` }}
             />
           ))}
         </ChatWindow>
         <ChatInputContainer>
           <ChatInput
             type="text"
             placeholder="Ask me about triathlons!"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
           />
           <SendButton onClick={handleSendMessage}>Send</SendButton>
         </ChatInputContainer>
       </>
     )}
   </ChatbotContainer>
 );
};

export default Chatbot;