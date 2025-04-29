//Built-in Imports
import { Suspense } from 'react';

//Internal Imports
import { SuspenseLoader } from 'src/shared/components/index';
import { OnbordingScreenLoader } from 'src/shared/components/suspenseloader/OnbordingLoader';

export const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

export const OnboardingLoader = (Component) => (props) =>
  (
    <Suspense fallback={<OnbordingScreenLoader />}>
      <Component {...props} />
    </Suspense>
  );
