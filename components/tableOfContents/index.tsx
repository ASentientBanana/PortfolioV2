import { Container, styled } from '@mui/material';
import TableOfContentsElement from './TableOfContentsElement';
import { PAGES } from '../Layout';
import ThemePalette from '../ThemePalette';

const MainContainer = styled(Container)(({ theme }) => ({
  height: '100%',
  width: '35%',
  position: 'relative',
  borderRight: `5px double ${theme.palette.primary.main}`,
  padding: ' 0 20px !important',
  margin: 0,
  backgroundColor: theme.palette.secondary.main,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));


const TableOfContents = () => {

  const TOCTitle = styled('h1')({
    textAlign: 'center',
    marginBottom: '50px',
  });

  return (
    <MainContainer>
      <TOCTitle>Table Of Contents</TOCTitle>
      {PAGES.map((page, index) => (
        <TableOfContentsElement name={page} index={index} key={index} />
      ))}
      <ThemePalette />
    </MainContainer>
  );
};

export default TableOfContents;
