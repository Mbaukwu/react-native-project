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
                case hour >= 12 && hour < 16:  
                    timeGreeting = "Good Afternoon";
                    break;
                case hour >= 16 && hour < 21: 
                    timeGreeting = "Good Evening";
                    break;
                default:
                    timeGreeting = "Good Night";
            }
            return userName ? `${timeGreeting}, ${userName}` : `${timeGreeting}, Adventurer!`
        };
        
        setGreeting(updateGreeting());
    
        let lastHour = new Date().getHours();
        const interval = setInterval(() => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            if (currentHour !== lastHour) {
                lastHour = currentHour;
                setGreeting(updateGreeting());
            }
        }, 60000);
        
        return () => clearInterval(interval);
    }, [userName]);

    return greeting;
}