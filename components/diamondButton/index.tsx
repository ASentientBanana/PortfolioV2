import { styled } from '@mui/material';

interface IProps {
  text: string;
  onClickCallback: () => void;
  verticalAlign: 'left' | 'right';
  onlyOnMobile?: boolean;
}

const DiamondButton = ({
  text,
  onClickCallback,
  verticalAlign,
  onlyOnMobile,
}: IProps) => {

  const Button = styled('button')(({ theme }) => ({
    background: 'transparent',
    position: 'absolute',
    border: ` ${theme.palette.primary.main} 3px double`,
    color:theme.palette.primary.main,
    top: '20px',
    left: verticalAlign === 'left' ? '15px' : '',
    right: verticalAlign === 'right' ? '15px' : '',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    transform: ' rotate(45deg)',
    zIndex:2,
    [theme.breakpoints.down('md')]: {
      display: onlyOnMobile ? 'block' : 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: onlyOnMobile ? 'none' : 'block',
    },
  }));

  const Content = styled('div')({
    transform: 'rotate(-45deg)',
    fontWeight: 'bolder',
    fontSize: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (
    <Button onClick={onClickCallback}>
      <Content>
        <span>{text}</span>
      </Content>
    </Button>
  );
};

export default DiamondButton;
