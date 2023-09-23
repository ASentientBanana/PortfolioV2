import { Container, styled } from '@mui/material';
import TableOfContentsElement from './TableOfContentsElement';
import { PAGES } from '../Layout';
import ThemePalette from '../ThemePalette';




const TableOfContents = () => {


  const TOCTitle = styled('h1')({
    textAlign: 'center',
    marginBottom: '50px',
  });
  const MainContainer = styled(Container)(({ theme }) => ({
    height: '100%',
    width: `400px`,
    position: 'relative',
    padding: ' 0 20px !important',
    margin: 0,
    userSelect: 'none',

    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));

  const BorderLine = styled(Container)(({ theme }) => ({
    borderRight: `5px double ${theme.palette.primary.main}`,
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '100%',
    // cursor: 'col-resize',
    width: '2px',
    padding: '0px !important'
  }));

  return (
    <MainContainer>
      <TOCTitle>Table Of Contents </TOCTitle>
      <BorderLine />
      {PAGES.map((page, index) => (
        <TableOfContentsElement name={page} isResumeLink={index === PAGES.length - 1} index={index} key={index} />
      ))}
      <ThemePalette />
    </MainContainer>
  );
};

export default TableOfContents;
