import { SVGAttributes } from 'react';

// Updated to match the simplified favicon brand monogram (teal M on dark navy tile)
export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Site logo"
            {...props}
        >
            <rect x="2" y="2" width="60" height="60" rx="14" fill="#0a192f" />
            <rect x="2" y="2" width="60" height="60" rx="14" fill="none" stroke="#64ffda" strokeWidth={2} />
            <path
                d="M18 46V18h5.6l8.4 14.4L40.4 18H46v28h-5V28.9l-9 14.1h-.9l-9-14.1V46h-5Z"
                fill="#64ffda"
            />
            <circle cx="50" cy="14" r="3" fill="#64ffda" fillOpacity={0.15} />
        </svg>
    );
}
