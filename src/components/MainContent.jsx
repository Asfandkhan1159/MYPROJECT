// MainContent.jsx
import styled from 'styled-components';
import { useTheme } from '@mui/system';

const MainContentContainer = styled.div`
  margin-top: ${({ theme }) => theme.mixins?.toolbar?.minHeight + 16 || 64}px;
  padding: ${({ theme }) => theme.spacing?.(3) || 24}px;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.palette?.background?.default};
`;

const MainContent = ({ children }) => {
  const theme = useTheme();

  return <MainContentContainer theme={theme}>{children}</MainContentContainer>;
};

export default MainContent;
