import { useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { Button, Container, styled, } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

interface IProps {
  name: string;
  index: number;
  isResumeLink?: boolean;
}

const LinkWrapper = ({ children, shouldWrap, name }: { shouldWrap?: boolean, children: JSX.Element, name: string }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (shouldWrap) {
    return (
      <a style={{ textDecoration: 'none' }} href={`${`${siteUrl}/assets/resume.pdf`}`} target={"_blank"} rel="noreferrer">
        {children}
      </a>

    )
  }
  return (
    <Link passHref href={shouldWrap ? `${`${siteUrl}/assets/resume.pdf`}` : `/${name.toLowerCase()}`}>
      {children}
    </Link>
  );
}

const TableOfContentsElement = ({ name, index, isResumeLink }: IProps) => {

  const router = useRouter();

  const textContainerRef = useRef<HTMLDivElement>(null);
  const [numberOfDots, setNumberOfDots] = useState<number>(20);



  const selected = router.pathname === `/${name}`.toLowerCase();



  const TextContainer = styled(Container)(({ theme }) => ({
    width: '100%',
    height: '1rem',
    display: 'flex',
    paddingX: '5px',
    paddingY: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    fontWeight: 'bolder',
    userSelect: 'none',
    marginBottom: '20px',
    justifyContent: 'center',
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


  const CustomWrapper = styled(Container)(({ theme }) => ({
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }))


  const SetWidth = useCallback(() => {

    if (textContainerRef.current) {
      const dotCountFullWidth = textContainerRef.current?.clientWidth / 20;
      const count = dotCountFullWidth - name.length;
      if (count > 0 && count !== numberOfDots) {
        setNumberOfDots(Math.floor(count));
      }
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
    <LinkWrapper name={name} shouldWrap={isResumeLink}>
      <TextContainer ref={textContainerRef}>
        <CustomWrapper>
          {name}
          {!isResumeLink && '.'.repeat(numberOfDots) + index + 1}
          <br />
        </CustomWrapper>
      </TextContainer>
    </LinkWrapper>
  );
};

export default TableOfContentsElement;
