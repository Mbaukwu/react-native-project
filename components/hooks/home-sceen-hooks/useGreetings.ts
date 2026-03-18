import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function useGreeting() {
    const [greeting, setGreeting] = useState<string>("")
    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            switch (true) {
                case hour >= 5 && hour < 12:
                    return "Good Morning";

                case hour >= 12 && hour < 18:
                    return "Good Afternoon";

                case hour >= 18 && hour < 21:
                    return "Good Evening";

                default:
                    return "Good Night";
            }
        };
         // Set initial greeting
        setGreeting(updateGreeting());
        
    let lastHour = new Date().getHours();
        const interval = setInterval(() => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            if (currentHour !== lastHour) {
                lastHour = currentHour
                setGreeting(updateGreeting())
            }
        },60000)
        return () => clearInterval(interval);
    },[])
    return greeting;
 
}