import { useRef, useState, useEffect, useCallback } from 'react';
import { Container, styled } from '@mui/material';
import { useNavigator } from '../../context/navbarStore';
import { useRouter } from 'next/dist/client/router';

interface IProps {
  name: string;
  index: number;
  noIndex?: boolean;
}

const TableOfContentsElement = ({ name, index, noIndex }: IProps) => {
  const { currentPage, changePage } = useNavigator();
  const router = useRouter();

  const textContainerRef = useRef<HTMLDivElement>(null);
  const [numberOfDots, setNumberOfDots] = useState<number>(20);
  const MainContainer = styled(Container)({
    cursor: 'pointer',
    userSelect: 'none',
  });

  const selectPage = (pageName: string) => {
    changePage(index);
    router.push(pageName.toLowerCase())
  };

  const TextContainer = styled(Container)(() => ({
    display: 'flex',
    marginBottom: '20px',
    fontWeight: 'bolder',
    width: '100%',
    height: '1rem',
    ':after': {
      content: index === currentPage ? '"<"' : '""',
      fontSize: '13px',
      marginLeft: '10px',
    },
    ':before': {
      content: index === currentPage ? '">"' : '""',
      fontSize: '13px',
      marginRight: '10px',
    },
  }));

  const TOCDotsL = styled('span')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  }));

  const TOCDotsM = styled('span')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('lg')]: {
      display: 'block',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));

  const SetWidth = useCallback(() => {
    if (textContainerRef.current) {
      const _ = textContainerRef.current?.clientWidth / 12;
      if (textContainerRef.current?.clientWidth !== numberOfDots)
        setNumberOfDots(_);
    }
  }, [numberOfDots]);

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', SetWidth);
  }

  useEffect(() => {
    SetWidth();
    return () => {
      window.removeEventListener('resize', SetWidth);
    };
  }, [numberOfDots, currentPage, SetWidth]);
  return (
    <MainContainer>
      <TextContainer ref={textContainerRef} onClick={() => selectPage(name)}>
        <span>{name}</span>
        <TOCDotsL> {'.'.repeat(25 - name.length)}</TOCDotsL>
        <TOCDotsM> {'.'.repeat(14 - name.length)}</TOCDotsM>
        {noIndex ? null : <span>{index + 1}</span>}
      </TextContainer>
    </MainContainer>
  );
};

export default TableOfContentsElement;
