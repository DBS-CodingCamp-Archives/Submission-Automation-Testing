import LoginInput from './LoginInput';

const story = {
  title: 'Auth/LoginInput',
  component: LoginInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default story;

export const Default = {
  args: {
    onLogin: (credentials) => console.log('Login credentials:', credentials),
  },
};
