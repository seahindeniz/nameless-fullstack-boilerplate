import { Meta } from '@storybook/react';
import HelloWorld from './HelloWorld';

export default {
  title: 'Example/HelloWorld',
  component: HelloWorld,
} as Meta;

const Template = () => <HelloWorld />;

export const Primary = Template.bind({});
