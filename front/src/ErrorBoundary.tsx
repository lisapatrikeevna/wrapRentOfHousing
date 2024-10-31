import React, { Component, ErrorInfo } from 'react';

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  //@ts-ignore
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by Error Boundary: ", error);
    console.error("Error details: ", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong!</h1>
          <p>We're sorry, but an error has occurred.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
