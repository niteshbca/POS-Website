import { Component, type ErrorInfo, type ReactNode } from 'react';
import { buttonClasses } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Surface the error for debugging without exposing it to end users.
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <h1 className="text-2xl font-bold text-navy-950">Something went wrong</h1>
          <p className="mt-3 max-w-md text-navy-500">
            An unexpected error occurred while rendering this page. Please reload and try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={buttonClasses({ variant: 'primary', size: 'md', className: 'mt-6' })}
          >
            Reload page
          </button>
        </Container>
      );
    }
    return this.props.children;
  }
}
