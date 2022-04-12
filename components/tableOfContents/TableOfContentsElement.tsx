import Reat, { useRef, useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router'
import { Container, styled } from '@mui/material';
import { useNavigator } from '../../context/navbarStore';

interface IProps {
    name: string,
    index: number
}

const TableOfContentsElement = ({ name, index }: IProps) => {

    const { currentPage, changePage } = useNavigator();

    const textContainerRef = useRef<HTMLDivElement>(null);
    const [numberOfDots, setNumberOfDots] = useState<number>(20)
    const MainContainer = styled(Container)({
        cursor:'pointer',
        userSelect:'none'
    });
    
    const selectPage = () =>{
        changePage(index);
    }
    const TextContainer = styled(Container)(() => ({
        display:'flex',
        marginBottom:'20px',
        fontWeight:'bolder',
        width:'100%',
        // border:'solid red 1px',
        ":after":{
            'content': index === currentPage ? '"<-"': '""',
            paddingLeft:'10px'
        }
    }));

    const setWidth = () =>{
        if(textContainerRef.current){
            const _ = (textContainerRef.current?.clientWidth / 12) ;
            if(textContainerRef.current?.clientWidth !== numberOfDots) setNumberOfDots(_);
        }
    }

    if(typeof window !== 'undefined'){
        window.addEventListener('resize',setWidth);
    }

    useEffect(()=>{
        setWidth();
        return ()=>{
            window.removeEventListener('resize',setWidth)
        }
    },[numberOfDots,currentPage])
    return (
        <MainContainer>
            <TextContainer ref={textContainerRef} onClick={selectPage}>
                <span>{`${name} ${'.'.repeat(Math.abs(numberOfDots-name.length-5))} ${index+1}`}</span>
            </TextContainer>
        </MainContainer>
    );
}

export default TableOfContentsElement;
