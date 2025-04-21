import { ErrorInfo, Component, ReactNode, CSSProperties } from 'react';
import { Button } from '../button/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Handle the error
    console.error('An error occurred:', error, info);
    this.setState({ hasError: true });
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // Render an error message or fallback UI
      return (
        <div style={container}>
          <h2>Something went wrong.</h2>
          <Button
            onClick={this.resetError}
            variant="contained"
            btnText="Try Again"
          />
        </div>
      );
    }

    return this.props.children;
  }
}
const container: CSSProperties | undefined = {
  padding: '20px',
  background: '#f8d7da',
  color: '#721c24',
  border: '1px solid #f5c6cb',
  borderRadius: '5px',
  textAlign: 'center'
};

export default ErrorBoundary;
