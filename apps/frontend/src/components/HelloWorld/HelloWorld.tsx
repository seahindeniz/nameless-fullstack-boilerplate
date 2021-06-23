import { styled } from '@utils/theme';

const Button = styled.button`
  color: hotpink;
`;

const HelloWorld: React.FC = () => (
  <>
    <h1 data-testid="title">Hello World</h1>
    <Button>Click me!</Button>
  </>
);

export default HelloWorld;
