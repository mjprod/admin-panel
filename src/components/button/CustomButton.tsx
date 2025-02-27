

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
}