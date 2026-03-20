
import { useEffect, useState } from 'react'

export default function useGreeting(userName: string | null) {
    const [greeting, setGreeting] = useState<string>("")
    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            let timeGreeting = "";
            switch (true) {
                case hour >= 5 && hour < 12:
                    timeGreeting = "Good Morning";
                    break;

                case hour >= 12 && hour < 18:
                    timeGreeting = "Good Afternoon";
                    break;
                case hour >= 18 && hour < 21:
                    timeGreeting = "Good Evening";
                    break;
                default:
                    timeGreeting = "Good Night";
            }
            return userName ? `${timeGreeting}, ${userName}, the Explorer!` : `${timeGreeting}, Explorer!`
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
    }, [userName])
    

    return greeting;
 
}