import { Coach } from "./Coach";

export class CircketCoach implements Coach{
    getDailyWorkout(): string {
        return "Practice your spin bowling technique"
    }
    
}