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

  const Button = styled('button')(({ theme }) => {
    const SIZE = '30px';
    const TOP_OFFSET = '20px';
    const SIDE_OFFSET = '15px';

    return ({
      background: 'transparent',
      position: 'absolute',
      border: ` ${theme.palette.primary.main} 3px double`,
      color: theme.palette.primary.main,
      top: TOP_OFFSET,
      left: verticalAlign === 'left' ? SIDE_OFFSET : '',
      right: verticalAlign === 'right' ? SIDE_OFFSET : '',
      width: SIZE,
      height: SIZE,
      cursor: 'pointer',
      transform: ' rotate(45deg)',
      zIndex: 2,
      [theme.breakpoints.down('md')]: {
        display: onlyOnMobile ? 'block' : 'none',
      },
      [theme.breakpoints.up('md')]: {
        display: onlyOnMobile ? 'none' : 'block',
      },
    })
  });

  const Content = styled('div')({
    transform: 'rotate(-45deg)',
    fontWeight: 'bolder',
    fontSize: 'px',
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
