import { ReactChildren, ReactNode, createContext, useState } from 'react';

const INITIAL_SIZE = 350;
const MIN_SIZE = 240;
const MAX_SIZE = 850;

export const WindowSizeContext = createContext({
    size: INITIAL_SIZE,
    resize: (direction: number) => { },
    isDragging: false,
    setIsDragging: (x: boolean) => { }
});


const WindowSizeContextProvider = ({ children }: { children: ReactNode }) => {
    const [size, setSize] = useState(INITIAL_SIZE);
    const [isDragging, setIsDragging] = useState(false);
    const step = 5;
    const resize = (direction: number) => {

        setSize((curr) => {

            // return curr > direction ? - direction : curr;
            if (direction > 0) {
                const res = (curr + step);
                return res < MAX_SIZE ? res : MAX_SIZE;
            } else if (direction < 0) {
                const res = curr - step;
                return res > MIN_SIZE ? res : MIN_SIZE;
            } else {
                return curr
            }
        })
    }

    return (
        <WindowSizeContext.Provider value={{ size, resize, setIsDragging, isDragging }}>
            {children}
        </WindowSizeContext.Provider>
    );
}


export default WindowSizeContextProvider;