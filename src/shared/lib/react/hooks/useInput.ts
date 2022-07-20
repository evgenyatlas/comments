import { ChangeEvent, useState } from "react";
import { takeValue } from "../utils";


export function useInput(defaultValue: string = ""): [string, (value: React.ChangeEvent<HTMLInputElement>) => void] {
    const [value, set] = useState(defaultValue)

    return [
        value,
        (e: React.ChangeEvent<HTMLInputElement>) => set(takeValue(e))
    ]
}