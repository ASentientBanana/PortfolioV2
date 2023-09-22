import { useRef, useState, useEffect, useCallback } from 'react';
import { Button, Container, styled } from '@mui/material';
import { useRouter } from 'next/dist/client/router';

interface IProps {
  name: string;
  index: number;
  noIndex?: boolean;
}

const TableOfContentsElement = ({ name, index, noIndex }: IProps) => {
  const router = useRouter();

  const textContainerRef = useRef<HTMLButtonElement>(null);
  const [numberOfDots, setNumberOfDots] = useState<number>(20);



  const selected = router.pathname === `/${name}`.toLowerCase();

  const selectPage = (pageName: string) => {
    router.push(pageName.toLowerCase())
  };

  const TextContainer = styled(Button)(({ theme }) => ({
    display: 'flex',
    marginBottom: '20px',
    fontWeight: 'bolder',
    justifyContent: 'center',
    width: '100%',
    height: '1rem',
    fontSize: '20px',
    paddingX: '5px',
    paddingY: '10px',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'start',
    },
    ':after': {
      content: selected ? '"<"' : '""',
      fontSize: '16px',
      marginLeft: '10px',
    },
    ':before': {
      content: selected ? '">"' : '""',
      fontSize: '16px',
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
    ':hover': {
      backgroundColor: 'transparent'
    }
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
  }, [numberOfDots, SetWidth]);
  return (
    <TextContainer ref={textContainerRef} onClick={() => selectPage(name)}>
      <span>{name}</span>
      <TOCDotsL> {'.'.repeat(25 - name.length)}</TOCDotsL>
      <TOCDotsM> {'.'.repeat(14 - name.length)}</TOCDotsM>
      {noIndex ? null : <span>{index + 1}</span>}
    </TextContainer>
  );
};

export default TableOfContentsElement;
