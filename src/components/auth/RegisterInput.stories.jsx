import RegisterInput from './RegisterInput';

const story = {
  title: 'Auth/RegisterInput',
  component: RegisterInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default story;

export const Default = {
  args: {
    onRegister: (data) => console.log('Register data:', data),
  },
};
