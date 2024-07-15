interface ErrorMessageProps {
  message: string;
}
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p role="alert" className="text-rose-600">
      {message}
    </p>
  );
}
